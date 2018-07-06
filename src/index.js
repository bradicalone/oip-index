import axios from 'axios';

/**
 * The Transaction ID on the Blockchain.
 * @typedef {string} TXID
 * @example <caption>Full TXID Reference</caption>
 * 8a83ecb7812ca2770814d996529e153b07b103424cd389b800b743baa9604c5b
 * @example <caption>Shortened TXID Reference</caption>
 * 8a83ec
 */

class Index {
	/**
	 * Spawn a new OIP Index with a specific OIPd URL
	 * @param  {Object} [settings] - The Settings to use for the Index
	 * @param {string} [settings.OIPdURL="https://snowflake.oip.fun/alexandria/v2"] [description]
	 * @return {Index}
	 */
	constructor(settings){
		if (settings && settings.OIPdURL)
			this.setOIPdURL(settings.OIPdURL)
	}
	setOIPdURL(OIPdURL){
		this.url = OIPdURL;

		this.network = new axios.create({
			baseURL: OIPdURL
		})
	}
	/**
	 * Search The Index
	 * @param  {string}  searchFor  - The string you wish to search for in the Index
	 * @param  {String}  [searchOn="*"] - The "node" you wish to search on
	 * @param  {Boolean} [searchLike=true] - Should we search similar (like) values, or only exact values
	 * @param  {String}  [protocol="media"] - Which type we wish to get back
	 * @return {Promise<Artifact|Publisher|Platform|Influencer|Autominer|AutominerPool>} Returns a Promise that will resolve to the hydrated object or reject on error
	 */
	async search(searchFor, searchOn = "*", searchLike = true, protocol = "media"){
		if (!searchFor)
			throw new Error("searchFor is a required parameter!")

		var options = {
			searchFor,
			searchOn,
			searchLike,
			protocol
		}

		var response = await this.network.post("/search", options)

		return response.data
	}
	/**
	 * Get a specific Artifact from the Index
	 * @param  {TXID} txid - The TXID of the Artifact you wish to get
	 * @return {Promise<Artifact>} Returns a Promise that will resolve to an Artifact or reject with an error
	 */
	async getArtifact(txid){

	}
	/**
	 * Get the Artifacts from a specific Publisher from the Index
	 * @param  {TXID} txid - The TXID of the Publisher you wish to get the Artifacts of
	 * @return {Promise<Array.<Artifact>>} Returns a Promise that will resolve to an Array of Artifacts or reject with an error
	 */
	async getArtifacts(txid){

	}
	/**
	 * Get a specific Publisher from the Index
	 * @param  {TXID} txid - The TXID of the Publisher you wish to get
	 * @return {Promise<Publisher>} Returns a Promise that will resolve to an Publisher or reject with an error
	 */
	async getPublisher(txid){

	}
	/**
	 * Get a specific Platform from the Index
	 * @param  {TXID} txid - The TXID of the Platform you wish to get
	 * @return {Promise<Platform>} Returns a Promise that will resolve to an Platform or reject with an error
	 */
	async getPlatform(txid){

	}
	/**
	 * Get a specific Influencer from the Index
	 * @param  {TXID} txid - The TXID of the Influencer you wish to get
	 * @return {Promise<Influencer>} Returns a Promise that will resolve to an Influencer or reject with an error
	 */
	async getInfluencer(txid){

	}
	/**
	 * Get a specific Autominer from the Index
	 * @param  {TXID} txid - The TXID of the Autominer you wish to get
	 * @return {Promise<Autominer>} Returns a Promise that will resolve to an Autominer or reject with an error
	 */
	async getAutominer(txid){

	}
	/**
	 * Get a specific AutominerPool from the Index
	 * @param  {TXID} txid - The TXID of the AutominerPool you wish to get
	 * @return {Promise<AutominerPool>} Returns a Promise that will resolve to an AutominerPool or reject with an error
	 */
	async getAutominerPool(txid){

	}
	/**
	 * Get the Latest Artifacts published to the Index
	 * @param  {number} [amount=50] - The amount of Artifacts you wish to recieve
	 * @return {Promise<Array.<Artifact>>} Returns a Promise that will resolve to an Array of Artifacts
	 */
	async getLatestArtifacts(amount){

	}
	/**
	 * Get a the floData of a specific Transaction
	 * @param  {TXID} txid - The TXID you wish to get the floData of
	 * @return {Promise<String>} Returns a Promise that will resolve to a floData string or reject with an error
	 */
	async getFloData(txid){

	}
	/**
	 * Search all the floData published into the Flo Blockchain, this is provided by a connection to an OIPd server
	 * @param  {string} search_text - The Text you wish to search the Flo Blockchain for
	 * @return {Promise<Array.<Object>>} Returns a Promise that will resolve to an Array of objects containing the transaction hash and message matched
	 */
	async searchFloData(search_text){

	}
	/**
	 * Build and get the multiparts 
	 * @param  {string} first_txid - The TXID of the First Part of the Artifact
	 * @return {Promise<Array.<Multipart>|Artifact>} Returns a Promise that will resolve to an Array of Multiparts, or a single Artifact if it is not Multiparts
	 */
	async getMultiparts(first_txid){

	}
}

module.exports = Index;