"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Artifact = _interopRequireDefault(require("./Artifact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//ToDo: convert types to constants for Special-Type Artifacts
const _type = "party";

class PropertyParty extends _Artifact.default {
  constructor(artifact) {
    super(artifact);
    this.artifactType = 'property';
    this.artifactSubtype = _type;
  }
  /**
   * Returns the Artifact Type (to be used before class initialization)
   * @static
   * @returns {string}
   */


  static getArtifactType() {
    return _type;
  }
  /**
   * Return the Artifact Subtype (to be used before class initialization)
   * @returns {string}
   */


  static getArtifactSubtype() {
    return "party";
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
    return 'property-party';
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
   * Get Party Type
   * @returns {string}
   */


  getPartyType() {
    return this.artifact.details.partyType;
  }
  /**
   * Set Party Type
   * @param {string} partyType
   */


  setPartyType(partyType) {
    this.artifact.details.partyType = partyType;
  }
  /**
   * Get Party Role
   * @returns {string}
   */


  getPartRole() {
    return this.artifact.details.partyRole;
  }
  /**
   * Set Party Role
   * @param {string} partyRole
   */


  setPartyRole(partyRole) {
    this.artifact.details.partyRole = partyRole;
  }
  /**
   * Get Members
   * @returns {Array.<String>}
   */


  getMembers() {
    return this.artifact.details.members;
  }
  /**
   * Set Members
   * @param {Array.<String>}members
   */


  setMembers(members) {
    this.artifact.details.members = members;
  }
  /**
   * Get Namespace
   * @returns {string}
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

var _default = PropertyParty;
exports.default = _default;