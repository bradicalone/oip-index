"use strict";

var _PropertyParty = _interopRequireDefault(require("./PropertyParty"));

var _PropertySpatialUnit = _interopRequireDefault(require("./PropertySpatialUnit"));

var _PropertyTenure = _interopRequireDefault(require("./PropertyTenure"));

var _ResearchTomogram = _interopRequireDefault(require("./ResearchTomogram"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//this file is used to export all Specialized Artifact es6 classes (and not the basic generic Artifact class
//which is exported in src/main.js
module.exports = {
  PropertyTenure: _PropertyTenure.default,
  PropertySpatialUnit: _PropertySpatialUnit.default,
  PropertyParty: _PropertyParty.default,
  ResearchTomogram: _ResearchTomogram.default
};