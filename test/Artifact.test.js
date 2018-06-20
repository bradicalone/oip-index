var Artifact = require("../lib").Artifact;

test("A Blank Artifact can be created", () => {
	var artifact = new Artifact();
	expect(artifact).toBeDefined();
})