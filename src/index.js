class Index {
	/**
	 * Spawn a new OIP Index with a specific OIPd URL
	 * @param  {string} OIPdURL - The OIPd URL to connect to
	 * @return {Index}
	 */
	constructor(OIPdURL){
		this.url = OIPdURL
	}
}

module.exports = Index;