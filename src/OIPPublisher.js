import MultipartX from './OIPComponents/MultipartX'
import Artifact from './Artifacts/Artifact'

const CHOP_MAX_LEN = 890;
const FLODATA_MAX_LEN = 1040;

class OIPPublisher {
	constructor(input, wallet) {
		this._input = input
		this._wallet = wallet
	}

	async publish(input) {
		if (!typeof input === 'string') {
			throw new Error(`Input must be of type string`)
		}
		if (input.length > FLODATA_MAX_LEN) {
			try {
				await this.broadcastMultiparts(input)
			} catch (err) {
				throw new Error(`Failed to broadcast multiparts: ${err}`)
			}
		} else {
			try {
				await this.broadcastMessage(input)
			} catch (err) {
				throw new Error(`Failed to broadcast message: ${err}`)
			}
		}
	}

	/**
	 *  Broadcast string data to FLO network
	 * @param message
	 * @return {Promise<string>} txid - returns a transaction id on success
	 */
	async broadcastMessage(message) {

	}
	async broadcastMultiparts(input) {
		let mpx = new MultipartX(input)
		let mps = mpx.toMultiParts()

		let txids = []

		for (let mp of mps) {
			if (txids.length > 0){
				mp.setFirstPartTXID(txids[0])
				mp.sign(this._address) //@ToDO: add address
			}

			try {
				let txid = await this.broadcastMessage(mp.toString())
				txids.push(txid)
			} catch (err) {
				throw new Error(`Failed to broadcase mp single: ${err}`)
			}
		}
	}
	async sendTransaction(data) {}

	sign() {}
}

export default OIPPublisher