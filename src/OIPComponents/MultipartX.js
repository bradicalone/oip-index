import MPSingle from './MPSingle'

const CHOP_MAX_LEN = 890;
const FLODATA_MAX_LEN = 1040;
/**
 * MultipartX takes in a json string or an array of Mulitpart Singles
 * From a json string, you can convert to multipart singles
 * From Multipart singles, you can convert to a json string
 * All the MultipartX class cares about is serializing and deserializing floData accordingly
 * @param {string|Array.<MPSingle>} input - The data string you want to multipart or an array of MPSingles you want to combine
 * @param {string} [privAddr] - private address to create signed multiparts
 * @param {string} [pubAddr] - public address to create signed multiparts
 * @class
 */
class MultipartX {
	constructor(input, wallet, privAddr, pubAddr) {
		this._wallet = wallet
		this.privAddr = privAddr
		this.pubAddr = pubAddr
		this.isValid = true
		this.errors = {}
		
		if (typeof input === 'string') {
			this.fromString(input)
		} else if (Array.isArray(input)) {
			this.fromMultiparts(input)
		} else if (typeof input === 'object' && input !== null) {
			this.fromJSON(input)
		} else {
			this.invalidate('Input is not of correct type. Must be a string, an object, or an array of MPSingles')
		}
	}

	/**
	 * Splits the jsonString input into valid multiparts
	 * @param jsonString
	 */
	fromString(jsonString) {
		if (jsonString > CHOP_MAX_LEN) {
			let chunks = []
			while (jsonString.length > CHOP_MAX_LEN) {
				chunks.push(jsonString.slice(0,CHOP_MAX_LEN))
				jsonString = jsonString.slice(CHOP_MAX_LEN)
			}
			chunks.push(jsonString)
			let max = chunks.length - 1
			//@ToDO get pub/priv address
			//@ToDO create signatures
			//@ToDO get txid
			//@ToDO create multiparts
		}
	}
	toString() {}

	fromJSON(json) {
		this.fromString(JSON.stringify(json))
	}
	toJSON() {}

	/**
	 * Recombines the data from multipart singles
	 * @param Array.<MPSingles> - an array of MultiPart Singles
	 */
	fromMultiparts(MPSingles) {
		for (let mp of MPSingles) {
			if (!mp instanceof MPSingle)
				return this.invalidate(`Array passed into constructor does not contain all MPSingles`)
		}

		let dataString = ""
		MPSingles.sort((a, b) => a.getPart() - b.getPart())
		this.setMPSingles(MPSingles)
		for (let mp of MPSingles) {
			dataString += mp.getData()
		}
		this.setData(dataString)
	}
	toMultiParts() {}

	invalidate(error) {
		this.isValid = false
		let errLen = Object.keys(this.errors).length
		this.errors[errLen] = error
	}
	isValid() {
		return this.isValid
	}
	errors() {
		return this.errors
	}

}

export default MultipartX