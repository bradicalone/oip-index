import bitcoin from 'bitcoinjs-lib'
import coinselect from 'coinselect'
import {isValidWIF} from './util'
import {sign} from './HelperFunctions/TXSigner'
import MultipartX from './OIPComponents/MultipartX'
import Artifact from './Artifacts/Artifact'
import {flo, flo_testnet} from './networks'

if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
	if (typeof localStorage === "undefined") {
		var LocalStorage = require('node-localstorage').LocalStorage;
		var localStorage = new LocalStorage('./localStorage');
	}
} else {
	localStorage = window.localStorage
}

const CHOP_MAX_LEN = 890;
const FLODATA_MAX_LEN = 1040;

/**
 * Easily publish data onto the FLO chain (mainnet or testnet)
 */
class OIPPublisher {
	/**
	 * Create a new Publisher. Use in conjuction with the Artifact class to publish valid OIP Records or just post random data onto the chain
	 *
	 * ##### Example
	 * Instantiate and use a Publisher
	 * ```
	 * let wif = "cRVa9rNx5N1YKBw8PhavegJPFCiYCfC4n8cYmdc3X1Y6TyFZGG4B"
	 * network = "testnet" //defaults to mainnet
	 * let publisher = new OIPPublisher(wif, network)
	 *
	 * //Publish arbitrary data
	 * publisher.publishData('Hello, Testnet)').then(txid => txid).catch(err => err)
	 *
	 * //Publish data when using the OIP Spec
	 * let artifact = new Artifact()
	 * publisher.publish(artifact.toString()).then(response => response).catch(err => err)
	 * ```
	 *
	 * @class
	 * @param {string} wif - private key in Wallet Import Format (WIF)
	 * @param {string} [network="mainnet"] - Use "testnet" for testnet
	 *
	 * @return {OIPPublisher|Object}
	 */
	//ToDo:: Switch to mainnet for prod
	constructor(wif, network = "testnet") {
		if (network === "testnet")
			network = flo_testnet
		else network = flo
		
		if (!isValidWIF(wif, network.network)) {
			return {success: false, message: "Invalid WIF", wif, network: network.network}
		}

		this.coininfo = network
		this.network = network.network
		this.explorer = network.explorer
		this.ECPair = bitcoin.ECPair.fromWIF(wif, this.network)
		this.p2pkh = bitcoin.payments.p2pkh({pubkey: this.ECPair.publicKey, network: this.network}).address
		this.spentTransactions = []
		this.history = []

		this.deserialize()
	}

	/**
	 * Publish OIP Objects to the FLO Chain (will format it as best it can to the protocol spec)
	 * @param {string} data - the string data you wish to publish !!Make sure to stringify your objects/classes
	 * @return {Promise<string|Array<string>>} txid - the txid(s) of the broadcasted messages
	 */
	async publish(data) {
		if (typeof data !== 'string') {
			throw new Error(`Data input must be of type string`)
		}
		let broadcast_string = `{oip042:${data}}`

		if (broadcast_string.length > FLODATA_MAX_LEN) {
			let txids
			try {
				txids = await this.publishMultiparts(broadcast_string)
			} catch (err) {
				throw new Error(`Failed to publish multiparts: ${err}`)
			}
			return txids
		} else {
			let txid
			try {
				txid = await this.publishData("json:" + broadcast_string)
			} catch (err) {
				throw new Error(`Failed to broadcast message: ${err}`)
			}
			return txid
		}
	}

	/**
	 * Publish arbitrary data to the FLO chain
	 * @param {string} data - String data. Must be below or equal to 1040 characters
 	 * @return {Promise<string>} txid - Returns the id of the transaction that contains the published data
	 */
	async publishData(data) {
		if (data.length > 1040) {
			return `Error: data length exceeds 1040 characters. Try using OIPPublisher.publish(data) instead.`
		}
		let hex
		try {
			hex = await this.buildTXHex(data)
		} catch (err) {
			throw new Error(`Error building TX Hex: ${err}`)
		}
		let txid
		try {
			txid = await this.broadcastRawHex(hex)
		} catch (err) {
			throw new Error(`Error broadcasting TX Hex: ${err}`)
		}

		// Add txid to spentTransactions for each spent input
		for (let inp of this.selected.inputs) {
			if (this.p2pkh === inp.address) {
				this.addSpentTransaction(inp.txId)
			}
		}

		this.save(txid, hex)

		return txid
	}

	/**
	 * Publish data that exceeds the maximum floData length in multiple parts
	 * @param {string} data - The data you wish to publish
	 * @return {Promise<*>} //ToDo::
	 */
	async publishMultiparts(data) {
		let mpx = new MultipartX(input)
		let mps = mpx.toMultiParts()

		let txids = []

		for (let mp of mps) {
			if (txids.length > 0) {
				mp.setFirstPartTXID(txids[0])
				mp.sign(this._address) //@ToDO: add address
			}

			try {
				let txid = await this.publishData(mp.toString())
				txids.push(txid)
			} catch (err) {
				throw new Error(`Failed to broadcase mp single: ${err}`)
			}
		}
	}

	/**
	 * Build a valid FLO Raw TX Hex containing floData
	 * @param {string} [floData=""] - defaults to an empty string
	 * @return {Promise<string>} hex - Returns raw transaction hex
	 */
	async buildTXHex(floData = "") {
		let selected
		try {
			selected = await this.buildInputsAndOutputs(floData)
		} catch (err) {
			throw new Error(`Failed to build inputs and outputs: ${err}`)
		}

		this.selected = selected
		// console.log('selected: ', selected)
		let {inputs, outputs, fee} = selected

		// inputs and outputs will be undefined if no solution was found
		if (!inputs || !outputs) {
			throw new Error("No Inputs or Outputs selected! Fail!")
		}

		let txb = new bitcoin.TransactionBuilder(this.network)

		txb.setVersion(this.coininfo.txVersion) //1: w/o floData, 2: w/ floData

		inputs.forEach(input => txb.addInput(input.txId, input.vout))

		// Check if we are paying to ourself, if so, merge the outputs to just a single output.
		// Check if we have two outputs (i.e. pay to and change)
		if (outputs.length === 2) {
			// If the first input is sending to the from address, and there is a change output,
			// then merge the outputs.
			if (outputs[0].address === this.p2pkh && !outputs[1].address) {
				let totalToSend = outputs[0].value + outputs[1].value
				outputs = [{
					address: this.p2pkh,
					value: totalToSend
				}]
			}
		}

		outputs.forEach(output => {
			if (!output.address) {
				throw new Error(`Missing output address on line #164: ${outputs}`)
			}
			txb.addOutput(output.address, output.value)
		})

		let extraBytes = this.coininfo.getExtraBytes({floData})

		for (let i in inputs) {
			if (this.p2pkh !== inputs[i].address) throw new Error(`Invalid inputs. Addresses don't match on line #170: ${inputs} & ${this.p2pkh}`)
			sign(txb, extraBytes, parseInt(i), this.ECPair)
		}

		let builtHex

		try {
			builtHex = txb.build().toHex();
		} catch (e) {
			throw new Error("Unable to build Transaction Hex! \n" + e)
		}

		builtHex += extraBytes

		return builtHex
	}

	/**
	 * Builds the inputs and outputs to form a valid transaction hex
	 * @param {string} [floData=""] - defaults to an empty string
	 * @return {Promise<Object>} selected - Returns the selected inputs to use for the transaction hex
	 */
	async buildInputsAndOutputs(floData = "") {
		let utxo
		try {
			utxo = await this.getUTXO()
		} catch (err) {
			throw err
		}

		if (utxo.length === 0) {
			throw new Error(`P2PKH: ${this.p2pkh} has no unspent transaction outputs.`)
		}

		let formattedUtxos = utxo.map(utxo => {
			return {
				address: utxo.address,
				txId: utxo.txid,
				vout: utxo.vout,
				scriptPubKey: utxo.scriptPubKey,
				value: utxo.satoshis,
				confirmations: utxo.confirmations
			}
		})

		let output = {
			address: this.p2pkh,
			value: Math.floor(0.0001 * this.coininfo.satPerCoin)
		}

		let targets = [output]

		let extraBytes = this.coininfo.getExtraBytes({floData});
		let extraBytesLength = extraBytes.length

		console.log(formattedUtxos)

		let utxosNoUnconfirmed = formattedUtxos.filter(utx => utx.confirmations > 0)

		console.log(utxosNoUnconfirmed)
		//ToDo:: Filter unconfirmed check

		let selected = coinselect(utxosNoUnconfirmed, targets, Math.ceil(this.coininfo.feePerByte), extraBytesLength)

		// Check if we are able to build inputs/outputs off only unconfirmed transactions with confirmations > 0
		if (!selected.inputs || selected.inputs.length === 0 || !selected.outputs || selected.outputs.length === 0 || !selected.fee) {
			selected = coinselect(formattedUtxos, targets, Math.ceil(this.coininfo.feePerByte), extraBytesLength)
		}

		return selected
	}

	/**
	 * Get Unspent Transaction Outputs for the given keypair
	 * @return {Promise<Array.<Object>>} utxo - Returns unspent transaction outputs
	 */
	async getUTXO() {
		let utxo
		try {
			utxo = await this.explorer.getAddressUtxo(this.p2pkh)
		} catch (err) {
			throw new Error(`Error fetching UTXO: ${err}`)
		}


		return this.removeSpent(utxo)
	}

	/**
	 * Removes already spent transactions (that are kept in local memory)
	 * @param unspentTransactions
	 * @return {Array.<Object>}
	 */
	removeSpent(unspentTransactions) {
		if (!unspentTransactions || !Array.isArray(unspentTransactions))
			return

		let unspent = [];

		for (let tx of unspentTransactions) {
			let spent = false
			for (let txid of this.spentTransactions) {
				if (txid === tx.txid) {
					spent = true;
				}
			}

			if (!spent)
				unspent.push(tx);
		}

		return unspent;
	}

	/**
	 * Add a spent transaction to local memory
	 * @param {string} txid - transaction id
	 * @return {void}
	 */
	addSpentTransaction(txid) {
		this.spentTransactions.push(txid);
	}

	/**
	 * Broadcast raw transaction hex to the FLO chain
	 * @param hex
	 * @return {Promise<string>} txid - Returns a transaction id
	 */
	async broadcastRawHex(hex) {
		let response
		try {
			response = await this.explorer.broadcastRawTransaction(hex)
		} catch (err) {
			throw new Error(`Failed to broadcast TX Hex: ${err}`)
		}
		let txid

		/** Handle { txid: "txid" } */
		if (response && typeof response.txid === "string")
			txid = response.txid

		/**
		 * Handle
		 * {
		 *    txid: {
		 *        result: '05d2dd88d69cc32717d315152bfb474b0b1b561ae9a477aae091714c4ab216ac',
		 *        error: null,
		 *        id: 47070
		 *     }
		 * }
		 */
		if (response && response.txid && response.txid.result) {
			txid = response.txid.result
		}

		/**
		 * Handle
		 * {
		 *     result: '05d2dd88d69cc32717d315152bfb474b0b1b561ae9a477aae091714c4ab216ac',
		 *     error: null,
		 *     id: 47070
		 * }
		 */
		if (response && response.result) {
			txid = response.result
		}

		return txid
	}

	/**
	 * Saves a transaction to localStorage and memory
	 * @param {string} txid
	 * @param {string} hex
	 */
	save(txid, hex) {
		let tmpObj = {}
		tmpObj[txid] = hex

		this.history.push(tmpObj)
		this.serialize()
	}

	/**
	 * Stores important local variables to localStorage such as spent transactions and publish history
	 */
	serialize() {
		let serialized = {
			spentTransactions: this.spentTransactions,
			history: this.history
		}

		localStorage.setItem('publisher_history', JSON.stringify(serialized))
	}

	/**
	 * Imports publisher history from localStorage
	 */
	deserialize() {
		let deserialized = JSON.parse(localStorage.getItem('publisher_history'))
		if (!deserialized)
			deserialized = {}

		if (deserialized.spentTransactions) {
			this.spentTransactions = deserialized.spentTransactions
		}

		if (deserialized.history) {
			this.history = deserialized.history
		}
	}

	/**
	 * Returns publisher history variables
	 * @return {{history: Array, spentTransactions: Array}}
	 */
	getHistory() {
		return {
			history: this.history,
			spentTransactions: this.spentTransactions
		}
	}

	/**
	 * Deletes the publisher history from localStorage
	 */
	deleteHistory() {
		localStorage.removeItem('publisher_history')
	}

}

export default OIPPublisher