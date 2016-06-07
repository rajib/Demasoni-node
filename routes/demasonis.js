var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override'); //used to manipulate POST

var jQuery = require('jquery')

// Common part like before_filter
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		var method = req.body._method
		delete req.body._method
		return method
	}
}))


/* POST demasonis listing. */
router.post('/', function(req, res, next) {
	// Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
	req_body = req.body
	// var commit_obj = req_body.commits[0];
	
	jQuery.each(req_body.commits, function(index, commit_obj) {
		//call the create function for our database
		mongoose.model('Demasoni').create({
			repository_name: req_body.repository.name,
			repository_full_name: req_body.repository.full_name,
			repository_owner_name: req_body.repository.owner.name,
			repository_owner_email: req_body.repository.owner.email,
		
			// for storing commit history
			action: 'CodeCommit',
			sha: commit_obj.id,
			distinct: commit_obj.distinct,
			message: commit_obj.message,
			timestamp: commit_obj.timestamp,
			url: commit_obj.url,
			author_name: commit_obj.author.name,
			author_email: commit_obj.author.email,
			author_username: commit_obj.author.username,
			committer_name: commit_obj.committer.name,
			committer_email: commit_obj.committer.email,
			committer_username: commit_obj.committer.username,
			files_added: commit_obj.added,
			files_removed: commit_obj.removed,
			files_modified: commit_obj.modified
		}, function (err, _obj) {
			if (err) {
				console.log('Error: ' + err);
				res.status(422);
				res.send({ error: "There was a problem adding the information to the database." });
			} else {
				//Demasoni has been created
				console.log(commit_obj)
				console.log('POST creating new demasoni: ' + _obj);
				res.status(201);
				res.send(_obj);
			}
		})
	}); // End of loop
	
});

module.exports = router;


/*
// ------------------------------------------------------------------------------------------------------------
//build the REST operations at the base for blobs
//this will be accessible from http://127.0.0.1:3000/blobs if the default route for / is left unchanged
router.route('/')
//GET all blobs
.get(function(req, res, next) {
	//retrieve all blobs from Monogo
	mongoose.model('Blob').find({}, function (err, blobs) {
		if (err) {
			return console.error(err);
		} else {
			//respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
			res.format({
				//HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
				html: function(){
					res.render('blobs/index', {
						title: 'All my Blobs',
						"blobs" : blobs
					});
				},
				//JSON response will show all blobs in JSON format
				json: function(){
					res.json(infophotos);
				}
			});
		}     
	});
})
//POST a new blob
.post(function(req, res) {
	// Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
	var name = req.body.name;
	var badge = req.body.badge;
	var dob = req.body.dob;
	var company = req.body.company;
	var isloved = req.body.isloved;
	//call the create function for our database
	mongoose.model('Blob').create({
		name : name,
		badge : badge,
		dob : dob,
		isloved : isloved
	}, function (err, blob) {
		if (err) {
			res.send("There was a problem adding the information to the database.");
		} else {
			//Blob has been created
			console.log('POST creating new blob: ' + blob);
			res.format({
				//HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
				html: function(){
					// If it worked, set the header so the address bar doesn't still say /adduser
					res.location("blobs");
					// And forward to success page
					res.redirect("/blobs");
				},
				//JSON response will show the newly created blob
				json: function(){
					res.json(blob);
				}
			});
		}
	})
});
*/