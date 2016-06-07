var mongoose = require('mongoose');  
var demasoniSchema = new mongoose.Schema({  
	action: String,
	repository_name: String,
	repository_full_name: String,
	repository_owner_name: String,
	repository_owner_email: String,
	// for storing commit history
	sha: String,
	distinct: String,
	message: String,
	timestamp: String,
	url: String,
	author_name: String,
	author_email: String,
	author_username: String,
	committer_name: String,
	committer_email: String,
	committer_username: String,
	files_added: Array,
	files_removed: Array,
	files_modified: Array
});
mongoose.model('Demasoni', demasoniSchema);



// Commit Object
// {
// 	"id": "a52a9d60f54a1a00a9ac5edd3ca243dc378792bd",
// 	"distinct": true,
// 	"message": "test.txt updated.",
// 	"timestamp": "2015-09-11T18:37:28+05:30",
// 	"url": "https://github.com/rajib/Demasoni-node/commit/a52a9d60f54a1a00a9ac5edd3ca243dc378792bd",
// 	"author": {
// 		"name": "Rajib Chowdhury",
// 		"email": "chowdhury284@gmail.com",
// 		"username": "rajib"
// 	},
// 	"committer": {
// 		"name": "Rajib Chowdhury",
// 		"email": "chowdhury284@gmail.com",
// 		"username": "rajib"
// 	},
// 	"added": [
//
// 	],
// 	"removed": [
//
// 	],
// 	"modified": [
// 		"test.txt"
// 	]
// }