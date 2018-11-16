class MPSingle {
	constructor(input) {
		this.prefix = "oip-mp"
		this._source = input

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
	 */
	_getSource() {
		return this._source
	}

	fromInput(input) {
		if (!input) return
		if (typeof input === 'string') input = JSON.parse(input)

		if (input.part || input.part === 0) {
			this.setPart(input.part)
		}
		if (input.max || input.max === 0) {
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

		if (input.meta.complete) {
			this.setIsComplete(input.meta.complete)
			this.setAssembled(input.meta.assembled)
		}
		if (input.meta.stale) {
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
}

export default MPSingle