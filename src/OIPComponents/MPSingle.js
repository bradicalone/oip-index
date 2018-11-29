import {sign, verify} from 'bitcoinjs-message'

/**
 * Multipart Single is an es6 class that parses a single multipart
 * @class
 */
class MPSingle {
	/**
	 * Construct a Multipart
	 * Pass in an object or a valid JSON string!
	 * @param {String|Object} input - an object or a stringified object
	 */
	constructor(input) {
		// this._source = input
		this.prefix = "oip-mp"

		this.part = undefined
		this.max = undefined
		this.address = undefined
		this.reference = undefined
		this.signature = undefined
		this.data = undefined

		this.meta = {
			complete: undefined,
			stale: undefined,
			time: undefined,
			txid: undefined,
			block: undefined,
			block_hash: undefined,
			assembled: undefined,
			tx: undefined
		}

		this.fromInput(input)
	}

	/**
	 * Get Part Number
	 * @return {number}
	 */
	getPart() {
		return parseInt(this.part)
	}

	/**
	 * Set part number
	 * @param {number} part
	 */
	setPart(part) {
		this.part = part
	}

	/**
	 * Get max number of parts
	 * @return {number}
	 */
	getMax() {
		return parseInt(this.max)
	}

	/**
	 * Set max number of parts
	 * @param {number} max
	 */
	setMax(max) {
		this.max = max
	}

	/**
	 * Get publisher address
	 * @return {string}
	 */
	getAddress() {
		return this.address
	}

	/**
	 * Set Publisher address
	 * @param {string} address
	 */
	setAddress(address) {
		this.address = address
	}

	/**
	 * Get the reference to the first part's TXID
	 * @return {string}
	 */
	getReference() {
		return this.reference
	}

	/**
	 * Set the reference to the first part's TXID
	 * @param {string} reference
	 */
	setReference(reference) {
		this.reference = reference
	}

	/**
	 * Get signature
	 * @return {string}
	 */
	getSignature() {
		return this.signature
	}

	/**
	 * Set signature
	 * @param {string} signature
	 */
	setSignature(signature) {
		this.signature = signature
	}

	/**
	 * Get multipart data
	 * @return {*}
	 */
	getData() {
		return this.data
	}

	/**
	 * Set multipart data
	 * @param {*} data
	 */
	setData(data) {
		this.data = data
	}

	/**
	 * Get the multipart meta data
	 * @return {{complete: undefined, stale: undefined, time: undefined, txid: undefined, block: undefined, block_hash: undefined, assembled: undefined, tx: undefined}|*}
	 */
	getMeta() {
		return this.meta
	}

	/**
	 * Check if multipart is complete
	 * @return {Boolean}
	 */
	isComplete() {
		return this.meta.complete
	}

	/**
	 * Set whether mulitpart is complete
	 * @param {boolean} isComplete
	 */
	setIsComplete(isComplete) {
		this.meta.complete = isComplete
	}

	/**
	 * Check if multipart is stale
	 * @return {undefined|*}
	 */
	isStale() {
		return this.meta.stale
	}

	/**
	 * Set stale param
	 * @param {Boolean} isStale
	 */
	setIsStale(isStale) {
		this.meta.stale = isStale
	}

	getTime() {
		return this.meta.time
	}

	setTime(time) {
		this.meta.time = time
	}

	/**
	 * Get TXID
	 * @return {string}
	 */
	getTXID() {
		return this.meta.txid
	}

	/**
	 * Set TXID
	 * @param {string} txid
	 */
	setTXID(txid) {
		this.meta.txid = txid
	}

	/**
	 * Get Block Height
	 * @return {number}
	 */
	getBlock() {
		return parseInt(this.meta.block)
	}

	/**
	 * Set Block Height
	 * @param {number|string} block
	 */
	setBlock(block) {
		this.meta.block = block
	}

	/**
	 * Get block hash
	 * @return {string}
	 */
	getBlockHash() {
		return this.meta.block_hash
	}

	/**
	 * Set block hash
	 * @param {string} block_hash
	 */
	setBlockHash(block_hash) {
		this.meta.block_hash = block_hash
	}

	/**
	 * Get assembled multipart
	 * @return {*}
	 */
	getAssembled() {
		if (!this.isComplete())
			return 'Multipart not complete'
		return this.meta.assembled
	}

	/**
	 * Set assembled multipart
	 * @param {*} assembled
	 */
	setAssembled(assembled) {
		this.meta.assembled = assembled
	}

	/**
	 * Get Transaction
	 * @return {Object}
	 */
	getTX() {
		return this.meta.tx
	}

	/**
	 * Set Transaction
	 * @param {Object} tx
	 */
	setTX(tx) {
		this.meta.tx = tx
	}

	/**
	 * Get original source data
	 * @private
	 * @deprecated
	 */
	// _getSource() {
	// 	return this._source
	// }

	fromInput(input) {
		if (!input)
			return new Error(`No input!`)

		if (typeof input === 'string') {
			try {
				input = JSON.parse(input)
			} catch (err) {
				return new Error(`Input is invalid JSON: ${err}`)
			}
		}

		if (input.part !== undefined) {
			this.setPart(input.part)
		}
		if (input.max !== undefined) {
			this.setMax(input.max)
		}
		if (input.address) {
			this.setAddress(input.address)
		}
		if (input.reference) {
			this.setReference(input.reference)
		}
		if (input.signature) {
			this.setSignature(input.signature)
		}
		if (input.data) {
			this.setData(input.data)
		}

		if (!input.meta) return

		if (input.meta.complete !== undefined) {
			this.setIsComplete(input.meta.complete)
			this.setAssembled(input.meta.assembled)
		}
		if (input.meta.stale !== undefined) {
			this.setIsStale(input.meta.stale)
		}
		if (input.meta.time) {
			this.setTime(input.meta.time)
		}
		if (input.meta.txid) {
			this.setTXID(input.meta.txid)
		}
		if (input.meta.block) {
			this.setBlock(input.meta.block)
		}
		if (input.meta.block_hash) {
			this.setBlockHash(input.meta.block_hash)
		}
		if (input.meta.tx) {
			this.setTX(input.meta.tx)
		}
	}

	isValid() {
		if (this.getPart() < 0 || this.getPart() === "") {
			return {success: false, message: "Part number can't be negative, null, or undefined"}
		}
		if (this.getPart() > this.getMax()) {
			return {success: false, message: "Part number too high for total parts!"}
		}
		if (this.getMax() < 1) {
			return {success: false, message: "Must have more than one part to be a MULTIPART message!"}
		}
		if (this.getAddress() === "") {
			return {success: false, message: "Must have a Publisher Address!"}
		}
		if (this.getReference() === "" && this.getPart() !== 0) {
			return {
				success: false,
				message: "Only the first part in a multipart message can have a blank first part TXID!"
			}
		}
		if (isNaN(this.getPart()) || isNaN(this.getPart())) {
			return {success: false, message: "The part number and the total part number must be of NUMBER types"}
		}
		if (!this.getSignature()) {
			return {success: false, message: "Must have a Signature!"}
		}
		//@ToDO: Validate Signature

		this.is_valid = true;
		return {success: true}
	}

	toString() {
		if (this.isValid().success) {
			return this.prefix + "(" +
				this.getPart() + "," +
				this.getMax() + "," +
				this.getAddress() + "," +
				this.getReference() + "," +
				this.getSignature() + "):" +
				this.getData();
		} else return new Error(`Invalid multipart: ${this.isValid().message}`)
	}

	getSignatureData() {
		return this.getPart() +
			"-" + this.getMax() +
			"-" + this.getAddress() +
			"-" + this.getReference() +
			"-" + this.getData();
	}

	/**
	 * Get the signature of a specific message that can be verified by others
	 * @param   {Object} ECPair - Elliptic Curve Key Pair (bitcoinjs-lib/ecpair)
	 * @return  {Object} success - Returns a success object
	 * @example
	 * //returns
	 * {success: true, signature: 'base64', error: undefined}
	 *
	 * //or something like
	 * {success: false, signature: undefined, error: "Missing address for signature}
	 *
	 * //nice little trick:
	 * ```
	 * let {success, signature, error} = mp.signSelf(ECPair)
	 *
	 * if (success) {
	 *     mp.setSignature(signature)
	 * } else {
	 *     handle(error)
	 * }
	 * ```
	 */
	signSelf(ECPair) {
		if (!ECPair)
			return {success: false, error: "No Private Key available! Unable to sign message!"}

		if (this.getPart() === undefined) {
			return {success: false, error: "Missing part number! Unable to sign message!"}
		}

		if (this.getMax() === undefined) {
			return {success: false, error: "Missing maximum part number! Unable to sign message!"}
		}

		if (this.getReference() === undefined) {
			return {success: false, error: "Missing first txid reference! Unable to sign message!"}
		}

		if (this.getData() === undefined) {
			return {success: false, error: "Missing data! Unable to sign message!"}
		}

		let privateKeyBuffer = ECPair.privateKey;

		let compressed = ECPair.compressed || true;

		let signature_buffer
		try {
			signature_buffer = sign(this.getSignatureData(), privateKeyBuffer, compressed, ECPair.network.messagePrefix)
		} catch (e) {
			return {success: false, error: e}
		}

		return {success: true, signature: signature_buffer.toString('base64')}
	}
}

export default MPSingle