import axios from 'axios';
import FloDataTX from './FloDataTX'
import Hydrate from './hydrateArtifact'

/**
 * The Transaction ID on the Blockchain.
 * @typedef {string} TXID
 * @example <caption>Full TXID Reference</caption>
 * 8a83ecb7812ca2770814d996529e153b07b103424cd389b800b743baa9604c5b
 * @example <caption>Shortened TXID Reference</caption>
 * 8a83ec
 */

const hydrateArray = (artifacts) => {
	let tmpArray = []
	for (let art of artifacts) {
		tmpArray.push(Hydrate(art))
	}
	return tmpArray
}

const hydrateFloDataTX = (floDataTXs) => {
	let tmpArray = []
	for (let data of floDataTXs) {
		tmpArray.push(new FloDataTX(data))
	}
	return tmpArray
}
	//ToDo: change to 'https' when ready
const defaultOIPdURL = "http://snowflake.oip.fun:1606";
class OIPElastic {
	/**
	 * Spawn a new OIP Index with a specific OIPd URL
	 * @param  {Object} [settings] - The Settings to use for the Index
	 * @param {string} [settings.OIPdURL="https://snowflake.oip.fun/alexandria/v2"] [description]
	 * @return {Index}
	 */
	constructor(settings) {
		if (settings && settings.OIPdURL) {
			this.setOIPdURL(settings.OIPdURL)
		} else this.setOIPdURL(defaultOIPdURL)
	}

	setOIPdURL(OIPdURL) {
		this.url = OIPdURL;

		this.index = new axios.create({
			baseURL: this.url,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		})
	}

	getOIPdURL() {
		return this.url
	}

	getNetwork() {
		return this.index
	}

	/**
	 * Search The Index
	 * @param {string} query - your search query
	 * @param {number} [limit=100] - max num of results
	 * @return {Promise<Object>}
	 * //return example
	 * {success: true, artifacts: artifacts>}
	 *
	 * //or error
	 * {success: false, error: error}
	 */
	async search(query, limit) {
		if (typeof query !== 'string') {
			return {success: false, error: `'query' must be of type string`}
		}
		let res;
		try {
			res = await this.index.get(`/artifact/search`, {
				params: {
					q: query
				},
				limit
			})
		} catch (err) {
			return {success: false, error: err}
		}
		if (res && res.data) {
			let artifacts = res.data.results
			if (artifacts.length === 0)
				return {success: false, error: 'No artifacts found', response: res.data}
			return {success: true, artifacts: hydrateArray(artifacts)}
		} else {
			return {success: false, error: 'No data returned from axios request', response: res}
		}
	}

	/**
	 * Get a specific Artifact from the Index by TXID
	 * @return {Promise<Artifact> | Promise<Object>} Returns a Promise that will resolve to an Artifact or an object containing an error
	 */
	async getArtifactByTXID(txid) {
		let res
		try {
			res = await this.network.get(`/artifact/get/${txid}`);
		} catch (err) {
			return {success: false, error: err}
		}
		if (res && res.data) {
			let resultArray = res.data.results
			assert(resultArray.length === 1)
			let artifact = Hydrate(resultArray[0])
			return artifact.isValid().success ? artifact : artifact.isValid()
		} else {
			return {success: false, error: 'No data returned from axios request', response: res}
		}
	}

	/**
	 * Get the Latest Artifacts published to the Index
	 */
	async getLatestArtifacts() {
	}

	/**
	 * Get the latest Artifacts from the Index
	 */
	async getArtifacts() {
	}

	/**
	 * Get a specific Publisher from the Index
	 */
	async getPublisher() {
	}

	/**
	 * Get a all Publishers from Index
	 */
	async getAllPublishers() {
	}

	/**
	 * Get a specific Platform from the Index
	 */
	async getPlatform() {
	}

	/**
	 * Get all Platformss from the Index
	 */
	async getAllPlatforms() {
	}

	/**
	 * Get a specific Influencer from the Index
	 */
	async getInfluencer() {
	}

	/**
	 * Get a all Influencers from the Index
	 */
	async getAllInfluencers() {
	}

	/**
	 * Get a specific Autominer from the Index
	 */
	async getAutominer() {
	}

	/**
	 * Get a all Autominers from the Index
	 */
	async getAllAutominers() {
	}

	/**
	 * Get a specific AutominerPool from the Index
	 */
	async getAutominerPool() {
	}

	/**
	 * Get a all Autominers from the Index
	 */
	async getAllAutominerPools() {
	}

	/**
	 * Get a the floData of a specific Transaction
	 */
	async getFloData() {
	}

	/**
	 * Search all the floData published into the Flo Blockchain, this is provided by a connection to an OIPd server
	 */
	async searchFloData() {
	}

	/**
	 * Build and get the multiparts
	 */
	async getMultiparts() {
	}
}

export default OIPElastic;
