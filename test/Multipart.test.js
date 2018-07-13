import Multipart from '../src/Multipart'
import Index from '../src/Index'

const Network = new Index()
const oip41_0_txid = "22744785179cc008901e3c63e6d8a55cbc028d4cef9404ad9db9b98a4bca6b7d"
const notOIP_flo_data = "32d2685ca8f47f8418dfe41e35a09dc4258eb79d026ba75b367e827e37c13581"
const pub_addr = "FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k"
const sig = "HzdArp+MBPdP2flPVihd6Phhu22NL7iaBYvCLnlcxSccFWY1+ce3ifS1UZe8zBZ113XypRkhGDHPTCcM9mw7L90="
const sigData = "0-1-FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k--{\"oip-041\":{\"artifact\":{\"type\":\"Image-Basic\",\"info\":{\"extraInfo\":{\"artist\":\"Sky Young\",\"genre\":\"Animals/Wildlife\",\"tags\":[\"Sample Tag\",\"Sample Tag 2\"]},\"title\":\"My Great Dog\",\"year\":2018,\"description\":\"Sample Description\"},\"storage\":{\"network\":\"IPFS\",\"files\":[{\"fname\":\"scout.jpg\",\"fsize\":1571667,\"sugPlay\":1,\"disBuy\":true,\"type\":\"Image\"}],\"location\":\"QmcEAy2sEp7dTdyPea"
const choppedStringData = "{\"oip-041\":{\"artifact\":{\"type\":\"Image-Basic\",\"info\":{\"extraInfo\":{\"artist\":\"Sky Young\",\"genre\":\"Animals/Wildlife\",\"tags\":[\"Sample Tag\",\"Sample Tag 2\"]},\"title\":\"My Great Dog\",\"year\":2018,\"description\":\"Sample Description\"},\"storage\":{\"network\":\"IPFS\",\"files\":[{\"fname\":\"scout.jpg\",\"fsize\":1571667,\"sugPlay\":1,\"disBuy\":true,\"type\":\"Image\"}],\"location\":\"QmcEAy2sEp7dTdyPea"
const txid42 = '666a12f03a424193775d44d542c3a34838fa1dc5e344d9d9d1efb2541725f14f'; //42 part 1
const toString = 'oip-mp(0,1,FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k,,HzdArp+MBPdP2flPVihd6Phhu22NL7iaBYvCLnlcxSccFWY1+ce3ifS1UZe8zBZ113XypRkhGDHPTCcM9mw7L90=):{"oip-041":{"artifact":{"type":"Image-Basic","info":{"extraInfo":{"artist":"Sky Young","genre":"Animals/Wildlife","tags":["Sample Tag","Sample Tag 2"]},"title":"My Great Dog","year":2018,"description":"Sample Description"},"storage":{"network":"IPFS","files":[{"fname":"scout.jpg","fsize":1571667,"sugPlay":1,"disBuy":true,"type":"Image"}],"location":"QmcEAy2sEp7dTdyPea'
const goodArtBrokenComma = 'c64dc67a5e1afce288c688f0f549779a1505b369258473999c00734e24ae54cd'
const multipleProblems = "6675a4ec39f7d2385eb63343ddfb99dad69187525ba9791b2285587bdcf7870c"
const brokenNoPartNumber = "cc89f15b676a438accce1d72c027ec600284106d66c8192cc8d5be42b9286a13"
const invalidPub = "210e8f1659bfbfddf0bc438a159e947533587a5f70a80a10cc94f57a7e3c3a5d"
const twoPCs = "70b3a719f7fb790d3674250eac83b89a53aa03f27c0c4c435525734d149a24d0"

test('Multipart, .fromString()', async () => {
    let flo_data = await Network.getFloData(oip41_0_txid)
    let mp = new Multipart(flo_data, oip41_0_txid)

    expect(mp.isValid().success).toBeTruthy()
    expect(mp.getTXID()).toBe(oip41_0_txid)
    // console.log(flo_data)
    expect(mp.getSignatureData()).toBe(sigData)
})

test('Multipart, construct with non-OIP floData', async () => {
    let flo_data = await Network.getFloData(notOIP_flo_data)
    let mp = new Multipart(flo_data, notOIP_flo_data)
    expect(mp.isValid().success).toBeFalsy()
    expect(mp.getTXID()).toBe(notOIP_flo_data)
})

test('Multipart, set_get prefix', () => {
    let mp = new Multipart();
    mp.setPrefix("ryan_rocks");
    expect(mp.getPrefix()).toBe("ryan_rocks")
})

test('Multipart, set_get partNumber with positive and negative number', () => {
    let mp = new Multipart();
    mp.setPartNumber(9);
    expect(mp.getPartNumber()).toBe(9)
    expect(mp.hasJSONPrefix).toBeFalsy()

    mp.setPartNumber(0);
    expect(mp.getPartNumber()).toBe(0);
    expect(mp.hasJSONPrefix).toBeTruthy()

})

test('Multipart, set_get totalParts', () => {
    let mp = new Multipart();
    mp.setTotalParts(5);
    expect(mp.getTotalParts()).toBe(5)
})

test('Multipart, set_get publisherAddress', () => {
    let mp = new Multipart();
    mp.setPublisherAddress(pub_addr);
    expect(mp.getPublisherAddress()).toBe(pub_addr)
})

test('Multipart, set_get firstPartTXID', () => {
    let mp = new Multipart();
    mp.setFirstPartTXID(oip41_0_txid);
    expect(mp.getFirstPartTXID()).toBe(oip41_0_txid)
})

test('Multipart, set_get signature', () => {
    let mp = new Multipart();
    mp.setSignature(sig);
    expect(mp.getSignature()).toBe(sig)
})

test('Multipart, set_get signature', () => {
    let mp = new Multipart();
    mp.setSignature(sig);
    console.log(mp.getSignature())
    expect(mp.getSignature()).toBe(sig)
})

test('Multipart, set_get choppedStringData', async () => {
    let flo_data = await Network.getFloData(oip41_0_txid)
    let mp = new Multipart(flo_data);
    expect(mp.getChoppedStringData()).toBe(choppedStringData);
})

test('Multipart, set_get TXID', async () => {
    let mp = new Multipart();
    mp.setTXID(oip41_0_txid)
    expect(mp.getTXID()).toBe(oip41_0_txid);
})

test('Multipart, addJSONIdentifier on mp w/o json prefix', async () => {
    let flo_data = await Network.getFloData(oip41_0_txid)
    let mp = new Multipart(flo_data);
    expect(mp.hasJSONPrefix).toBeFalsy();
    expect(mp.addJSONIdentifier()).toBe("")
})

test('Multipart, addJSONIdentifier on mp w json prefix', async () => {
    let flo_data = await Network.getFloData(txid42)
    let mp = new Multipart(flo_data);
    expect(mp.hasJSONPrefix).toBeTruthy();
    expect(mp.addJSONIdentifier()).toBe("json:")
})

test('Multipart, .isValid() ', async () => {
    let flo_data = await Network.getFloData(oip41_0_txid)
    let mp = new Multipart(flo_data, oip41_0_txid)

    expect(mp.isValid().success).toBeTruthy()
    expect(mp.getTXID()).toBe(oip41_0_txid)
    // console.log(flo_data)
    expect(mp.getSignatureData()).toBe(sigData)
})

test('Multipart, .is[not]Valid() ', async () => {
    let flo_data = await Network.getFloData(notOIP_flo_data)
    let mp = new Multipart(flo_data, notOIP_flo_data)
    console.log(mp.isValid())
    expect(mp.isValid().success).toBeFalsy()
    expect(mp.getTXID()).toBe(notOIP_flo_data)
})

test('Multipart, .toString() ', async () => {
    let flo_data = await Network.getFloData(oip41_0_txid)
    let mp = new Multipart(flo_data, oip41_0_txid)
    expect(mp.toString()).toBe(flo_data)
    console.log(mp.toString())
})

test('Multipart, .toString() custom interpolation', async () => {
    let flo_data = await Network.getFloData(oip41_0_txid)
    let mp = new Multipart(flo_data, oip41_0_txid)
    const myData = (`${mp.prefix}(${mp.partNumber},${mp.totalParts},${mp.publisherAddress},${mp.firstPartTXID},${mp.signature}):${mp.addJSONIdentifier()}${mp.choppedStringData}`)
    expect(mp.toString()).toBe(myData)
})

test('Multipart, refactored .fromString()', async () => {
    let flo_data = await Network.getFloData(txid42)
    let mp = new Multipart()
    mp.fromString(flo_data, txid42)

    expect(mp.isValid().success).toBeTruthy();
    expect(mp.getPartNumber()).toBe(0)
    expect(mp.getTotalParts()).toBe(1)
    expect(mp.getPublisherAddress()).toBe("FEj2PunT8h5AkLuMn2f1PVU7mGgmRLbXy8")
    expect(mp.getFirstPartTXID()).toBe("")
    expect(mp.getSignature()).toBe("IJwlyCtjm9gsgBz46xbyKS5vMcTtZNdF24iIeQwgubZZMCYxz8T3FWhGWhLoW4CXGaEeIduySGpbw0wsjf06rX4=")
    expect(mp.getChoppedStringData()).toBe("{\"oip042\":{\"publish\":{\"artifact\":{\"floAddress\":\"FEj2PunT8h5AkLuMn2f1PVU7mGgmRLbXy8\",\"timestamp\":1524439936,\"type\":\"research\",\"subtype\":\"tomogram\",\"info\":{\"title\":\"MG1655 Sacculus\",\"tags\":\"etdb,jensen.lab,tomogram,electron.tomography\",\"description\":\"Auto imported from etdb\"},\"details\":{\"date\":1186790400,\"artNotes\":\"Tilt series notes: E. coli MG1655 sacculus\\nKeywords: Sacculus, E. coli, MG1655, peptidoglycan\\n\",\"speciesName\":\"sacculi\",\"tiltSingleDual\":1,\"defocus\":-6,\"dosage\":100,\"tiltConstant\":1,\"tiltMin\":-70,\"tiltMax\":70,\"tiltStep\":2,\"microscopist\":\"Lu Gan\",\"institution\":\"Caltech\",\"lab\":\"Jensen Lab\",\"sid\":\"lg2007-08-11-14\"},\"storage\":{\"network\":\"ipfs\",\"location\":\"QmcfT2eaNEzvLaNMbFMFYuFrzkwRLwuRTE1FuW7W3pDhkV\",\"files\":[{\"software\":\"UCSF Tomo\",\"dname\":\"MG1655_16.mrc\",\"fname\":\"rawdata/MG1655_16.mrc\",\"fsize\":394393600,\"type\":\"")
})

test('Multipart, refactored .fromString() with broken comma', async () => {
    let flo_data = await Network.getFloData(goodArtBrokenComma)
    let mp = new Multipart()
    mp.fromString(flo_data, goodArtBrokenComma)

    expect(mp.isValid().success).toBeTruthy();
    expect(mp.getPartNumber()).toBe(0)
    expect(mp.getTotalParts()).toBe(2)
    expect(mp.getPublisherAddress()).toBe("FNJSwzfMPSzRLFR9pDXQ7heL6timk79nZ3")
    expect(mp.getFirstPartTXID()).toBe("")
    expect(mp.getSignature()).toBe("H/RIld032LFo0lontWH/klbN84Pb13hkpM8z5fG+1J2XFtwS/b13iGnepIZfDCS0A9Zdqca5ECDqTNPY/Cdh2Qc=")
    expect(mp.getChoppedStringData()).toBe("{\"alexandria-media\":{\"torrent\":\"QmTZrDEypd6xTzf2etNC91YTqFxdLfyfSP1muvTifLGAS7\",\"publisher\":\"FNJSwzfMPSzRLFR9pDXQ7heL6timk79nZ3\",\"timestamp\":1461817276,\"type\":\"video\",\"payment\":{},\"info\":{\"title\":\"Heroin - Not Even Once\",\"description\":\"Heroin use is a bad thing. We need")
})

test('Multipart, refactored .fromString() multipleProblems NaN, no prefix, comma', async () => {
    let flo_data = await Network.getFloData(multipleProblems)
    let mp = new Multipart()

    console.log( mp.fromString(flo_data, multipleProblems))
    // expect(mp.fromString(flo_data, multipleProblems)).toBeInstanceOf(Error);
})

test('Multipart, refactored .fromString() with no part number (test for valid mp)', async () => {
    let flo_data = await Network.getFloData(brokenNoPartNumber)
    let mp = new Multipart()
    mp.fromString(flo_data, brokenNoPartNumber)
    expect(mp.isValid().success).toBeFalsy()
    console.log(mp)
})

test('Multipart, refactored .fromString() with two parenthesisColons ):', async () => {
    let flo_data = await Network.getFloData(twoPCs)
    let mp = new Multipart()
    mp.fromString(flo_data, twoPCs)
    expect(mp.isValid().success).toBeTruthy();
    expect(mp.getPartNumber()).toBe(0)
    expect(mp.getTotalParts()).toBe(20)
    expect(mp.getPublisherAddress()).toBe("FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k")
    expect(mp.getFirstPartTXID()).toBe("")
    expect(mp.getSignature()).toBe("H3s97SsQ47dfh8t7ndkZwKbJo/L5sjFSg2S4m/h3MGB0A/mh99NRV5jdu9620JUPn+LUsJa1xWgjh24/Hgy5sGs=")
    expect(mp.getChoppedStringData()).toBe("{\"oip042\":{\"publish\":{\"artifact\":{\"floAddress\":\"FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k\",\"info\":{\"title\":\"bip-32\",\"description\":\"\\\"Abstract\\\\nThis document describes hierarchical deterministic wallets (or \\\\\\\"HD Wallets\\\\\\\"): wallets which can be shared partially or entirely with different systems, each with or without the ability to spend coins.\\\\n\\\\nThe specification is intended to set a standard for deterministic wallets that can be interchanged between different clients. Although the wallets described here have many features, not all are required by supporting clients.\\\\n\\\\nThe specification consists of two parts. In a first part, a system for deriving a tree of keypairs from a single seed is presented. The second part demonstrates how to build a wallet structure on top of such a tree.\\\\n\\\\nCopyright\\\\nThis BIP is licensed under the 2-clause BSD license.\\\\n\\\\nMotivation\\\\nThe Bitcoin")
})

//@ToDo add test for valid pubAddr
test('Multipart, refactored .fromString() with invalid pub and 0 for totalParts', async () => {
    let flo_data = await Network.getFloData(invalidPub)
    let mp = new Multipart()
    mp.fromString(flo_data, invalidPub)
    console.log(mp.isValid())
    expect(mp.isValid().success).toBeFalsy()
})




















