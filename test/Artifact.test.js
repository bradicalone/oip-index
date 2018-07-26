var OIP = require("../src/main");

import Index from '../src/Index'
const oip41_artifact = "8a5fae038747565fab39b992907ea738a56736806153741610ad53c6c38567eb";
const oip41_artifact_wJSON = "5c9244e149b0a275f205e1d111da8da173b8eb9a9b0e400cd224d4a71266877c"

var Artifact = OIP.Artifact;
var ArtifactFile = OIP.ArtifactFile;
var Multipart = OIP.Multipart;

test("A Blank Artifact can be created", () => {
	var artifact = new Artifact();
	console.log(artifact)
	expect(artifact).toBeDefined();
})

test("Construct Artifact with floData that has a json: prefix", async () => {
    let Network = new Index();
    let flo_data = await Network.getFloData(oip41_artifact_wJSON)
    let art = new Artifact(flo_data)
    expect(art.isValid()).toBeTruthy()
})

test("Construct Artifact with floData (invalid multipart)", async () => {
    const oip41_artifact_ = "8a5fae038747565fab39b992907ea738a56736806153741610ad53c6c38567eb"
    let Network = new Index();
    let flo_data = await Network.getFloData(oip41_artifact_)
    let art = new Artifact(flo_data)
    console.log(art)
    expect(art.isValid()).toBeTruthy()
})

test("Construct Artifact with floData", async () => {
    let Network = new Index();
    let flo_data = await Network.getFloData(oip41_artifact_wJSON)
    if (flo_data.startsWith("json:")) {flo_data = flo_data.slice(5)}
    let art = new Artifact(flo_data)
    console.log(art.isValid())

})

test("Artifact can be created from Multiparts", () => {
	var multipartStrings = [
		'oip-mp(0,1,FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k,,IPw0M1gDPlY21v7aFYyYBiM7C641PhnSLUAw0jla9B18FteQ6f8dHc2m0a0rpMNmh8gUjRDbHTFYqz4MD/S820Y=):{"oip-041":{"artifact":{"type":"Image-Basic","info":{"extraInfo":{"genre":"The Arts"},"title":"Alexandria Logo"},"storage":{"network":"IPFS","files":[{"fname":"Alexandria.png","fsize":638001,"type":"Image"}],"location":"QmNmVHfXuh5Tub76H1fog7wSM8of4Njfm2j1oTg8ZYUBZm"},"payment":{"fiat":"USD","scale":"1000:1","maxdisc":30,"promoter":15,"retailer":15,"sugTip":[],"addres',
		'oip-mp(1,1,FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k,2c5140f5da,H8fjRKrXyMJlxjZLGWxjzdJG/BW5Bn+k+tmud5yGf3sYGhAQDd+aYVtAC1H8LGy+w011kYPjApuF29jrcZPQJP4=):ses\":[]},\"timestamp\":1526153770,\"publisher\":\"FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k\"},\"signature\":\"IO0i5yhuwDy5p93VdNvEAna6vsH3UmIert53RedinQV+ScLzESIX8+QrL4vsquCjaCY0ms0ZlaSeTyqRDXC3Iw4=\"}}'
	]

	var artifact = new Artifact();

	artifact.fromMultiparts(multipartStrings);

	expect(artifact.getLocation()).toBe("QmNmVHfXuh5Tub76H1fog7wSM8of4Njfm2j1oTg8ZYUBZm")

	var multiparts = artifact.getMultiparts();

	expect(multiparts.length).toBe(2);

	for (var mp in multiparts){
		expect(multipartStrings[mp]).toEqual(multiparts[mp].toString())
	}
})

test("Artifact can be created from JSON string", () => {
	var artifactString = '{"oip042":{"artifact":{"floAddress":"FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k","info":{"title":"Artifact with Poll","description":"This should hopefully show a poll eventually :) http://www.strawpoll.me/14164922","year":2017},"details":{},"storage":{"network":"IPFS","files":[{"fname":"lhuWVA00Vn.png","fsize":23591,"type":"Image"}],"location":"QmQh7uTC5YSinJG2FgWLrd8MYSNtr8G5JGAckR5ARwmyET"},"payment":{},"timestamp":1508188263,"type":"Image","subtype":"Basic","signature":"IAiCzx8ICjAKoj98yw5VwKLCzIuAGM1fVIewZjC/PrBHVkUsl67R2Pv0Eu1fFaWsoONmVc1lZA+lpmQ4/dGVG6o="}},"txid":"1cb19b83dd20614d05ea64fffb111d588cf513ee65aa488953944fc7fe95e2c4","publisherName":"OstlerDev"}'

	var artifact = new Artifact(artifactString);

	expect(artifact.getTXID()).toBe("1cb19b83dd20614d05ea64fffb111d588cf513ee65aa488953944fc7fe95e2c4")
})

test("Artifact can be created from JSON", () => {
	var artifactJSON = {"oip042":{"artifact":{"floAddress":"FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k","info":{"title":"Artifact with Poll","description":"This should hopefully show a poll eventually :) http://www.strawpoll.me/14164922","year":2017},"details":{},"storage":{"network":"IPFS","files":[{"fname":"lhuWVA00Vn.png","fsize":23591,"type":"Image"}],"location":"QmQh7uTC5YSinJG2FgWLrd8MYSNtr8G5JGAckR5ARwmyET"},"payment":{},"timestamp":1508188263,"type":"Image","subtype":"Basic","signature":"IAiCzx8ICjAKoj98yw5VwKLCzIuAGM1fVIewZjC/PrBHVkUsl67R2Pv0Eu1fFaWsoONmVc1lZA+lpmQ4/dGVG6o="}},"txid":"1cb19b83dd20614d05ea64fffb111d588cf513ee65aa488953944fc7fe95e2c4","publisherName":"OstlerDev"}

	var artifact = new Artifact(artifactJSON);

	expect(artifact.getTXID()).toBe("1cb19b83dd20614d05ea64fffb111d588cf513ee65aa488953944fc7fe95e2c4")
})

test("getTXID is undefined if not set", () => {
	var artifact = new Artifact();

	expect(artifact.getTXID()).toBeUndefined()
})

test("test setTXID and getTXID", () => {
	var artifact = new Artifact();

	artifact.setTXID("test-txid")

	expect(artifact.getTXID()).toBe("test-txid")
})

test("Get Publisher Name is blank string if main address is not set", () => {
	var artifact = new Artifact();

	expect(artifact.getPublisherName()).toBe("")
})

test("Get Publisher Name is main address if publisher name is not set", () => {
	var artifact = new Artifact();

	artifact.setMainAddress("main-address")

	expect(artifact.getPublisherName()).toBe("main-address")
})

test("Get Publisher Name is correct when set", () => {
	var artifact = new Artifact();

	artifact.setMainAddress("main-address")
	artifact.setPublisherName("publisher-name")

	expect(artifact.getPublisherName()).toBe("publisher-name")
})

test("setMainAddress and getMainAddress", () => {
	var artifact = new Artifact();

	artifact.setMainAddress("main-address")

	expect(artifact.getMainAddress()).toBe("main-address")
})

test("setTimestamp and getTimestamp", () => {
	var artifact = new Artifact();

	var time = Date.now()

	artifact.setTimestamp(time)

	expect(artifact.getTimestamp()).toBe(time)
})

test("setTimestamp enforces that it is a number", () => {
	var artifact = new Artifact();

	var time = "not-time"

	artifact.setTimestamp(time)

	expect(artifact.getTimestamp()).toBeUndefined()
})

test("setTitle and getTitle", () => {
	var artifact = new Artifact();

	artifact.setTitle("title")

	expect(artifact.getTitle()).toBe("title")
})

test("getTitle is blank string if undefined", () => {
	var artifact = new Artifact();

	expect(artifact.getTitle()).toBe("")
})

test("setDescription and getDescription", () => {
	var artifact = new Artifact();

	artifact.setDescription("test description")

	expect(artifact.getDescription()).toBe("test description")
})

test("getDescription is blank string if undefined", () => {
	var artifact = new Artifact();

	expect(artifact.getDescription()).toBe("")
})

test("setType and getType", () => {
	var artifact = new Artifact();

	artifact.setType("Audio")

	expect(artifact.getType()).toBe("Audio")
})


test("setType capitalizeFirstLetter", () => {
	var artifact = new Artifact();

	artifact.setType("audio")

	expect(artifact.getType()).toBe("Audio")
})

test("setType doesn't allow non-supported base types", () => {
	var artifact = new Artifact();

	artifact.setType("Newtype")

	expect(artifact.getType()).toBeUndefined()
})

test("getType is undefined if undefined", () => {
	var artifact = new Artifact();

	expect(artifact.getType()).toBeUndefined()
})

test("setSubtype and getSubtype", () => {
	var artifact = new Artifact();

	artifact.setSubtype("Basic")

	expect(artifact.getSubtype()).toBe("Basic")
})

test("setSubtype capitalizeFirstLetter", () => {
	var artifact = new Artifact();

	artifact.setSubtype("basic")

	expect(artifact.getSubtype()).toBe("Basic")
})

test("getSubtype is undefined if undefined", () => {
	var artifact = new Artifact();

	expect(artifact.getSubtype()).toBeUndefined()
})

test("setYear and getYear", () => {
	var artifact = new Artifact();

	artifact.setYear(2018)

	expect(artifact.getYear()).toBe(2018)
})

test("setYear restricts to number", () => {
	var artifact = new Artifact();

	artifact.setYear("Year")

	expect(artifact.getYear()).toBeUndefined()
})

test("getYear is undefined if undefined", () => {
	var artifact = new Artifact();

	expect(artifact.getYear()).toBeUndefined()
})

test("setNSFW and getNSFW", () => {
	var artifact = new Artifact();

	artifact.setNSFW(true)

	expect(artifact.getNSFW()).toBe(true)
})

test("getNSFW is false if not set", () => {
	var artifact = new Artifact();

	expect(artifact.getNSFW()).toBe(false)
})

test("setTags can be defined by array", () => {
	var artifact = new Artifact();

	artifact.setTags(["tag1", "tag2", "tag3"])

	expect(artifact.getTags()).toEqual(["tag1", "tag2", "tag3"])
})

test("setTags can be defined from string", () => {
	var artifact = new Artifact();

	artifact.setTags("tag1, tag2, tag3")

	expect(artifact.getTags()).toEqual(["tag1", "tag2", "tag3"])
})

test("getTags is blank array if undefined", () => {
	var artifact = new Artifact();

	expect(artifact.getTags()).toEqual([])
})

test("setDetail", () => {
	var artifact = new Artifact();

	artifact.setDetail("artist", "Artist Name")

	expect(artifact.getDetail("artist")).toBe("Artist Name")
})

test("getDetail is undefined if undefined", () => {
	var artifact = new Artifact();

	expect(artifact.getDetail("artist")).toBeUndefined()
})

test("setSignature and getSignature", () => {
	var artifact = new Artifact();

	artifact.setSignature("signature")

	expect(artifact.getSignature()).toBe("signature")
})

test("getSignature is undefined if undefined", () => {
	var artifact = new Artifact();

	expect(artifact.getSignature()).toBeUndefined()
})

test("setNetwork and getNetwork", () => {
	var artifact = new Artifact();

	artifact.setNetwork("storj")

	expect(artifact.getNetwork()).toBe("storj")
})

test("getNetwork is IPFS if not set", () => {
	var artifact = new Artifact();

	expect(artifact.getNetwork()).toBe("IPFS")
})

test("setLocation and getLocation", () => {
	var artifact = new Artifact();

	artifact.setLocation("location")

	expect(artifact.getLocation()).toBe("location")
})

test("getLocation is undefined if not set", () => {
	var artifact = new Artifact();

	expect(artifact.getLocation()).toBeUndefined()
})

test("setPaymentFiat and getPaymentFiat", () => {
	var artifact = new Artifact();

	artifact.setPaymentFiat("usd")

	expect(artifact.getPaymentFiat()).toBe("usd")
})

test("getPaymentFiat is undefined if not set", () => {
	var artifact = new Artifact();

	expect(artifact.getPaymentFiat()).toBeUndefined()
})

test("setPaymentScale and getPaymentScale", () => {
	var artifact = new Artifact();

	artifact.setPaymentScale(1000)

	expect(artifact.getPaymentScale()).toBe(1000)
})

test("setPaymentScale from ratio string", () => {
	var artifact = new Artifact();

	artifact.setPaymentScale("1000:1")

	expect(artifact.getPaymentScale()).toBe(1000)
})

test("getPaymentScale is 1 if undefined", () => {
	var artifact = new Artifact();

	expect(artifact.getPaymentScale()).toBe(1)
})

test("setSuggestedTip and getSuggestedTip", () => {
	var artifact = new Artifact();

	artifact.setSuggestedTip([1,100,1000])

	expect(artifact.getSuggestedTip()).toEqual([1,100,1000])
})

test("getSuggestedTip is empty array if undefined", () => {
	var artifact = new Artifact();

	expect(artifact.getSuggestedTip()).toEqual([])
})

test("addSinglePaymentAddress and getPaymentAddresses", () => {
	var artifact = new Artifact();

	artifact.addSinglePaymentAddress("flo", "FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k")

	expect(artifact.getPaymentAddresses()).toEqual({flo: "FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k"})
})

test("getPaymentAddresses is blank array if unset & no mainAddress is set", () => {
	var artifact = new Artifact();

	expect(artifact.getPaymentAddresses()).toEqual({})
})

test("getPaymentAddresses returns main address if unset", () => {
	var artifact = new Artifact();

	artifact.setMainAddress("FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k")

	expect(artifact.getPaymentAddresses()).toEqual({ "flo": "FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k" })
})

test("setRetailerCut and getRetailerCut", () => {
	var artifact = new Artifact();

	artifact.setRetailerCut(10)

	expect(artifact.getRetailerCut()).toBe(10)
})

test("setRetailerCut cant be set by a string", () => {
	var artifact = new Artifact();

	artifact.setRetailerCut("string")

	expect(artifact.getRetailerCut()).toBe(0)
})

test("getRetailerCut is 0 if unset", () => {
	var artifact = new Artifact();

	expect(artifact.getRetailerCut()).toBe(0)
})

test("setPromoterCut and getPromoterCut", () => {
	var artifact = new Artifact();

	artifact.setPromoterCut(10)

	expect(artifact.getPromoterCut()).toBe(10)
})

test("setPromoterCut cant be set by a string", () => {
	var artifact = new Artifact();

	artifact.setPromoterCut("string")

	expect(artifact.getPromoterCut()).toBe(0)
})

test("getPromoterCut is 0 if unset", () => {
	var artifact = new Artifact();

	expect(artifact.getPromoterCut()).toBe(0)
})

test("setMaxDiscount and getMaxDiscount", () => {
	var artifact = new Artifact();

	artifact.setMaxDiscount(30)

	expect(artifact.getMaxDiscount()).toBe(30)
})

test("setMaxDiscount cant be set by string", () => {
	var artifact = new Artifact();

	artifact.setMaxDiscount("string")

	expect(artifact.getMaxDiscount()).toBe(0)
})

test("getMaxDiscount is 0 if unset", () => {
	var artifact = new Artifact();

	expect(artifact.getMaxDiscount()).toBe(0)
})

test("addFile ArtifactFile object", () => {
	var artifact = new Artifact();

	var file = new ArtifactFile();

	artifact.addFile(file);

	expect(artifact.getFiles()[0].toJSON()).toEqual(file.toJSON())
})

test("addFile json object", () => {
	var artifact = new Artifact();

	var file = new ArtifactFile();

	artifact.addFile(file.toJSON());

	expect(artifact.getFiles()[0].toJSON()).toEqual(file.toJSON())
})

test("getFiles is blank array if undefined", () => {
	var artifact = new Artifact();

	expect(artifact.getFiles()).toEqual([])
})

test("getThumbnail Image and Thumbnail set", () => {
	var artifact = new Artifact();

	var file = new ArtifactFile();

	file.setType("Image")

	artifact.addFile(file);

	var file2 = new ArtifactFile();

	file2.setType("Image")
	file2.setSubtype("Thumbnail")

	artifact.addFile(file2);

	expect(artifact.getThumbnail().toJSON()).toEqual(file2.toJSON())
})

test("getThumbnail get free Image & not paid thumbnail", () => {
	var artifact = new Artifact();

	var file = new ArtifactFile();

	file.setType("Image")
	file.setSubtype("Thumbnail")
	file.setSuggestedPlayCost(1)

	artifact.addFile(file);

	var file2 = new ArtifactFile();

	file2.setType("Image")

	artifact.addFile(file2);

	expect(artifact.getThumbnail().toJSON()).toEqual(file2.toJSON())
})

test("getThumbnail is undefined if no files are available", () => {
	var artifact = new Artifact();

	expect(artifact.getThumbnail()).toBe(undefined)
})

test("getThumbnail is undefined if no free images are found", () => {
	var artifact = new Artifact();

	var file = new ArtifactFile();

	file.setType("Image")
	file.setSuggestedPlayCost(1)

	artifact.addFile(file);

	expect(artifact.getThumbnail()).toBe(undefined)
})

test("getThumbnail is undefined if no free thumbnails are found", () => {
	var artifact = new Artifact();

	var file = new ArtifactFile();

	file.setType("Image")
	file.setSubtype("Thumbnail")
	file.setSuggestedPlayCost(1)

	artifact.addFile(file);

	expect(artifact.getThumbnail()).toBe(undefined)
})

test("getDuration is undefined if no files have a duration", () => {
	var artifact = new Artifact();

	artifact.addFile(new ArtifactFile())
	artifact.addFile(new ArtifactFile())
	artifact.addFile(new ArtifactFile())

	expect(artifact.getDuration()).toBeUndefined()
})

test("getDuration returns the duration of a found file", () => {
	var artifact = new Artifact();

	artifact.addFile(new ArtifactFile())

	var file = new ArtifactFile();

	file.setDuration(123)

	artifact.addFile(file)

	artifact.addFile(new ArtifactFile())

	expect(artifact.getDuration()).toBe(123)
})

test("isValid requires title and mainAddress to be set", () => {
	var artifact = new Artifact();

	artifact.setTitle("title")
	artifact.setMainAddress("FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k")

	expect(artifact.isValid()).toEqual({success: true})
})

test("isValid fails on only title", () => {
	var artifact = new Artifact();

	artifact.setTitle("title")

	expect(artifact.isValid()).toEqual({success: false, error: "floAddress is a Required Field!"})
})

test("isValid fails on only mainAddress", () => {
	var artifact = new Artifact();

	artifact.setMainAddress("FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k")

	expect(artifact.isValid()).toEqual({success: false, error: "Artifact Title is a Required Field"})
})

test("isPaid no files", () => {
	var artifact = new Artifact();

	expect(artifact.isPaid()).toBe(false)
})

test("isPaid only free files", () => {
	var artifact = new Artifact();

	artifact.addFile(new ArtifactFile())
	artifact.addFile(new ArtifactFile())
	artifact.addFile(new ArtifactFile())
	artifact.addFile(new ArtifactFile())

	expect(artifact.isPaid()).toBe(false)
})

test("isPaid one paid file several free files", () => {
	var artifact = new Artifact();

	artifact.addFile(new ArtifactFile())
	artifact.addFile(new ArtifactFile())
	var file = new ArtifactFile()
	file.setSuggestedPlayCost(1);
	artifact.addFile(file);
	artifact.addFile(new ArtifactFile())

	expect(artifact.isPaid()).toBe(true)
})

test("toJSON", () => {
	var artifact = new Artifact();

	expect(artifact.toJSON()).toEqual({
		"oip042": {
			"artifact": {
				"details": {}, 
				"floAddress": "", 
				"info": {}, 
				"payment": {}, 
				"storage": {
					"files": [], "network": "IPFS"
				}
			}
		}
	})
})

test("fromJSON toJSON", () => {
	var artifact = new Artifact({
		"oip042": {
			"artifact": {
				"details": {}, 
				"floAddress": "", 
				"info": {
					"title": "Test Title"
				}, 
				"payment": {}, 
				"storage": {
					"files": [], "network": "IPFS"
				}
			}
		}
	});

	expect(artifact.toJSON()).toEqual({
		"oip042": {
			"artifact": {
				"details": {}, 
				"floAddress": "", 
				"info": {
					"title": "Test Title"
				}, 
				"payment": {}, 
				"storage": {
					"files": [], "network": "IPFS"
				}
			}
		}
	})
})

test("import AlexandriaMedia", () => {
	var artifact = new Artifact({
		"media-data":{
			"alexandria-media":{
				"torrent":"QmRA3NWM82ZGynMbYzAgYTSXCVM14Wx1RZ8fKP42G6gjgj",
				"publisher":"FTmRrnn3g9trv6WjBvG6r5ueCyey6tU9Ro",
				"timestamp":1432164849000,
				"type":"book",
				"info":{"title":"Bitcoin: A Peer-to-Peer Electronic Cash System","description":"Abstract. A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution. Digital signatures provide part of the solution, but the main benefits are lost if a trusted third party is still required to prevent double-spending. We propose a solution to the double-spending problem using a peer-to-peer network. The network timestamps transactions by hashing them into an ongoing chain of hash-based proof-of-work, forming a record that cannot be changed without redoing the proof-of-work. The longest chain not only serves as proof of the sequence of events witnessed, but proof that it came from the largest pool of CPU power. As long as a majority of CPU power is controlled by nodes that are not cooperating to attack the network, they'll generate the longest chain and outpace attackers. The network itself requires minimal structure. Messages are broadcast on a best effort basis, and nodes can leave and rejoin the network at will, accepting the longest proof-of-work chain as proof of what happened while they were gone.  satoshin@gmx.com www.bitcoin.org","year":2008,"extra-info":{"Bitcoin Address":"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa","DHT Hash":"QmRA3NWM82ZGynMbYzAgYTSXCVM14Wx1RZ8fKP42G6gjgj","artist":"Satoshi Nakamoto","filename":"bitcoin.pdf"}},"payment":{"amount":"0,0,0","currency":"USD","type":"tip"},"extras":""},"signature":"IMAgFowf8TFdaTLDb3MUwTermXEtuAv6NN/MvQt1nkNWzDSg0KfSSQfF1QnzS75OLzM08J2rTIZXFT2OH0QlaUU="},"txid":"aab940a3d233b2101ab1aa242da3727cc402a7d192b5af40ac80836aaa60c27f","block":1194848,"publisher-name":"satoshi"});

	expect(artifact.getTitle()).toBe("Bitcoin: A Peer-to-Peer Electronic Cash System")
	expect(artifact.getDetail('artist')).toBe("Satoshi Nakamoto")
	expect(artifact.getLocation()).toBe("QmRA3NWM82ZGynMbYzAgYTSXCVM14Wx1RZ8fKP42G6gjgj")
	expect(artifact.getNetwork()).toBe("IPFS")
})

test("import 041", () => {
	var artifact = new Artifact({"block":2795950,
		"oip-041":{
			"artifact":{
				"publisher":"FEAFV8xroed1CyAx1mUH4iSyXvMZXhj6mZ",
				"timestamp":1529386915,
				"type":"Video-Basic",
				"info":{"title":"Open Index Protocol: Alice & Bob (and Izzy & Sam)","description":"This is a draft of an explainer animation for the Open Index Protocol. Please send any notes, questions or media requests to amy@alexandria.io","tags":"","year":2016,"nsfw":false,"extraInfo":{"artist":"Alexandria","genre":"Science & Technology"}},
				"storage":{"network":"IPFS","location":"QmTYNkdv12XKvLYV6n89j5Dp7rTTiGmdkYzL3eZXBRKcBH","files":[{"dname":"Introducing the Open Index Protocol (480p)","duration":146,"fname":"OIP_intro_video1_480p.mp4","fsize":40522567,"type":"Video","subtype":"SD480"},{"dname":"Introducing the Open Index Protocol (720p)","duration":146,"fname":"OIP_intro_video1_720p.mp4","fsize":70150121,"type":"Video","subtype":"HD720"},{"fname":"previewimage.png","fsize":1968602,"type":"Image","subtype":"cover"}]},
				"payment":{"fiat":"USD","scale":"1000:1","sugTip":[],"tokens":null,"addresses":[],"retailer":15,"promoter":15,"maxdisc":30}}},"txid":"d286baa9aa624677bb87e4cc806f847e75239ce9f0eb37b441ea3fc59e1c7933","publisherName":"publisher1"});

	expect(artifact.getTitle()).toBe("Open Index Protocol: Alice & Bob (and Izzy & Sam)")
	expect(artifact.getType()).toBe("Video")
	expect(artifact.getSubtype()).toBe("Basic")
	expect(artifact.getNetwork()).toBe("IPFS")
	expect(artifact.getLocation()).toBe("QmTYNkdv12XKvLYV6n89j5Dp7rTTiGmdkYzL3eZXBRKcBH")
	expect(artifact.getRetailerCut()).toBe(15)
	expect(artifact.getPromoterCut()).toBe(15)
    expect(artifact.getPaymentAddresses()).toEqual({"flo": "FEAFV8xroed1CyAx1mUH4iSyXvMZXhj6mZ"})
})

test("import 042", () => {
	var artifact = new Artifact({
		"oip042":{
			"artifact":{
				"floAddress":"FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k",
				"timestamp":1526153770,
				"type":"Image",
				"subtype":"Basic",
				"info":{"title":"Alexandria Logo","year":2018},
				"storage":{"network":"IPFS","location":"QmNmVHfXuh5Tub76H1fog7wSM8of4Njfm2j1oTg8ZYUBZm","files":[{"fname":"Alexandria.png","fsize":638001,"type":"Image"}]},
				"signature":"IO0i5yhuwDy5p93VdNvEAna6vsH3UmIert53RedinQV+ScLzESIX8+QrL4vsquCjaCY0ms0ZlaSeTyqRDXC3Iw4="}
			},"txid":"2c5140f5da2c7ab5434af0953e22fe4800b7e09ecbec2836fe91d6bbe771134e","publisherName":"OstlerDev"});

	expect(artifact.getTitle()).toBe("Alexandria Logo")
	expect(artifact.getYear()).toBe(2018)
	expect(artifact.getLocation()).toBe("QmNmVHfXuh5Tub76H1fog7wSM8of4Njfm2j1oTg8ZYUBZm")
	expect(artifact.getSignature()).toBe("IO0i5yhuwDy5p93VdNvEAna6vsH3UmIert53RedinQV+ScLzESIX8+QrL4vsquCjaCY0ms0ZlaSeTyqRDXC3Iw4=")
	expect(artifact.getTXID()).toBe("2c5140f5da2c7ab5434af0953e22fe4800b7e09ecbec2836fe91d6bbe771134e")
	expect(artifact.getPublisherName()).toBe("OstlerDev")
    expect(artifact.getPaymentAddresses()).toEqual({"flo": "FLZXRaHzVPxJJfaoM32CWT4GZHuj2rx63k"})
})

test("getMultiparts (too short)", () => {
	var artifact = new Artifact();

	artifact.setMainAddress("mainAddress")

	artifact.setDescription("a short description")

	expect(artifact.getMultiparts()).toBeUndefined()
})

test("getMultiparts", () => {
	var artifact = new Artifact();

	artifact.setMainAddress("mainAddress")

	artifact.setDescription("a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description ")

    var expectedMultiparts = [
        new Multipart('oip-mp(0,2,mainAddress,,):json:{"oip042":{"artifact":{"floAddress":"mainAddress","info":{"description":"a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very lo'),
        new Multipart('oip-mp(1,2,mainAddress,,):ng description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description "},"details":{},"storage":{"network":"IPFS"'),
        new Multipart('oip-mp(2,2,mainAddress,,):,"files":[]},"payment":{}}}}')
    ]

	expect(artifact.getMultiparts()).toEqual(expectedMultiparts)
    // artifact.getMultiparts()
})

test("fromMultiparts matches getMultiparts json identifier", () => {
	var artifact = new Artifact([
		new Multipart('oip-mp(0,2,mainAddress,,):{"oip042":{"artifact":{"floAddress":"mainAddress","info":{"description":"a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very lo'),
		new Multipart('oip-mp(1,2,mainAddress,,):ng description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description "},"details":{},"storage":{"network":"IPFS"'),
		new Multipart('oip-mp(2,2,mainAddress,,):,"files":[]},"payment":{}}}}')
	]);

	expect(artifact.getMultiparts()).toEqual([
		new Multipart('oip-mp(0,2,mainAddress,,):{"oip042":{"artifact":{"floAddress":"mainAddress","info":{"description":"a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very lo'),
		new Multipart('oip-mp(1,2,mainAddress,,):ng description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description a very long description "},"details":{},"storage":{"network":"IPFS"'),
		new Multipart('oip-mp(2,2,mainAddress,,):,"files":[]},"payment":{}}}}')
	])
})

test("capitalizeFirstLetter", () => {
	var artifact = new Artifact();

	expect(artifact.capitalizeFirstLetter("test")).toBe("Test")
	expect(artifact.capitalizeFirstLetter("Test")).toBe("Test")
	expect(artifact.capitalizeFirstLetter("TEST")).toBe("Test")
	expect(artifact.capitalizeFirstLetter("tEST")).toBe("Test")
	expect(artifact.capitalizeFirstLetter("tEsT")).toBe("Test")
	expect(artifact.capitalizeFirstLetter("TeSt")).toBe("Test")
})

test("getClassName", () => {
	var artifact = new Artifact();
	expect(artifact.getClassName()).toBe("Artifact")
})
