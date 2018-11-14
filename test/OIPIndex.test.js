import OIPIndex from '../src/OIPIndex'
import MPSingle from "../src/OIPComponents/MPSingle";
let index = new OIPIndex()

describe('OIPIndex API', () => {
	describe('OIPIndex API Functions', () => {
		it('GET Artifact by TXID | getArtifactByTXID()', async () => {
			let txid = 'cc9a11050acdc4401aec3f40c4cce123d99c0f2c27d4403ae4a2536ee38a4716'
			let response = await index.getArtifactByTXID(txid)
			expect(response.success).toBeTruthy()
			expect(response.artifact.getInternalTypeAndSubtype() === 'research-tomogram')
		});
		it('GET latest artifacts | getLatestArtifacts()', async () => {
			const limit = 50
			let response = await index.getLatestArtifacts(limit)
			expect(response.success).toBeTruthy()
			let artifacts = response.artifacts
			expect(artifacts.length).toEqual(limit)
			for (let art of artifacts) {
				expect(art.isValid().success).toBeTruthy()
			}
		})
		it('GET multiple artifacts by ID | getArtifacts()', async () => {
			const txid1 = '6ffbffd475c7eabe0acc664087ac56c13ac7c2084746619182b360c2f19e430e'
			const txid2 = 'f72c314d257d8062581788ab56bbe4ab1dc09dafb7961866903d1144575a3b48'
			const txid3 = '0be3e260a9ff71464383e328d05d9e85984dd6636626bc0356eae8440de150aa'
			let txArray = [txid1, txid2, txid3]
			let response = await index.getArtifacts(txArray)
			expect(response.success).toBeTruthy()
			let artifacts = response.artifacts
			expect(artifacts.length).toEqual(txArray.length)
			for (let art of artifacts) {
				expect(art.isValid().success).toBeTruthy()
			}
		})
		it('GET search index by query | search()', async () => {
			let q = 'ryan'
			let response = await index.search(q)
			expect(response.success).toBeTruthy()
			let artifacts = response.artifacts
			for (let art of artifacts) {
				expect(art.isValid().success).toBeTruthy()
			}
		})
		it('GET search floData by query | searchFloData()', async () => {
			let q = 'ryan'
			let response = await index.searchFloData(q)
			expect(response.success).toBeTruthy()
			let floDataTXs = response.floData
			for (let data of floDataTXs) {
				// console.log(data)
				expect(data.isValid()).toBeTruthy()
			}
		})
		it('GET Multiparts via Reference', async () => {
			let ref = '8c204c5f39'
			let response = await index.getMultipartsByRef(ref)
			expect(response.success).toBeTruthy()
			expect(response.multiparts.length).toEqual(response.total)
			for (let mp of response.multiparts) {
				expect(mp instanceof MPSingle).toBeTruthy()
			}
		})
		it('GET Multiparts via Reference w/ Limit', async () => {
			let ref = '8c204c5f39'
			let limit = 3
			let response = await index.getMultipartsByRef(ref, limit)
			expect(response.success).toBeTruthy()
			expect(response.multiparts.length).toEqual(response.limit)
			for (let mp of response.multiparts) {
				expect(mp instanceof MPSingle).toBeTruthy()
			}
		})
		it('GET Multipart via TXID', async () => {
			let mpTXID = 'f550b9739e7453224075630d44cba24c31959af913aeb7cb364a563f96f54548'
			let response = await index.getMultipartByID(mpTXID)
			expect(response.success).toBeTruthy()
			expect(response.multipart instanceof MPSingle).toBeTruthy()
		})
		it("GET version", async () => {
			expect(await index.getVersion()).toBeDefined()
		})
	})
})
