"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ArtifactPicker;

require("core-js/modules/es6.regexp.split");

var _index = _interopRequireDefault(require("../OIPComponents/Artifacts/index"));

var _Artifact = _interopRequireDefault(require("../OIPComponents/Artifacts/Artifact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SUPPORTED_TYPES = ["Audio", "Video", "Image", "Text", "Software", "Web", "Research", "Property"];
const SUPPORTED_ARTIFACTS = {};

for (let type in _index.default) {
  SUPPORTED_ARTIFACTS[_index.default[type].getTypeAndSubtype()] = _index.default[type];
} // console.log(ARTIFACTS)

/**
 * Return a hydrated Artifact from a JSON input
 * @param {Object} jsonArtifact - JSON Artifact
 * @return {Artifact|Object} - an Artifact class object (or an extension thereof)
 */


function ArtifactPicker(jsonArtifact) {
  if (!jsonArtifact || !jsonArtifact.meta) return new _Artifact.default(jsonArtifact);
  let type, subtype;

  switch (jsonArtifact.meta.type) {
    case "alexandria-media":
      type = jsonArtifact.artifact.type;
      subtype = undefined;
      if (type === "music") type = "Audio";

      if (type === "book") {
        type = "Text";
        subtype = "Book";
      }

      if (type === "thing") type = "Web";
      break;

    case "oip041":
      if (jsonArtifact.artifact.type.split("-").length === 2) {
        type = jsonArtifact.artifact.type.split("-")[0];
        subtype = jsonArtifact.artifact.type.split("-")[1];
      } else if (jsonArtifact.artifact.type.split("-").length === 1) {
        type = jsonArtifact.artifact.type;
        subtype = undefined;
      }

      break;

    case "oip042":
      type = jsonArtifact.artifact.type;
      subtype = jsonArtifact.artifact.subtype;
      break;

    default:
      break;
  }

  if (type === undefined) type = 'undefined';else type = type.toLowerCase();
  if (subtype === undefined) subtype = 'undefined';else subtype = subtype.toLowerCase(); // console.log('type: ', type, ' subtype: ', subtype)

  let typeConcat = type.toLowerCase() + '-' + subtype.toLowerCase();

  if (SUPPORTED_ARTIFACTS[typeConcat]) {
    return new SUPPORTED_ARTIFACTS[typeConcat](jsonArtifact);
  }

  return new _Artifact.default(jsonArtifact);
}