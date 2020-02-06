"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Artifact = _interopRequireDefault(require("./Artifact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PropertyTenure extends _Artifact.default {
  constructor(artifact) {
    super(artifact);
    this.artifactType = 'property';
    this.artifactSubtype = 'tenure';
  }
  /**
   * Returns the Artifact Type (to be used before class initialization)
   * @static
   * @returns {string}
   */


  static getArtifactType() {
    return "property";
  }
  /**
   * Return the Artifact Subtype (to be used before class initialization)
   * @returns {string}
   */


  static getArtifactSubtype() {
    return "tenure";
  }
  /**
   * Returns the Artifact Type and Subtype Concatenated (to be used before class initialization)
   * @static
   * @returns {string} return the artifact type concatenated with the artifact subtype
   * @example
   * //return
   * "type-subtype"
   */


  static getTypeAndSubtype() {
    return 'property-tenure';
  }
  /**
   * Returns the Artifact Type (to be used after class initialization)
   * @returns {string} return the artifact type concatenated with the artifact subtype
   * @example
   * //return
   * "type-subtype"
   */


  getInternalTypeAndSubtype() {
    return this.artifactType + '-' + this.artifactSubtype;
  }
  /**
   * Set Tenure Type
   * @returns {string}
   */


  getTenureType() {
    return this.artifact.details.tenureType;
  }
  /**
   * Set Tenure type
   * @param {string} tenureType
   */


  setTenureType(tenureType) {
    this.artifact.details.tenureType = tenureType;
  }
  /**
   * Return Tenures
   * @returns {Array<String>}
   */


  getTenures() {
    return this.artifact.details.tenures;
  }
  /**
   * Set Tenures
   * @param {Array.<String>}tenures
   */


  setTenures(tenures) {
    this.artifact.details.tenures = tenures;
  }
  /**
   * Get Namespace
   * @returns {*}
   */


  getNamespace() {
    return this.artifact.details.ns;
  }
  /**
   * Set Namespace
   * @param {string} ns
   */


  setNamespace(ns) {
    this.artifact.details.geometry.ns = ns;
  }
  /**
   * Get Spacial Unit
   * @returns {*}
   */


  getSpacialUnit() {
    return this.artifact.details.spacialUnit;
  }
  /**
   * Set Spacial Unit
   * @param {string} spacialUnit
   */


  setSpacialUnit(spacialUnit) {
    this.artifact.details.spacialUnit = spacialUnit;
  }
  /**
   * Get Party
   * @returns {string}
   */


  getParty() {
    return this.details.party;
  }
  /**
   * Set party
   * @param {string} party
   */


  setParty(party) {
    this.artifact.details.party = party;
  }
  /**
   * Return Attributes
   * @returns {Object}
   */


  getAttributes() {
    return this.artifact.details.attrs;
  }
  /**
   * Set Attributes
   * @param {Object} attrs
   */


  setAttributes(attrs) {
    this.artifact.details.attrs = attrs;
  }

}

var _default = PropertyTenure;
exports.default = _default;