var express = require('express');
var router = express.Router();

/* POST demasonis listing. */
router.post('/', function(req, res, next) {
	var req_body = req.body
	
	res.status(201)
	res.send({ github_callback_body: req_body });
});

module.exports = router;
