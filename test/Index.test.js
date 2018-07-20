import Index from '../src/Index'
import Artifact from '../src/Artifact';
import Multipart from '../src/Multipart'

let index = new Index();

test('Index get publisher artifacts', async () => {
    try {
        let results = await index.getArtifacts(undefined, undefined, undefined, undefined, "FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k")
        console.log(results)
    } catch (err) {console.log(err)}

})

test('Index.getArtifact(txid)', async () => {
    const txid41 = '5f399eef8f93c03502efbd51691350cbacbf3c16eba228409bf7453ffff78207';
    let artifact = await index.getArtifact(txid41);
    console.log(artifact);
    expect(artifact).toBeDefined();
    if (artifact.error === undefined) {
        expect(artifact).toBeInstanceOf(Artifact);
        expect(artifact.isValid().success).toBeTruthy()
    }

},10000);

test('Index.getArtifact(txid) random test', async () => {
    const txid41 = 'f516ba';
    let artifact = await index.getArtifact(txid41);
    console.log(artifact);

},10000);

test('Index.getLatestArtifacts() - Retrieves the 10 most current artifacts', async () => {
    let numberToGet = 10
    let artifacts = await index.getLatestArtifacts(numberToGet);
    expect(artifacts.length = numberToGet).toBeTruthy();
    for (let art of artifacts)
        expect(art).toBeInstanceOf(Artifact)
});

test('Index.getArtifacts() without parameters (50 by default)', async () => {
    let artifacts = await index.getArtifacts();
    expect(artifacts.length > 0).toBeTruthy();
    for (let art of artifacts)
        expect(art).toBeInstanceOf(Artifact)
    expect(artifacts.length).toBe(50)
});

test('Index.getArtifacts() with type: research', async () => {
    let artifacts = await index.getArtifacts("Research");
    expect(artifacts.length > 0).toBeTruthy();
    for (let art of artifacts) {
        expect(art).toBeInstanceOf(Artifact)
        expect(art.getType() === "Research").toBeTruthy()
    }
});

test('Index.getArtifacts() with subtype: tomogram', async () => {
    let artifacts = await index.getArtifacts(null, "tomogram");
    expect(artifacts.length > 0).toBeTruthy();
    for (let art of artifacts) {
        expect(art).toBeInstanceOf(Artifact)
        expect(art.getSubtype() === "Tomogram").toBeTruthy()
    }
});

//OIPd can't find audio, image, etc types
test(`Index.getArtifacts() can't find type (returns empty array)`, async () => {
    let artifacts = await index.getArtifacts("audio");
    expect(artifacts.length === 0).toBeTruthy();
});

test('Index.getFloData() for an OIP41 txid', async () => {
    const txid42= '666a12f03a424193775d44d542c3a34838fa1dc5e344d9d9d1efb2541725f14f'; //42 part 1
    let floData = await index.getFloData(txid42);
    console.log(floData)
    expect(floData).toBeDefined();
})

test('Index.searchFloData() for OIP42 multiparts', async () => {
    const tx1 = '22744785179cc008901e3c63e6d8a55cbc028d4cef9404ad9db9b98a4bca6b7d'
    let floData = await index.searchFloData(tx1.substr(0,10));
    console.log(floData)
    expect(floData).toBeDefined();
})

test('Index.searchFloData() with random options', async () => {
    let floData = await index.searchFloData({search: "ryan", page: 1})
    expect(floData).toBeDefined();
})

test('Index.getMulitparts() with valid OIP42 address', async () => {
    //"oip-mp(0,1,FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k,,HzdArp+MBPdP2flPVihd6Phhu22NL7iaBYvCLnlcxSccFWY1+ce3ifS1UZe8zBZ113XypRkhGDHPTCcM9mw7L90=):{\"oip-041\":{\"artifact\":{\"type\":\"Image-Basic\",\"info\":{\"extraInfo\":{\"artist\":\"Sky Young\",\"genre\":\"Animals/Wildlife\",\"tags\":[\"Sample Tag\",\"Sample Tag 2\"]},\"title\":\"My Great Dog\",\"year\":2018,\"description\":\"Sample Description\"},\"storage\":{\"network\":\"IPFS\",\"files\":[{\"fname\":\"scout.jpg\",\"fsize\":1571667,\"sugPlay\":1,\"disBuy\":true,\"type\":\"Image\"}],\"location\":\"QmcEAy2sEp7dTdyPea"
    const tx1 = '22744785179cc008901e3c63e6d8a55cbc028d4cef9404ad9db9b98a4bca6b7d'
    let multi_parts = await index.getMultiparts(tx1)
    for (let i = 0; i < multi_parts.length; i++) {
        console.log(`multi_parts[${i}]: ${multi_parts[i]}`)
        let check = false;
        if (multi_parts[i] instanceof Multipart || multi_parts[i] === undefined)
            check = true;
        expect(check).toBeTruthy()
    }
}, 10000);

test('Index.getMulitparts() with missing pieces (will fill in missing parts with undefined)', async () => {
    //"oip-mp(0,51,FJAGk4SGCAo8Y1cMxuzY2qLxnTU2DUrm1a,,HzJwXMbV8yOUjvyGZpDU5GWLBQCY0n5Bx4pOJcO3L8Fhakp52dJvNEnW6R5ZlFS5mo1OO5H+FzSrNm9nJm9E+Bs=):json:{\"oip042\":{\"publish\":{\"artifact\":{\"floAddress\":\"FJAGk4SGCAo8Y1cMxuzY2qLxnTU2DUrm1a\",\"timestamp\":1524084635,\"type\":\"research\",\"subtype\":\"tomogram\",\"info\":{\"title\":\"Caulobacter crescentus\",\"tags\":\"etdb,jensen.lab,tomogram,electron.tomography\",\"description\":\"Auto imported from etdb\"},\"details\":{\"date\":1114732800,\"NBCItaxID\":"
    //retrieves 39 out of the 51 pieces
    const tx3951 = '80abc3901ca7c6318ff771b7f9804bef513ebbca0797058c86da3da7e128cb9d'
    let multi_parts = await index.getMultiparts(tx3951)
    for (let i = 0; i < multi_parts.length; i++) {
            console.log(`multi_parts[${i}]: ${multi_parts[i]}`)
            let check = false;
            if (multi_parts[i] instanceof Multipart || multi_parts[i] === undefined)
                check = true;
            expect(check).toBeTruthy()
    }
    expect(Array.isArray(multi_parts)).toBeTruthy();
    expect(multi_parts.length).toBe(52)
}, 10000);


//@ToDo::Validate pubID in Multipart.js
test('Index.getMultiparts() test against floData with invalid pubID (expect to be thrown BUT DOES NOT YET) passes', async () => {
    // "oip-mp(0,1,FLuiVU5iDQ,,H2SwpVysryws5CMrok8tqvHEAJqT9eI1SnzUK5yUPF8sDQ5yxeBHD4j9Eu04qFcGm3CHef1oBVQTQzN87Z5yj6s=,):{\"artifact\":{\"type\":\"Video-Basic\",\"info\":{\"extraInfo\":{\"genre\":\"Pets & Animals\"},\"title\":\"Dog\",\"year\":\"2017\",\"description\":\"Pay no attention to the blockchain messages...\"},\"storage\":{\"network\":\"IPFS\",\"files\":[{\"fname\":\"a123.dog.mp4\",\"fsize\":52644,\"type\":\"Video\"}]},\"payment\":{\"fiat\":\"USD\",\"scale\":\"1000:1\",\"disPer\":0."
    let invalid_pub = "52e507dc47b09f5762e1ffffc1a6d615d39541fa39129f94bbeb10808f26b8c7"
    let multi_parts = await index.getMultiparts(invalid_pub)
    for (let i = 0; i < multi_parts.length; i++) {
        console.log(`multi_parts[${i}]: ${multi_parts[i]}`)
        let check = false;
        if (multi_parts[i] instanceof Multipart || multi_parts[i] === undefined)
            check = true;
        expect(check).toBeTruthy()
    }
})
test('Index.getMulitparts() test floData without prefix and NaN partNumber (expect to be thrown)', async () => {
    //"NaN,3,FTaQ6BoZdJBLk18afwqyLnkGbxKqUZrzea,f50559675814a4cd38723613e7edd2ab11a9feae03a677e14c1e193bc431e198,H31Lkr2TCTqCpKImgouYkE6iA8GwtnshU/660Vigz8p2NplvP6UeIGXo8GhGqvB3bsGn/qLUYeTsKNu3q96Hev4=):h\":\"/oip-041/artifact/storage/files/1/fsize\",\"value\":13657840},{\"path\":\"/oip-041/artifact/storage/files/1/fname\",\"value\":\"The Tech That Powers Bitcoin Could Tackle Corruption (HBO) - (640x360).mp4\"},{\"path\":\"/oip-041/artifact/storage/files/0/fsize\",\"value\":31312800},{\"path\":\"/oip-041/artifact/storage/files/0/fname\",\"value\":\"The Tech That Powers Bitcoin Could Tackle Co"
    const multipleProblems = "6675a4ec39f7d2385eb63343ddfb99dad69187525ba9791b2285587bdcf7870c"
    let thrown = false;
    try {
        let multi_parts = await index.getMultiparts(multipleProblems)
    } catch (err) {thrown = true}

    expect(thrown).toBeTruthy()
}, 10000);

test('Index.getMultiparts() test against invalid floData --JSONArtifact (expect to be thrown)', async () => {
    //"{\"oip-041\":{\"artifact\":{\"publisher\":\"FD6qwMcfpnsKmoL2kJSfp1czBMVicmkK1Q\",\"timestamp\":1481419391,\"type\":\"music\",\"info\":{\"title\":\"Test\",\"description\":\"Test\",\"year\":\"2016\",\"extraInfo\":{}},\"storage\":{\"network\":\"IPFS\",\"location\":\"QmPukCZKeJD4KZFtstpvrguLaq94rsWfBxLU1QoZxvgRxA\",\"files\":[{\"dname\":\"Skipping Stones\",\"fname\":\"1 - Skipping Stones.mp3\",\"fsize\":6515667,\"type\":\"album track\",\"duration\":1533.603293}]},\"payment\":{}},\"signature\":\"IDNQ0yoIezmTd0xFzqAf/ekqgy0SoBvGulrrddnjIDIpXixsqtWgjt9PQ90JSA5mevhMMAYU7zbZI6LwpmTgZWQ=\"}}"
    const oip41_artifact = "8a5fae038747565fab39b992907ea738a56736806153741610ad53c6c38567eb";
    let thrown = false;
    try {
        let multi_parts = await index.getMultiparts(oip41_artifact)
    } catch (err) {thrown = true}

    expect(thrown).toBeTruthy()
})

test('Index.getMultiparts() test against floData without partNumber (expect to be thrown)', async () => {
    let no_part = "cc89f15b676a438accce1d72c027ec600284106d66c8192cc8d5be42b9286a13"
    //"oip-mp(,3,F89kd8Cso79V3okG7BKMvLnP13p5DhsLBr,,IB1jxEBIXzfDyHuB0QkbKpt9KzLLYjJhB67+AFM83mqgIwY8oMC1tJTcHTjj2kxf+vlJaSLTBJC1EZ0RoM0XHxw=):{\"oip-041\":{\"artifact\":{\"publisher\":\"F89kd8Cso79V3okG7BKMvLnP13p5DhsLBr\",\"timestamp\":1506720686,\"type\":\"video\",\"info\":{\"title\":\"Nightwish - Amaranth (OFFICIAL VIDEO)\",\"description\":\".:. Uploaded via YouTubeExit.com | Saving the world's videos one watch at a time.\",\"year"
    let thrown = false;
    try {
        let multi_parts = await index.getMultiparts(no_part)
    } catch (err) {thrown = true}

    expect(thrown).toBeTruthy()
})

const oldArt = "e455fb772105fed0da23d9ed3dc97d1271f0e5b2cb83ad72f32dd0423d234ef1"

test('Index.getMultiparts() test against floData without partNumber (expect to be thrown)', async () => {
    let multi_parts = await index.getMultiparts(oldArt)
    for (let i = 0; i < multi_parts.length; i++) {
        console.log(`multi_parts[i]: ${multi_parts[i]}`)
    }
})

let aWholeBunchOfTXIDS = [
    'b5e0813ac476bca1f5383a3a5e44879ee325ad7831090fd4909486692b66c746',
    'b750caca94fcdc88cde35273fe973a619d80eea88bd6b549b79dd4b3b1fbad81',
    '4afe6607d2d41dce7594c2bd10efc5e9ea99caaeb77198d0681bce3e5d6d2aa3',
    '5f399e',
    '666a12',
    '2ca8b96981a05e7d153845070bdddb32ba6f4388f1cf5c771e2fe3997da03c0f',
    '1c6575751ad7f2ccca44f4b880ee1bcc2163d671fb7f14c3b919fe587a2859f1',
    '96994d2f1878450287e24427c06b89f4056eb31de4b48a18ff9ff3c6c796e9cc',
    'd6dcde31b0bb797e37e3015fae4d100f4620789543e4d3b34a6dd06c8e018f33',
    'bc5d4e1fa726284bd3d685b69f2adb2f06e6344feeb4fccb1527bbbb7bc7c17d',
    "cc89f15b676a438accce1d72c027ec600284106d66c8192cc8d5be42b9286a13",
    "210e8f1659bfbfddf0bc438a159e947533587a5f70a80a10cc94f57a7e3c3a5d",
    "5c9244e149b0a275f205e1d111da8da173b8eb9a9b0e400cd224d4a71266877c",
    "8a5fae038747565fab39b992907ea738a56736806153741610ad53c6c38567eb",
    "70b3a719f7fb790d3674250eac83b89a53aa03f27c0c4c435525734d149a24d0",
    "5c9244e149b0a275f205e1d111da8da173b8eb9a9b0e400cd224d4a71266877c"
]