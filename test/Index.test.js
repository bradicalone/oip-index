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

let index = new Index();

test('Index.getArtifact()', async () => {
    //HAS TO BE THE TX OF AN ARTIFACT OR A FIRST PART MULTIPART
    let artifact = await index.getArtifact(txid42);
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
    let floData = await index.getFloData('rgrqwg');
    console.log(floData)
    expect(floData).toBeDefined();
})

test('Index.searchFloData() for an OIP42 multiparts', async () => {
    let floData = await index.searchFloData(txid42.substr(0,10));
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

    expect(Array.isArray(multi_parts)).toBeTruthy;
    for (let mp of multi_parts){
        expect(mp).toBeInstanceOf(Multipart)
    }
}, 10000);

test('Index.getMulitparts with valid 42 addr part 2', async () => {
    let multi_parts = await index.getMultiparts(tx2)
    console.dir(`multi_parts[0]: ${multi_parts[0]}`)
    console.dir(`multi_parts[1]: ${multi_parts[1]}`)
    console.log(`multi_parts = ${multi_parts}`)

    expect(Array.isArray(multi_parts)).toBeTruthy;
    for (let mp of multi_parts){
        expect(mp).toBeInstanceOf(Multipart)
    }
}, 10000);







