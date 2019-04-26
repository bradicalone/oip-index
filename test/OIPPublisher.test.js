import bitcoin from 'bitcoinjs-lib'

import {flo_testnet} from '../src/networks'
import {isValidWIF} from '../src/util'
import OIP from '../src/OIP'

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
			let pub = new OIP(wif, "testnet")
			expect(pub).toBeInstanceOf(OIP)
		})
		it(`Should construct unsuccessfully with an invalid WIF`, () => {
			let pub = new OIP(wif, "mainnet")
			expect(pub.success).toBeFalsy()
		})
	})
	describe('ECPair', () => {
		it('ECPair from WIF', () => {
			expect(isValidWIF(wif, network)).toBeTruthy()
			expect(ECPair.publicKey).toBeDefined()
			expect(ECPair.privateKey).toBeDefined()
			// console.log(typeof ECPair, ECPair.network)
		})
	})
	describe('Transaction Builder', () => {
		it('fetch UTXO | getUTXO', async () => {
			let pub = new OIP(wif, "testnet")
			let utxo = await pub.getUTXO()
			// console.log(utxo)
			expect(utxo).toBeDefined()
			expect(Array.isArray(utxo)).toBeTruthy()
		})
		// it('build tx hex | buildTXHex', async () => {
		// 	let op = new OIP(wif, "testnet")
		// 	let hex = await op.buildTXHex("ryan")
		// 	let btx = bitcoin.Transaction.fromHex(hex)
		// })
	})
	describe('Publishing', () => {
		it('build and broadcast TX hex | publishData', async () => {
			let pub = new OIP(wif, "testnet")
			let txid = await pub.publishData(`RC`)
			expect(typeof txid === 'string').toBeTruthy()
			// console.log(txid)
		})
	})
	describe('Send TX', () => {
		it('Send a TX', async () => {
			let pub = new OIP(wif,  "testnet")
			let output = {
				address: "oNAydz5TjkhdP3RPuu3nEirYQf49Jrzm4S",
				value: Math.floor(0.0001 * flo_testnet.satPerCoin)
			}
			let txid = await pub.sendTX(output, "sending testnet funds")
			// console.log(txid)
			expect(txid).toBeDefined()
			expect(typeof txid === 'string').toBeTruthy()
		})
	})
})