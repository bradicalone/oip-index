import bitcoin from 'bitcoinjs-lib'

import {flo_testnet} from '../src/networks'
import {isValidWIF} from '../src/util'
import OIPPublisher from '../src/OIPPublisher'

const network = flo_testnet.network

// const keypair = bitcoin.ECPair.makeRandom({network})
// const tmpWif = keypair.toWIF()
// console.log(isValidWIF(tmpWif, network))

const wif = 'cRVa9rNx5N1YKBw8PhavegJPFCiYCfC4n8cYmdc3X1Y6TyFZGG4B'
const ECPair = bitcoin.ECPair.fromWIF(wif, network)
// const p2pkh = bitcoin.payments.p2pkh({pubkey: ECPair.publicKey, network}).address

describe(`OIP Publisher`, () => {
	describe('Initialization', () => {
		it(`Should construct successfully with valid WIF`, () => {
			let pub = new OIPPublisher(wif, "testnet")
			expect(pub).toBeInstanceOf(OIPPublisher)
		})
		it(`Should construct unsuccessfully with an invalid WIF`, () => {
			let pub = new OIPPublisher(wif, "mainnet")
			expect(pub.success).toBeFalsy()
		})
	})
	describe('ECPair', () => {
		it('ECPair from WIF', () => {
			expect(isValidWIF(wif, network)).toBeTruthy()
			expect(ECPair.publicKey).toBeDefined()
			expect(ECPair.privateKey).toBeDefined()
		})
	})
	describe('Transaction Builder', () => {
		it('fetch UTXO | getUTXO', async () => {
			let pub = new OIPPublisher(wif, "testnet")
			let utxo = await pub.getUTXO()
			// console.log(utxo)
			expect(utxo).toBeDefined()
			expect(Array.isArray(utxo)).toBeTruthy()
		})
	})
	describe('Publishing', () => {
		it('build and broadcast TX hex | publishData', async () => {
			let pub = new OIPPublisher(wif, "testnet")
			let txid = await pub.publishData(`publish test: ${Date.now()}`)
			expect(typeof txid === 'string').toBeTruthy()
			// console.log(txid)
		})
	})
})