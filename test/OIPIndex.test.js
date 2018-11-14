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
			expect(response.multiparts.length).toEqual(limit)
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
		it('GET latest OIP041 artifacts | getLatest041Artifacts()', async () => {
			const limit = 50
			let response = await index.getLatest041Artifacts(limit)
			expect(response.success).toBeTruthy()
			let artifacts = response.artifacts
			expect(artifacts.length).toEqual(limit)
			for (let art of artifacts) {
				expect(art.getVersionType()).toEqual("oip041")
				expect(art.isValid().success).toBeTruthy()
			}
		})
		it('GET an OIP041 Artifact by TXID | get041ArtifactByTXID()', async () => {
			let txid = '8c204c5f39b67431c59c7703378b2cd3b746a64743e130de0f5cfb2118b5136b'
			let response = await index.get041ArtifactByTXID(txid)
			expect(response.success).toBeTruthy()
			// console.log(response.artifact)
			expect(response.artifact.getVersionType()).toEqual("oip041")
		});
		it('GET multiple OIP041 artifacts by ID | get041Artifacts()', async () => {
			const txid1 = '8c204c5f39b67431c59c7703378b2cd3b746a64743e130de0f5cfb2118b5136b'
			const txid2 = 'a690609a2a8198fbf4ed3fd7e4987637a93b7e1cad96a5aeac2197b7a7bf8fb9'
			const txid3 = 'b4e6c9e86d14ca3565e57fed8b482d742a7a1cff0dd4cabfe9e3ea29efb3211c'
			let txArray = [txid1, txid2, txid3]
			let response = await index.get041Artifacts(txArray)
			expect(response.success).toBeTruthy()
			let artifacts = response.artifacts
			expect(artifacts.length).toEqual(txArray.length)
			for (let art of artifacts) {
				expect(art.getVersionType()).toEqual("oip041")
				expect(art.isValid().success).toBeTruthy()
			}
		})
		it('GET latest OIP042 artifacts | getLatest042Artifacts()', async () => {
			const limit = 50
			let response = await index.getLatest042Artifacts(limit)
			expect(response.success).toBeTruthy()
			let artifacts = response.artifacts
			expect(artifacts.length).toEqual(limit)
			for (let art of artifacts) {
				expect(art.isValid().success).toBeTruthy()
				expect(art.getVersionType()).toEqual("oip042")
			}
		})
		it('GET latest Alexandria Media artifacts | getLatestAlexandriaMediaArtifacts()', async () => {
			const limit = 50
			let response = await index.getLatestAlexandriaMediaArtifacts(limit)
			expect(response.success).toBeTruthy()
			let artifacts = response.artifacts
			expect(artifacts.length).toEqual(limit)
			for (let art of artifacts) {
				expect(art.isValid().success).toBeTruthy()
				expect(art.getVersionType()).toEqual('alexandria-media')
			}
		})
		it('GET an Alexandria Media Artifact by TXID | getAlexandriaMediaArtifactByTXID()', async () => {
			let txid = '756f9199c8992cd42c750cbd73d1fa717b31feafc3b4ab5871feadae9848acac'
			let response = await index.getAlexandriaMediaArtifactByTXID(txid)
			expect(response.success).toBeTruthy()
			expect(response.artifact.getVersionType()).toEqual('alexandria-media')
		});
		it('GET multiple Alexandria Media artifacts by ID | getAlexandriaMediaArtifacts()', async () => {
			const txid1 = '33e04cb2dcf7004a460d0719eea36129ebaf48fb10cffff19653bfeeca9bc7ad'
			const txid2 = 'a2110a1058b620d91bc78ad71e466d736f6b8b078025d19c23ddac6a3c0355ee'
			const txid3 = 'b6f89f3c6410276f7d4cf9c3c58c4f0577495650e742e71dddc669c9e912217c'
			let txArray = [txid1, txid2, txid3]
			let response = await index.getAlexandriaMediaArtifacts(txArray)
			expect(response.success).toBeTruthy()
			let artifacts = response.artifacts
			expect(artifacts.length).toEqual(txArray.length)
			for (let art of artifacts) {
				expect(art.isValid().success).toBeTruthy()
				expect(art.getVersionType()).toEqual('alexandria-media')
			}
		})
		it(`GET latest historian data point | getLastestHistorianData`, async () => {
			let response = await index.getLastestHistorianData()
			// console.log(response)
			expect(response.success).toBeTruthy()
		})
		it(`GET historian data point by ID | getLastestHistorianDataByTXID`, async () => {
			let id = '83452d60230d3c2c69000c2a79da79fe60cdf63012f946ac46e6df3409fb1fa7'
			let response = await index.getHistorianDataByTXID(id)
			expect(response.success).toBeTruthy()
		})
		it('GET floData by txid', async () => {
			let id = '83452d60230d3c2c69000c2a79da79fe60cdf63012f946ac46e6df3409fb1fa7'
			let response = await index.getFloData(id)
			expect(response.success).toBeTruthy()
		})

	})
})
