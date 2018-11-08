import ElasticArtifact from './ElasticArtifact'
import ResearchTomogramArtifact from './ResearchTomogramArtifact'

const SUPPORTED_TYPES = ["Audio", "Video", "Image", "Text", "Software", "Web", "Research", "Property"]

const SUPPORTED_ARTIFACTS = {
	'research-tomogram': ResearchTomogramArtifact,
}

/**
 * Return a hydrated Artifact from a JSON input
 * @param {Object} jsonArtifact - JSON Artifact
 * @return {Artifact} - an Artifact class object (or an extension thereof)
 */
export default function Hydrate(jsonArtifact) {
	if (!jsonArtifact.meta) {
		return {success: false, error: 'Invalid artifact. Check: artifact.meta'}
	}

	let type, subtype
	switch (jsonArtifact.meta.type) {
		case "alexandria-media":
			type = jsonArtifact.artifact.type;
			subtype = undefined

			if (type === "music")
				type = "Audio"

			if (type === "book"){
				type = "Text"
				subtype = "Book"
			}
			if (type === "thing")
				type = "Web"
			break
		case "oip041":
			if (jsonArtifact.artifact.type.split("-").length === 2){
				type = jsonArtifact.artifact.type.split("-")[0];
				subtype = jsonArtifact.artifact.type.split("-")[1];
			} else if (jsonArtifact.artifact.type.split("-").length === 1){
				type = jsonArtifact.artifact.type
				subtype = undefined
			}
			break
		case "oip042":
			type = jsonArtifact.artifact.type
			subtype = jsonArtifact.artifact.subtype
			break
		default:
			break
	}

	if (type === undefined) type = 'undefined'
	else type = type.toLowerCase()

	if (subtype === undefined) subtype = 'undefined'
	else subtype = subtype.toLowerCase()

	console.log('type: ', type, ' subtype: ', subtype)

	let typeConcat = type.toLowerCase()+'-'+subtype.toLowerCase()
	if (SUPPORTED_ARTIFACTS[typeConcat])
		return new SUPPORTED_ARTIFACTS[typeConcat](jsonArtifact)

	return new ElasticArtifact(jsonArtifact)
}
