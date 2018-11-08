import OIPElastic from '../src/OIPElastic'
let index = new OIPElastic()

describe('OIPElastic', () => {
	describe('OIPIndex', () => {
		it('GET ResearchTomogramArtifact by txid | getArtifactByTXID()', async () => {
			let txid = 'cc9a11050acdc4401aec3f40c4cce123d99c0f2c27d4403ae4a2536ee38a4716'
			let artifact = await index.getArtifactByTXID(txid)
			expect(artifact.isValid().success).toBeTruthy()
			expect(artifact.getInternalArtifactType() === 'ResearchTomogram')
		})
	})
})
