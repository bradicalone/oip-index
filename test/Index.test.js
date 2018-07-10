import Index from '../src/Index'
import Artifact from '../src/Artifact';

const txid = '5f399eef8f93c03502efbd51691350cbacbf3c16eba228409bf7453ffff78207';
const txid2= '666a12f03a424193775d44d542c3a34838fa1dc5e344d9d9d1efb2541725f14f';

const shortTXID = '5f399e';
const shortTXID2 = '666a12';

let index = new Index();

test('Index.getArtifact()', async () => {
    let artifact = await index.getArtifact(txid)
    expect(artifact).toBeDefined();
    expect(artifact).tobeInstanceOf(Artifact)
    expect(artifact.isValid().success).toBeTruthy()
},10000);

test('Index.getLatestArtifacts()', async () => {
    let artifacts = await index.getLatestArtifacts(3);
    expect(artifacts.length > 0).toBeTruthy();
    for (let art of artifacts)
        expect(art).toBeInstanceOf(Artifact)
    expect(artifacts.length).toBe(3);
});

test('Index.getArtifacts() without parameters', async () => {
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

//@ToDo::Why can't OIPd find audio, image, etc types?
test('Index.getArtifacts() cant find type (returns empty array)', async () => {
    let artifacts = await index.getArtifacts("audio");
    expect(artifacts.length === 0).toBeTruthy();
});

test('Index.getFloData()', async () => {
    let floData = await index.getFloData(txid);
    expect(floData).toBeDefined();
})

test('')


