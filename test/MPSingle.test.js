import bitcoin from 'bitcoinjs-lib'
import {verify} from 'bitcoinjs-message'
import {flo_testnet} from '../src/networks'
import MPSingle from '../src/OIPComponents/MPSingle'
import OIPIndex from '../src/OIPIndex'

const index = new OIPIndex()

describe("MPSingle", () => {
	describe('Construction', () => {
		it('Builds an empty MPS', () => {
			let mps = new MPSingle()
			expect(mps).toBeDefined()
			expect(mps).toBeInstanceOf(MPSingle)
			expect(mps.isValid().success).toBeFalsy()
		})
	})
	describe('fromInput', () => {
		it('from JSON', async () => {
			let mpo = {
				"reference": "8c204c5f39",
				"address": "FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k",
				"data": "\":\"Single Track\",\"duration\":268},{\"fname\":\"miltjordan-vanishingbreed.jpg\",\"fsize\":40451,\"type\":\"Image\",\"subtype\":\"album-art\"},{\"fname\":\"miltjordan-angelsgettheblues.jpg\",\"fsize\":54648,\"type\":\"Image\",\"subtype\":\"cover\"}],\"location\":\"QmWmth4ES4ZH9Wgz6Z7S7dRFF8MzJVGgDhit5KzH5uCvZz\"},\"payment\":{\"fiat\":\"USD\",\"scale\":\"1000:1\",\"maxdisc\":30,\"promoter\":15,\"retailer\":15,\"sugTip\"",
				"max": 6,
				"signature": "H9dqFw5Pd//qwHeEQA+ENifGvvs/0X1sLUXLQKj2L5qdI/BIJMBX2w3TKETHeNg3MMhA1i3PYVT2FnC8y/BxvUM=",
				"meta": {
					"stale": true,
					"tx": {
						"tx": {
							"vsize": 192,
							"locktime": 0,
							"txid": "1d6392c44629a1fc3eafab4b564a003084e9afad055b5cbdb8fc8c1d3f042d1d",
							"confirmations": 55011,
							"version": 2,
							"vout": [
								{
									"scriptPubKey": {
										"addresses": [
											"FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k"
										],
										"asm": "OP_DUP OP_HASH160 a1973bc79087957470a8982abdd517bda5e0f838 OP_EQUALVERIFY OP_CHECKSIG",
										"hex": "76a914a1973bc79087957470a8982abdd517bda5e0f83888ac",
										"type": "pubkeyhash",
										"reqSigs": 1
									},
									"value": 0.55709853,
									"n": 0
								}
							],
							"floData": "oip-mp(4,6,FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k,8c204c5f39,H9dqFw5Pd//qwHeEQA+ENifGvvs/0X1sLUXLQKj2L5qdI/BIJMBX2w3TKETHeNg3MMhA1i3PYVT2FnC8y/BxvUM=):\":\"Single Track\",\"duration\":268},{\"fname\":\"miltjordan-vanishingbreed.jpg\",\"fsize\":40451,\"type\":\"Image\",\"subtype\":\"album-art\"},{\"fname\":\"miltjordan-angelsgettheblues.jpg\",\"fsize\":54648,\"type\":\"Image\",\"subtype\":\"cover\"}],\"location\":\"QmWmth4ES4ZH9Wgz6Z7S7dRFF8MzJVGgDhit5KzH5uCvZz\"},\"payment\":{\"fiat\":\"USD\",\"scale\":\"1000:1\",\"maxdisc\":30,\"promoter\":15,\"retailer\":15,\"sugTip\"",
							"blockhash": "455e5d41a5b9b90bd907d6828dbdcb721d82bdc2738ae8b4a5a54bb3869b02cd",
							"size": 192,
							"blocktime": 1536431891,
							"hex": "020000000116ecd6a6784e67514b4f8f616ef4b981bef35cb51f2ad3a93fdc91b566a1b525000000006b48304502210094bd9bb7471a63ede8747978db8d0720dcf512da9cd26e8b4af875e5eae864b502200b6a79c9180a18b28b26f437d6b4c9a593960ddb089417094b2ee90ce7d4e79b012103c57ec715fe97f094645b2291187017cf69e50b829bf28bf5ffd1ccbab14c1cd7ffffffff019d105203000000001976a914a1973bc79087957470a8982abdd517bda5e0f83888ac00000000fd05026f69702d6d7028342c362c464c5a585261487a5650784a4a66616f4d333243575434475a48756a32727836336b2c386332303463356633392c4839647146773550642f2f717748654551412b454e6966477676732f305831734c55584c514b6a324c357164492f42494a4d4258327733544b455448654e67334d4d68413169335059565432466e4338792f427876554d3d293a223a2253696e676c6520547261636b222c226475726174696f6e223a3236387d2c7b22666e616d65223a226d696c746a6f7264616e2d76616e697368696e6762726565642e6a7067222c226673697a65223a34303435312c2274797065223a22496d616765222c2273756274797065223a22616c62756d2d617274227d2c7b22666e616d65223a226d696c746a6f7264616e2d616e67656c73676574746865626c7565732e6a7067222c226673697a65223a35343634382c2274797065223a22496d616765222c2273756274797065223a22636f766572227d5d2c226c6f636174696f6e223a22516d576d7468344553345a483957677a365a37533764524646384d7a4a56476744686974354b7a48357543765a7a227d2c227061796d656e74223a7b2266696174223a22555344222c227363616c65223a22313030303a31222c226d617864697363223a33302c2270726f6d6f746572223a31352c2272657461696c6572223a31352c2273756754697022",
							"vin": [
								{
									"sequence": 4294967295,
									"scriptSig": {
										"asm": "304502210094bd9bb7471a63ede8747978db8d0720dcf512da9cd26e8b4af875e5eae864b502200b6a79c9180a18b28b26f437d6b4c9a593960ddb089417094b2ee90ce7d4e79b01 03c57ec715fe97f094645b2291187017cf69e50b829bf28bf5ffd1ccbab14c1cd7",
										"hex": "48304502210094bd9bb7471a63ede8747978db8d0720dcf512da9cd26e8b4af875e5eae864b502200b6a79c9180a18b28b26f437d6b4c9a593960ddb089417094b2ee90ce7d4e79b012103c57ec715fe97f094645b2291187017cf69e50b829bf28bf5ffd1ccbab14c1cd7"
									},
									"txid": "25b5a166b591dc3fa9d32a1fb55cf3be81b9f46e618f4f4b51674e78a6d6ec16",
									"vout": 0
								}
							],
							"time": 1536431891,
							"hash": "1d6392c44629a1fc3eafab4b564a003084e9afad055b5cbdb8fc8c1d3f042d1d"
						},
						"block_hash": "455e5d41a5b9b90bd907d6828dbdcb721d82bdc2738ae8b4a5a54bb3869b02cd",
						"block": 2950932,
						"confirmed": true
					},
					"block_hash": "455e5d41a5b9b90bd907d6828dbdcb721d82bdc2738ae8b4a5a54bb3869b02cd",
					"txid": "1d6392c44629a1fc3eafab4b564a003084e9afad055b5cbdb8fc8c1d3f042d1d",
					"block": 2950932,
					"time": 1536431891,
					"complete": false
				},
				"part": 4
			}
			let mps = new MPSingle(mpo)
			// console.log(mps)
			expect(mps.isValid().success).toBeTruthy()
			expect(mps.isStale()).toBeTruthy()
			expect(mps.isComplete()).toBeFalsy()
			expect(mps.getMeta()).toEqual({
				"stale": true,
				"block_hash": "455e5d41a5b9b90bd907d6828dbdcb721d82bdc2738ae8b4a5a54bb3869b02cd",
				"txid": "1d6392c44629a1fc3eafab4b564a003084e9afad055b5cbdb8fc8c1d3f042d1d",
				"block": 2950932,
				"time": 1536431891,
				"complete": false
			})
		})
		it('from OIPIndex', async () => {
			let mp = await index.getMultipart('1d6392c44629a1fc3eafab4b564a003084e9afad055b5cbdb8fc8c1d3f042d1d')
			expect(mp.success).toBeTruthy()
			let mps = new MPSingle(mp.multipart)
			expect(mps.isValid().success).toBeTruthy()
			expect(mps.isStale()).toBeTruthy()
			expect(mps.isComplete()).toBeFalsy()
			expect(mps.getMeta()).toEqual({
				"stale": true,
				"block_hash": "455e5d41a5b9b90bd907d6828dbdcb721d82bdc2738ae8b4a5a54bb3869b02cd",
				"txid": "1d6392c44629a1fc3eafab4b564a003084e9afad055b5cbdb8fc8c1d3f042d1d",
				"block": 2950932,
				"time": 1536431891,
				"complete": false
			})
		})
	})
	describe('Signing', () => {
		it('Should sign itself', () => {
			let network = flo_testnet.network
			let ECPair = bitcoin.ECPair.makeRandom({network})
			let address = bitcoin.payments.p2pkh({pubkey: ECPair.publicKey, network}).address
			let mps = new MPSingle({part:0, max: 1, reference: 'reference', address, data: 'data'})
			let {success, signature, error} = mps.signSelf(ECPair)

			expect(success).toBeTruthy()
			expect(signature).toBeDefined()
			expect(error).toBeUndefined()

			let ver = verify(mps.getSignatureData(), mps.getAddress(), signature, network.messagePrefix)
			expect(ver).toBeTruthy()
		})
	})
	})
})