import Index from '../src/Index'
import Artifact from '../src/Artifact';
import Multipart from '../src/Multipart'

const txid41 = '5f399eef8f93c03502efbd51691350cbacbf3c16eba228409bf7453ffff78207'; //41 part 1
const txid412 = 'b5e0813ac476bca1f5383a3a5e44879ee325ad7831090fd4909486692b66c746'; //41 part 2

const txid42= '666a12f03a424193775d44d542c3a34838fa1dc5e344d9d9d1efb2541725f14f'; //42 part 1
const txid421 = 'b750caca94fcdc88cde35273fe973a619d80eea88bd6b549b79dd4b3b1fbad81' //42 part 2

const tx1 = '22744785179cc008901e3c63e6d8a55cbc028d4cef9404ad9db9b98a4bca6b7d' // 42
const tx2 = '4afe6607d2d41dce7594c2bd10efc5e9ea99caaeb77198d0681bce3e5d6d2aa3' // 42

const shortTXID = '5f399e';
const shortTXID2 = '666a12';

const crazyLong = '2ca8b96981a05e7d153845070bdddb32ba6f4388f1cf5c771e2fe3997da03c0f'
const crazyLong13 = '1c6575751ad7f2ccca44f4b880ee1bcc2163d671fb7f14c3b919fe587a2859f1'
const tx4242 = '96994d2f1878450287e24427c06b89f4056eb31de4b48a18ff9ff3c6c796e9cc'
const tx3951 = '80abc3901ca7c6318ff771b7f9804bef513ebbca0797058c86da3da7e128cb9d'
const tx151 = 'd6dcde31b0bb797e37e3015fae4d100f4620789543e4d3b34a6dd06c8e018f33'
const brokenComma = 'bc5d4e1fa726284bd3d685b69f2adb2f06e6344feeb4fccb1527bbbb7bc7c17d'
const goodArtBrokenComma = 'c64dc67a5e1afce288c688f0f549779a1505b369258473999c00734e24ae54cd'
const multipleProblems = "6675a4ec39f7d2385eb63343ddfb99dad69187525ba9791b2285587bdcf7870c"
const brokenNoPartNumber = "cc89f15b676a438accce1d72c027ec600284106d66c8192cc8d5be42b9286a13"
const invalidPub = "210e8f1659bfbfddf0bc438a159e947533587a5f70a80a10cc94f57a7e3c3a5d"
const artTx = "5c9244e149b0a275f205e1d111da8da173b8eb9a9b0e400cd224d4a71266877c"
const noPrefix = "8a5fae038747565fab39b992907ea738a56736806153741610ad53c6c38567eb"
const twoPCs = "70b3a719f7fb790d3674250eac83b89a53aa03f27c0c4c435525734d149a24d0"
const oip41_artifact = "8a5fae038747565fab39b992907ea738a56736806153741610ad53c6c38567eb";
const oip41_artifact_wJSON = "5c9244e149b0a275f205e1d111da8da173b8eb9a9b0e400cd224d4a71266877c"

let index = new Index();

test('Index.getArtifact()', async () => {
    //HAS TO BE THE TX OF AN ARTIFACT OR A FIRST PART MULTIPART
    let artifact = await index.getArtifact(txid41);
    console.log(artifact);
    expect(artifact).toBeDefined();
    if (artifact.error === undefined) {
        expect(artifact).toBeInstanceOf(Artifact);
        expect(artifact.isValid().success).toBeTruthy()
    }

},10000);

test('Index.getLatestArtifacts() - 3 most current', async () => {
    let artifacts = await index.getLatestArtifacts(3);
    expect(artifacts.length > 0).toBeTruthy();
    for (let art of artifacts)
        expect(art).toBeInstanceOf(Artifact)
    expect(artifacts.length).toBe(3);
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

test('Break getArtifacts function', async () => {
    //make sure to delete a character in the network url call
    let err = await index.getArtifacts();
    expect(err).toBeDefined()

})

//@ToDo::Why can't OIPd find audio, image, etc types?
test('Index.getArtifacts() cant find type (returns empty array)', async () => {
    let artifacts = await index.getArtifacts("audio");
    expect(artifacts.length === 0).toBeTruthy();
});

test('Index.getFloData() for an OIP41 txid', async () => {
    let floData = await index.getFloData(txid42);
    console.log(floData)
    expect(floData).toBeDefined();
})

test('Index.searchFloData() for OIP42 multiparts', async () => {
    let floData = await index.searchFloData(tx1.substr(0,10));
    console.log(floData)
    expect(floData).toBeDefined();
})

test('Index.searchFloData() with random options', async () => {
    let floData = await index.searchFloData({search: "ryan", page: 100})
    expect(floData).toBeDefined();
})

test('Index.getMulitparts with valid 42 addr part 1', async () => {
    let multi_parts = await index.getMultiparts(tx1)
    console.dir(`multi_parts[0]: ${multi_parts[0]}`)
    console.dir(`multi_parts[1]: ${multi_parts[1]}`)
    console.log(`multi_parts = ${multi_parts}`)

    expect(Array.isArray(multi_parts)).toBeTruthy();
    for (let mp of multi_parts){
        expect(mp).toBeInstanceOf(Multipart)
    }
}, 10000);

test('Index.getMulitparts with missing pieces', async () => {
    //"oip-mp(0,51,FJAGk4SGCAo8Y1cMxuzY2qLxnTU2DUrm1a,,HzJwXMbV8yOUjvyGZpDU5GWLBQCY0n5Bx4pOJcO3L8Fhakp52dJvNEnW6R5ZlFS5mo1OO5H+FzSrNm9nJm9E+Bs=):json:{\"oip042\":{\"publish\":{\"artifact\":{\"floAddress\":\"FJAGk4SGCAo8Y1cMxuzY2qLxnTU2DUrm1a\",\"timestamp\":1524084635,\"type\":\"research\",\"subtype\":\"tomogram\",\"info\":{\"title\":\"Caulobacter crescentus\",\"tags\":\"etdb,jensen.lab,tomogram,electron.tomography\",\"description\":\"Auto imported from etdb\"},\"details\":{\"date\":1114732800,\"NBCItaxID\":"
    //retrieves 39 out of the 51 pieces
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

test('Index.getMulitparts with fluffy enigma comma', async () => {
    let multi_parts = await index.getMultiparts(goodArtBrokenComma)

    for (let i = 0; i < multi_parts.length; i++) {
        console.log(`multi_parts[${i}]: ${multi_parts[i]}`)
        let check = false;
        if (multi_parts[i] instanceof Multipart || multi_parts[i] === undefined)
            check = true;
        expect(check).toBeTruthy()
    }
    expect(Array.isArray(multi_parts)).toBeTruthy();
}, 10000);

test('Index.getMultiparts tuff ones', async () => {
    let invalid_pub = "52e507dc47b09f5762e1ffffc1a6d615d39541fa39129f94bbeb10808f26b8c7"
    let multi_parts = await index.getMultiparts(no_part)
    for (let i = 0; i < multi_parts.length; i++) {
        console.log(`multi_parts[${i}]: ${multi_parts[i]}`)
        let check = false;
        if (multi_parts[i] instanceof Multipart || multi_parts[i] === undefined)
            check = true;
        expect(check).toBeTruthy()
    }
})
test('Index.getMulitparts test invalid multipart 0', async () => {
    let thrown = false;
    try {
        let multi_parts = await index.getMultiparts(multipleProblems)
    } catch (err) {thrown = true}

    expect(thrown).toBeTruthy()
}, 10000);

test('Index.getMultiparts() test against invalid multipart 1', async () => {
    //"{\"oip-041\":{\"artifact\":{\"publisher\":\"FD6qwMcfpnsKmoL2kJSfp1czBMVicmkK1Q\",\"timestamp\":1481419391,\"type\":\"music\",\"info\":{\"title\":\"Test\",\"description\":\"Test\",\"year\":\"2016\",\"extraInfo\":{}},\"storage\":{\"network\":\"IPFS\",\"location\":\"QmPukCZKeJD4KZFtstpvrguLaq94rsWfBxLU1QoZxvgRxA\",\"files\":[{\"dname\":\"Skipping Stones\",\"fname\":\"1 - Skipping Stones.mp3\",\"fsize\":6515667,\"type\":\"album track\",\"duration\":1533.603293}]},\"payment\":{}},\"signature\":\"IDNQ0yoIezmTd0xFzqAf/ekqgy0SoBvGulrrddnjIDIpXixsqtWgjt9PQ90JSA5mevhMMAYU7zbZI6LwpmTgZWQ=\"}}"
    let thrown = false;
    try {
        let multi_parts = await index.getMultiparts(oip41_artifact)
    } catch (err) {thrown = true}

    expect(thrown).toBeTruthy()
})

test('Index.getMultiparts() test against missing part', async () => {
    let no_part = "cc89f15b676a438accce1d72c027ec600284106d66c8192cc8d5be42b9286a13"
    //"oip-mp(,3,F89kd8Cso79V3okG7BKMvLnP13p5DhsLBr,,IB1jxEBIXzfDyHuB0QkbKpt9KzLLYjJhB67+AFM83mqgIwY8oMC1tJTcHTjj2kxf+vlJaSLTBJC1EZ0RoM0XHxw=):{\"oip-041\":{\"artifact\":{\"publisher\":\"F89kd8Cso79V3okG7BKMvLnP13p5DhsLBr\",\"timestamp\":1506720686,\"type\":\"video\",\"info\":{\"title\":\"Nightwish - Amaranth (OFFICIAL VIDEO)\",\"description\":\".:. Uploaded via YouTubeExit.com | Saving the world's videos one watch at a time.\",\"year"
    let thrown = false;
    try {
        let multi_parts = await index.getMultiparts(no_part)
    } catch (err) {thrown = true}

    expect(thrown).toBeTruthy()
})