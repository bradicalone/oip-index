import MPSingle from './MPSingle'

const CHOP_MAX_LEN = 890;
const FLODATA_MAX_LEN = 1040;
/**
 * MultipartX converts large data into valid OIP Multiparts and vice versa
 * MultipartX just take in string data > 1040 bytes or an array of OIP Multiparts (MPSingle)
 * Function 1: String data to Multiparts
 * Function 2: Multiparts to string data
 * All the MultipartX class cares about is serializing and deserializing floData (string data) accordingly
 * @param {string|Array.<MPSingle>} input - String data or OIP Multiparts (MPSingle)s (hint: can pass in an JSON object)
 * @class
 */
class MultipartX {
	constructor(input) {

		this.multiparts = []
		this.assembled = undefined

		this.isValid = true
		this.errors = {}

		if (typeof input === 'string') {
			if (input.length < FLODATA_MAX_LEN) {
				return {success: false, error: 'Data does not exceed max floData length of 1040 bytes. MPX not needed.'}
			}
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

		MPSingles.sort((a, b) => a.getPart() - b.getPart())

		this.multiparts = MPSingles

		let assembled = ""
		for (let mp of MPSingles) {
			assembled += mp.getData()
		}
		this.assembled = assembled
	}

	getMultiparts() {
		if (!this.multiparts) {
			return {success: false, error: `No mulitparts found.`}
		}
		return this.multiparts
	}

	getAssembled() {
		if (!this.assembled) {
			return {success: false, error: `No data found.`}
		}
		return this.assembled
	}

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