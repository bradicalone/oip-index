module.exports =
class Multipart {
	constructor(inputString, txid){
		this.prefix = "oip-mp";
		this.partNumber = 0;
		this.totalParts = 0;
		this.publisherAddress = undefined;
		this.firstPartTXID = "";
		this.signature = "";
		this.choppedStringData = "";

		// This is used to track a reference if someone pulled a multipart from an endpoint
		this.txid = ""

		// Track if we should log the JSON prefix 
		// (don't write prefix if we were created from a Multipart string that doesn't contain a JSON prefix)
		// Aka, this is for supporting legacy artifacts
		this.hasJSONPrefix = true;
		this.isFirstPart = false;

		if (txid)
			this.setTXID(txid)

		if (inputString)
			this.fromString(inputString)
            if (this.getFirstPartTXID() === "" && this.getPartNumber() === 0) {
		        this.isFirstPart = true;
            }
	}
	setPrefix(prefix){
		this.prefix = prefix;
	}
	getPrefix(){
		return this.prefix;
	}
	setPartNumber(partNumber){
        this.hasJSONPrefix = partNumber <= 0
        this.partNumber = partNumber;
    }
	getPartNumber(){
		return this.partNumber;
	}
	setTotalParts(totalParts){
		this.totalParts = totalParts;
	}
	getTotalParts(){
		return this.totalParts
	}
	setPublisherAddress(publisherAddress){
		this.publisherAddress = publisherAddress;
	}
	getPublisherAddress(){
		return this.publisherAddress
	}
	setFirstPartTXID(firstTXID){
		this.firstPartTXID = firstTXID;
	}
	getFirstPartTXID(){
		return this.firstPartTXID
	}
	setSignature(signature){
		this.signature = signature;
	}
	getSignature(){
		return this.signature
	}
	getSignatureData(){
		return this.partNumber + 
				"-" + this.totalParts +
				"-" + this.publisherAddress +
				"-" + this.firstPartTXID +
				"-" + this.choppedStringData;
	}
	validateSignature(){
		return true;
	}
	setChoppedStringData(strData){
		this.choppedStringData = strData;
	}
	getChoppedStringData(){
		return this.choppedStringData
	}
	setTXID(id){
		this.txid = id;
	}
	getTXID(){
		return this.txid;
	}
	addJSONIdentifier(){
		if (this.getPartNumber() === 0 && this.hasJSONPrefix)
			return "json:"

		return ""
	}
	isValid(){
		if (this.getPrefix() !== "oip-mp"){
			return {success: false, message: "Invalid Multipart Prefix!"}
		}
		if (this.getPartNumber() < 0 || this.getPartNumber() === ""){
			return {success: false, message: "Part number must be positive or defined!"}
		}
		if (this.getPartNumber() > this.getTotalParts()){
			return {success: false, message: "Part number too high for total parts!"}
		}
		if (this.getTotalParts() < 1){
			return {success: false, message: "Must have more than one part to be a MULTIPART message!"}
		}
		if (this.getPublisherAddress() === ""){
			return {success: false, message: "Must have a Publisher Address!"}
		}
		if (this.getFirstPartTXID() === "" && this.getPartNumber() !== 0){
			return {success: false, message: "Only the first part in a multipart message can have a blank first part TXID!"}
		}
		if (isNaN(this.getPartNumber()) || isNaN(this.getTotalParts())) {
		    return {success: false, message: "The part number and the total part number must be of NUMBER types"}
        }
		if (!this.validateSignature()){
			return {success: false, message: "Invalid Signature!"}
		}

		return {success: true}
	}
	toString(){
		return this.getPrefix() + "(" +
				this.getPartNumber() + "," +
				this.getTotalParts() + "," +
				this.getPublisherAddress() + "," +
				this.getFirstPartTXID() + "," +
				this.getSignature() + "):" +
				this.addJSONIdentifier() +
				this.getChoppedStringData();
	}
	fromString2(multipartString){
		if (!multipartString || typeof multipartString !== "string")
			return false;

		// Split the input string into an array of all the characters
		var characters = multipartString.split('');

		// A string to hold the currently being built string
		var builtString = "";

		// Information about what split points we have hit in the loop below
		var prefixSet = false;
		var parenValuesComplete = 0;
		var totalParenValues = 4;
		var closeSet = false;

		// Now we go through the array to find all the split points and break the string up.
		for (var i = 0; i < characters.length; i++){
			// The first split point is an open paren, we will pull the prefix from the first built part
			if (characters[i] === "(" && !prefixSet){
				this.setPrefix(builtString)
				builtString = "";
				prefixSet = true;
			} else if (characters[i] === "," && prefixSet && parenValuesComplete < totalParenValues) {
				switch(parenValuesComplete){
					case 0:
						this.setPartNumber(parseInt(builtString));
					case 1:
						this.setTotalParts(parseInt(builtString));
					case 2:
						this.setPublisherAddress(builtString);
					case 3:
						this.setFirstPartTXID(builtString);
				}
				builtString = "";
				parenValuesComplete++;
			} else if (characters[i] === ")" && prefixSet && parenValuesComplete === totalParenValues && !closeSet) {
				this.setSignature(builtString);
				builtString = "";
				closeSet = true;

				if (characters.length >= (i + 1) && characters[i + 1] === ":"){
					// Check if we are prefixed with "json:", if so, skip ahead :)
					if (characters.length >= (i + 2) && characters[i + 2] === "j" &&
						characters.length >= (i + 3) && characters[i + 3] === "s" &&
						characters.length >= (i + 4) && characters[i + 4] === "o" &&
						characters.length >= (i + 5) && characters[i + 5] === "n" &&
						characters.length >= (i + 6) && characters[i + 6] === ":")
					{
						i += 6;
					} else {
						i++;
						this.hasJSONPrefix = false;
					}
				}
			} else {
				// If we are not the first split point, then add our character to the build string
				builtString += characters[i];
			}
		}

		// Set the final built string to the appended string data
		this.setChoppedStringData(builtString);
	}

    fromString(str, txid) {
        if (!str || typeof str !== "string")
            return false
        if (txid) {this.setTXID(txid)}

        const prefix = "alexandria-media-multipart(";
        const prefix2 = "oip-mp(";
        const jsonPrefix = "json:"

        let checkPrefix = str.startsWith(prefix) || str.startsWith(prefix2)
        if (!checkPrefix) {return new Error("Invalid OIP multipart prefix")}

        str = str.replace(prefix, "");
        str = str.replace(prefix2, "");

        let splitParts = str.split("):")
        if (splitParts.length < 2) {
            return new Error("Malformed multi-part")
        }

        let metaString = splitParts[0];
        splitParts = splitParts.slice(1)
        let dataString = splitParts.join("):")

        let meta = metaString.split(",")
        let lm = meta.length;

        if (lm !== 4 && lm !== 5 && lm !== 6)
            return new Error("Malformed multi-part meta")


        meta.forEach( (m,i) => {
            if (i < 2)
                if (!isNaN(parseInt(m))) {
                    meta[i] = parseInt(m)
                } else return new Error(`${m} is not a number! (either the part or total parts)`)
        })


        let [partNumber, totalParts, pubAddr, ref] = meta;
        let sig = (meta[lm-1] === "") ? meta[lm-2] : meta[lm-1]
        if (ref.startsWith("00000000000")) {ref = ""}

        this.setPartNumber(partNumber)
        this.setTotalParts(totalParts)
        this.setPublisherAddress(pubAddr)
        this.setFirstPartTXID(ref)
        this.setSignature(sig)

        if (dataString.startsWith(jsonPrefix)) {
            dataString = dataString.replace(jsonPrefix, "")
        }

        this.setChoppedStringData(dataString);

        // return {
        //     partNumber: this.getPartNumber(),
        //     totalParts: this.getTotalParts(),
        //     pubAddr: this.getPublisherAddress(),
        //     ref: this.getFirstPartTXID(),
        //     sig: this.getSignature(),
        //     dataString: this.getChoppedStringData()
        // }
    }
}