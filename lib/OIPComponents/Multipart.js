"use strict";

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.replace");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = class Multipart {
  constructor(inputString, txid) {
    this.prefix = "oip-mp";
    this.partNumber = 0;
    this.totalParts = 0;
    this.publisherAddress = undefined;
    this.firstPartTXID = "";
    this.signature = "";
    this.choppedStringData = ""; // This is used to track a reference if someone pulled a multipart from an endpoint

    this.txid = ""; // Track if we should log the JSON prefix 
    // (don't write prefix if we were created from a Multipart string that doesn't contain a JSON prefix)
    // Aka, this is for supporting legacy artifacts

    this.hasJSONPrefix = false;
    this.is_first_part = false;
    this.is_valid = undefined;
    this.invalid_error = undefined;
    if (txid) this.setTXID(txid);
    if (inputString) this.fromString(inputString);

    if (this.is_valid) {
      if (this.getFirstPartTXID() === "" && this.getPartNumber() === 0) {
        this.is_first_part = true;
      }
    }
  }

  setPrefix(prefix) {
    this.prefix = prefix;
  }

  getPrefix() {
    return this.prefix;
  }

  setPartNumber(partNumber) {
    this.partNumber = partNumber;
  }

  getPartNumber() {
    return this.partNumber;
  }

  setTotalParts(totalParts) {
    this.totalParts = totalParts;
  }

  getTotalParts() {
    return this.totalParts;
  }

  setPublisherAddress(publisherAddress) {
    this.publisherAddress = publisherAddress;
  }

  getPublisherAddress() {
    return this.publisherAddress;
  }

  setFirstPartTXID(firstTXID) {
    this.firstPartTXID = firstTXID;
  }

  getFirstPartTXID() {
    return this.firstPartTXID;
  }

  setSignature(signature) {
    this.signature = signature;
  }

  getSignature() {
    return this.signature;
  }

  getSignatureData() {
    return this.partNumber + "-" + this.totalParts + "-" + this.publisherAddress + "-" + this.firstPartTXID + "-" + this.choppedStringData;
  }
  /**
   * Create a signature using
   * @param  {Address} address - An OIP-HDMW Address that we can use to sign the message
   * @return {Boolean} Returns `true` if signing was successful
   */


  sign(address) {
    if (!address) throw new Error("An Address is required in order to sign!");
    let signature;

    try {
      signature = address.signMessage(this.getSignatureData());
    } catch (e) {
      throw new Error("Unable to sign Multipart! \n" + e);
    }

    this.setSignature(signature);
    return true;
  }

  validateSignature() {
    return true;
  }

  setChoppedStringData(strData) {
    this.choppedStringData = strData;
  }

  getChoppedStringData() {
    return this.choppedStringData;
  }

  setTXID(id) {
    this.txid = id;
  }

  getTXID() {
    return this.txid;
  }

  addJSONIdentifier() {
    if (this.getPartNumber() === 0 && this.hasJSONPrefix) return "json:";
    return "";
  }

  isValid() {
    if (this.getPrefix() !== "oip-mp") {
      return {
        success: false,
        message: "Invalid Multipart Prefix!"
      };
    }

    if (this.getPartNumber() < 0 || this.getPartNumber() === "") {
      return {
        success: false,
        message: "Part number can't be negative, null, or undefined"
      };
    }

    if (this.getPartNumber() > this.getTotalParts()) {
      return {
        success: false,
        message: "Part number too high for total parts!"
      };
    }

    if (this.getTotalParts() < 1) {
      return {
        success: false,
        message: "Must have more than one part to be a MULTIPART message!"
      };
    }

    if (this.getPublisherAddress() === "") {
      return {
        success: false,
        message: "Must have a Publisher Address!"
      };
    }

    if (this.getFirstPartTXID() === "" && this.getPartNumber() !== 0) {
      return {
        success: false,
        message: "Only the first part in a multipart message can have a blank first part TXID!"
      };
    }

    if (isNaN(this.getPartNumber()) || isNaN(this.getTotalParts())) {
      return {
        success: false,
        message: "The part number and the total part number must be of NUMBER types"
      };
    }

    if (!this.validateSignature()) {
      return {
        success: false,
        message: "Invalid Signature!"
      };
    }

    this.is_valid = true;
    return {
      success: true
    };
  }

  toString() {
    if (this.isValid().success) {
      return this.getPrefix() + "(" + this.getPartNumber() + "," + this.getTotalParts() + "," + this.getPublisherAddress() + "," + this.getFirstPartTXID() + "," + this.getSignature() + "):" + this.addJSONIdentifier() + this.getChoppedStringData();
    } else return new Error(`Invalid multipart: ${this.isValid().message}`);
  }

  invalidate(error_message) {
    this.is_valid = this.isValid().success;
    this.invalid_error = new Error(error_message);
    return this.invalid_error;
  }

  fromString(str, txid) {
    if (!str || typeof str !== "string") {
      return this.invalidate("String input needed");
    }

    if (txid) {
      this.setTXID(txid);
    }

    const prefix = "alexandria-media-multipart(";
    const prefix2 = "oip-mp(";
    const jsonPrefix = "json:";
    let checkPrefix = str.startsWith(prefix) || str.startsWith(prefix2);

    if (!checkPrefix) {
      return this.invalidate("Invalid OIP multipart prefix");
    }

    str = str.replace(prefix, "");
    str = str.replace(prefix2, "");
    let splitParts = str.split("):");

    if (splitParts.length < 2) {
      return this.invalidate("Malformed parts; multi-parts < 2");
    }

    let metaString = splitParts[0];
    splitParts = splitParts.slice(1);
    let dataString = splitParts.join("):");
    let meta = metaString.split(",");
    let lm = meta.length;

    if (lm !== 4 && lm !== 5 && lm !== 6) {
      return this.invalidate("Malformed metaString in floData");
    }

    meta.forEach((m, i) => {
      if (i < 2) if (!isNaN(parseInt(m))) {
        meta[i] = parseInt(m);
      } else {
        return this.invalidate(`meta[${i}] in metaString is not a number`);
      }

      if (m === undefined) {
        return this.invalidate(`Undefined value at meta[${i}] (let meta = metaString.split(",")`);
      }
    });

    let _meta = _slicedToArray(meta, 4),
        partNumber = _meta[0],
        totalParts = _meta[1],
        pubAddr = _meta[2],
        ref = _meta[3];

    let sig = meta[lm - 1] === "" ? meta[lm - 2] : meta[lm - 1];

    if (ref.startsWith("00000000000")) {
      ref = "";
    }

    this.setPartNumber(partNumber);
    this.setTotalParts(totalParts); //@ToDO::Check Addr validity

    this.setPublisherAddress(pubAddr);
    this.setFirstPartTXID(ref);
    this.setSignature(sig);

    if (dataString.startsWith(jsonPrefix)) {
      dataString = dataString.replace(jsonPrefix, "");
      this.hasJSONPrefix = true;
    }

    this.setChoppedStringData(dataString);
    this.is_valid = this.isValid().success;
  }

};