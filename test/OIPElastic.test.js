import OIPElastic from '../src/OIPElastic'
let net = new OIPElastic()

describe('OIPElastic', () => {
	describe('Artifacts', () => {
		it('GET Artifact', async () => {
			let txid = 'f516ba2fa3eeceb154cf0606c98ab8640d45b773bbf8b1107a433f142c02e9b6'
			let artifact = await net.getArtifact(txid)
			console.log(artifact)

		})
	})
})
