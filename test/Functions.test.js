import ArtifactPicker from '../src/Functions/ArtifactPicker'
import {Artifact} from '../src/main'
import {ResearchTomogram} from '../src/OIPComponents/Artifacts/index'

let artifact041JSON = {
	"artifact": {
		"publisher": "FPkvwEHjddvva2smpYwQ4trgudwFcrXJ1X",
		"payment": {
			"addresses": [],
			"retailer": 15,
			"sugTip": [],
			"fiat": "USD",
			"scale": "1000:1",
			"promoter": 15,
			"maxdisc": 30
		},
		"storage": {
			"files": [
				{
					"fname": "headshot.jpg",
					"fsize": 100677,
					"type": "Image"
				}
			],
			"location": "QmUjSCcBda9YdEUKVLPQomHzSatwytPqQPAh4fdMiRV8bp",
			"network": "IPFS"
		},
		"type": "Image-Basic",
		"info": {
			"title": "Headshot",
			"extraInfo": {
				"artist": "David Vasandani",
				"genre": "People"
			}
		},
		"timestamp": 1531065099
	},
	"meta": {
		"block_hash": "a2ca4c3f06032dc4f9df7eca829b42b91da9595dbe9f4623a1c7f92a5508cfb9",
		"txid": "5f399eef8f93c03502efbd51691350cbacbf3c16eba228409bf7453ffff78207",
		"block": 2832215,
		"time": 1531065167,
		"type": "oip041"
	}
}

let artifactResearchTomogramJSON = {
	"artifact": {
		"signature": "IEoXQRwrF5AqT8imORattfcyin2xGDBHx2vpSLZf6+NHPT6G/TMhrDmWXyN8FasxV9zP9hopExx/yuFFrqoEsdM=",
		"subtype": "tomogram",
		"details": {
			"date": 1389657600,
			"strain": "P2",
			"tiltMax": 55,
			"dosage": 180,
			"magnification": 22500,
			"tiltStep": 1,
			"scopeName": "Caltech Polara",
			"NCBItaxID": 273057,
			"lab": "Jensen Lab",
			"tiltConstant": 1,
			"defocus": -10,
			"tiltSingleDual": 1,
			"sid": "rr2014-01-14-5",
			"institution": "Caltech",
			"tiltMin": -55,
			"speciesName": "Sulfolobus solfataricus ",
			"microscopist": "Rasika Ramdasi",
			"artNotes": "Tilt series notes: STIV - infected Sulfolobus solfataricus, Sulfolobus turreted \r\nicosahedral virus, Taxonomy ID 269145, Sulfolobus solfataricus, \r\nthermophile, pyramid, intrapyramidal body, virus infection \r\n\r\n10 hour post infection\n"
		},
		"storage": {
			"files": [
				{
					"fname": "AutoCaps/rr2014-01-14-5_slicer3727.jpg",
					"fsize": 157176,
					"subtype": "snapshot",
					"fNotes": "STIV turrets",
					"dname": "rr2014-01-14-5_slicer3727.jpg",
					"type": "tomogram"
				},
				{
					"fname": "AutoCaps/rr2014-01-14-5_slicer10483.jpg",
					"fsize": 364450,
					"subtype": "snapshot",
					"fNotes": "Baby pyramid STIV",
					"dname": "rr2014-01-14-5_slicer10483.jpg",
					"type": "tomogram"
				},
				{
					"fname": "AutoCaps/rr2014-01-14-5_slicer10560.jpg",
					"fsize": 214333,
					"subtype": "snapshot",
					"dname": "rr2014-01-14-5_slicer10560.jpg",
					"type": "tomogram"
				},
				{
					"fname": "AutoCaps/rr2014-01-14-5_slicer10561.jpg",
					"fsize": 216830,
					"subtype": "snapshot",
					"fNotes": "Sulfolobus liposomes",
					"dname": "rr2014-01-14-5_slicer10561.jpg",
					"type": "tomogram"
				},
				{
					"fname": "3dimage_37677/stiv10h3_0004_full.rec",
					"fsize": 623617024,
					"software": "Raptor",
					"subtype": "reconstruction",
					"dname": "stiv10h3_0004_full.rec",
					"type": "tomogram"
				},
				{
					"fname": "rawdata/stiv10h3_0004.mrc",
					"fsize": 3161185656,
					"software": "UCSFTomo",
					"subtype": "tiltSeries",
					"dname": "stiv10h3_0004.mrc",
					"type": "tomogram"
				},
				{
					"fname": "keyimg_rr2014-01-14-5_s.jpg",
					"fsize": 17177,
					"subtype": "thumbnail",
					"cType": "image/jpeg",
					"type": "image"
				},
				{
					"fname": "keyimg_rr2014-01-14-5.jpg",
					"fsize": 1028432,
					"subtype": "keyimg",
					"cType": "image/jpeg",
					"type": "tomogram"
				},
				{
					"fname": "keymov_rr2014-01-14-5.mp4",
					"fsize": 18321118,
					"subtype": "keymov",
					"cType": "video/mp4",
					"type": "tomogram"
				},
				{
					"fname": "keymov_rr2014-01-14-5.flv",
					"fsize": 57815879,
					"subtype": "keymov",
					"cType": "video/x-flv",
					"type": "tomogram"
				}
			],
			"location": "Qmat8i2pn4WnnMiPQcKsKJZahr1scUbuUyXjgSuCPBcsYY",
			"network": "ipfs"
		},
		"type": "research",
		"floAddress": "FTSTq8xx8yWUKJA5E3bgXLzZqqG9V6dvnr",
		"info": {
			"description": "Auto imported from etdb",
			"title": "Sulfolobus solfac.P2+STIV",
			"tags": "etdb,jensen.lab,tomogram,electron.tomography"
		},
		"timestamp": 1528156632
	},
	"meta": {
		"block_hash": "2581122c83779a504e9a2a5431e87d6cfbd9b728f3f404bbf28b2738452240ba",
		"txid": "8a07e957cce6473887e8f9d042b0a3b95fc7dd2b9110b4a37890887de6528f10",
		"block": 2783156,
		"time": 1528156646,
		"type": "oip042"
	}
}

describe('Helper Functions', () => {
	it('Should Hydrate a generic Artifact', () => {
		let art = ArtifactPicker(artifact041JSON)
		expect(art.getInternalTypeAndSubtype()).toEqual('generic-record')
		expect(art.isValid().success).toBeTruthy()
		expect(art instanceof Artifact).toBeTruthy()
	})
	it('Should Hydrate a ResearchTomogram Artifact', () => {
		let art = ArtifactPicker(artifactResearchTomogramJSON)
		expect(art.getInternalTypeAndSubtype()).toEqual('research-tomogram')
		expect(art.isValid().success).toBeTruthy()
		expect(art instanceof ResearchTomogram).toBeTruthy()
	})
})