import Artifact from './OIPComponents/Artifacts/Artifact'
import ArtifactFile from './OIPComponents/ArtifactFile'
import Multipart from './OIPComponents/Multipart'
import MPSingle from './OIPComponents/MPSingle'
import MultipartX from './OIPComponents/MultipartX'
import OIPAPI from './OIPAPI'
import OIPPublisher from './OIP'

module.exports = {
	Artifact,
	ArtifactFile,
	Multipart,
	MultipartX,
	MPSingle,
	OIPIndex: OIPAPI,
	OIPPublisher
}