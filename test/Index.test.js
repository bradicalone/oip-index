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
    expect(artifact instanceof Artifact).toBeTruthy()
    expect(artifact.isValid().success).toBeTruthy()
},10000)

