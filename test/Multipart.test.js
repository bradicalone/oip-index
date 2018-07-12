import Multipart from '../src/Multipart'
import Index from '../src/Index'

const Network = new Index()
const oip41_0_txid = "22744785179cc008901e3c63e6d8a55cbc028d4cef9404ad9db9b98a4bca6b7d"
const notOIP_flo_data = "32d2685ca8f47f8418dfe41e35a09dc4258eb79d026ba75b367e827e37c13581"
const pub_addr = "FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k"
const sig = "HzdArp+MBPdP2flPVihd6Phhu22NL7iaBYvCLnlcxSccFWY1+ce3ifS1UZe8zBZ113XypRkhGDHPTCcM9mw7L90="
const sigData = "0,1,FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k,,{\"oip-041\":{\"artifact\":{\"type\":\"Image-Basic\",\"info\":{\"extraInfo\":{\"artist\":\"Sky Young\",\"genre\":\"Animals/Wildlife\",\"tags\":[\"Sample Tag\",\"Sample Tag 2\"]},\"title\":\"My Great Dog\",\"year\":2018,\"description\":\"Sample Description\"},\"storage\":{\"network\":\"IPFS\",\"files\":[{\"fname\":\"scout.jpg\",\"fsize\":1571667,\"sugPlay\":1,\"disBuy\":true,\"type\":\"Image\"}],\"location\":\"QmcEAy2sEp7dTdyPea"
const choppedStringData = "{\"oip-041\":{\"artifact\":{\"type\":\"Image-Basic\",\"info\":{\"extraInfo\":{\"artist\":\"Sky Young\",\"genre\":\"Animals/Wildlife\",\"tags\":[\"Sample Tag\",\"Sample Tag 2\"]},\"title\":\"My Great Dog\",\"year\":2018,\"description\":\"Sample Description\"},\"storage\":{\"network\":\"IPFS\",\"files\":[{\"fname\":\"scout.jpg\",\"fsize\":1571667,\"sugPlay\":1,\"disBuy\":true,\"type\":\"Image\"}],\"location\":\"QmcEAy2sEp7dTdyPea"
const txid42= '666a12f03a424193775d44d542c3a34838fa1dc5e344d9d9d1efb2541725f14f'; //42 part 1
const toString = 'oip-mp(0,1,FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k,,HzdArp+MBPdP2flPVihd6Phhu22NL7iaBYvCLnlcxSccFWY1+ce3ifS1UZe8zBZ113XypRkhGDHPTCcM9mw7L90=):{"oip-041":{"artifact":{"type":"Image-Basic","info":{"extraInfo":{"artist":"Sky Young","genre":"Animals/Wildlife","tags":["Sample Tag","Sample Tag 2"]},"title":"My Great Dog","year":2018,"description":"Sample Description"},"storage":{"network":"IPFS","files":[{"fname":"scout.jpg","fsize":1571667,"sugPlay":1,"disBuy":true,"type":"Image"}],"location":"QmcEAy2sEp7dTdyPea'

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

test('Multipart, .fromString()', async () => {
    let flo_data = await Network.getFloData(oip41_0_txid)
    let mp = new Multipart(flo_data, oip41_0_txid)

})















