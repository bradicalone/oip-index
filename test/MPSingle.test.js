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
})