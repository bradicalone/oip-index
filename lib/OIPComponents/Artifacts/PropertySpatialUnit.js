"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Artifact = _interopRequireDefault(require("./Artifact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PropertySpatialUnit extends _Artifact.default {
  constructor(artifact) {
    super(artifact);
    this.artifactType = 'property';
    this.artifactSubtype = 'spacialUnit';
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
    return "spacialUnit";
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
    return 'property-spacialUnit';
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
   * Set Geometry
   * @returns {Object}
   */


  getGeometry() {
    return this.artifact.details.geometry;
  }
  /**
   * Set Geometry
   * @param {Object} geometry
   */


  setGeometry(geometry) {
    this.artifact.details.geometry = geometry;
  }
  /**
   * Get Geometry Data
   * @returns {*}
   */


  getGeometryData() {
    return this.artifact.details.geometry.data;
  }
  /**
   * Set Geometry Data
   * @param {Object} data
   */


  setGeometryData(data) {
    this.artifact.details.geometry.data = data;
  }
  /**
   * Get the Geometry Type
   * @returns {*}
   */


  getGeometryType() {
    return this.artifact.details.geometry.type;
  }
  /**
   * Set the Geometry Type
   * @param {string} type
   */


  setGeometryType(type) {
    this.artifact.details.geometry.type = type;
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
   * @param ns
   */


  setNamespace(ns) {
    this.artifact.details.geometry.ns = ns;
  }
  /**
   * Get Spacial Type
   * @returns {*}
   */


  getSpacialType() {
    return this.artifact.details.spacialType;
  }
  /**
   * Set Spacial Type
   * @param spacialType
   */


  setSpacialType(spacialType) {
    this.artifact.details.spacialType = spacialType;
  }
  /**
   * Get bbox (bounding box)
   * @returns {Array.<Number>}
   */


  getBoundingBox() {
    return this.artifact.details.bbox;
  }
  /**
   * Set bbox (bounding box)
   * @param {Array.<Number>} bbox
   */


  setBoundingBox(bbox) {
    this.artifact.details.bbox = bbox;
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

var _default = PropertySpatialUnit;
exports.default = _default;