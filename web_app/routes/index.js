const express = require('express');
const JobRequestSender = require('../lib/JobRequestSender');
const jobStatus = require('../lib/jobStatus');
const uuid = require('node-uuid');

// Router Initialization
// -----------------------------
const router = express.Router();
router.get('/', renderView);
router.post('/', postJob);

// Message Queue Accesss Interface
// -----------------------------
const sender = new JobRequestSender();

// View Functions
// -----------------------------
function renderView (req, res, next) {			
	const progressList = jobStatus.progress;	
 	res.render('index', { 
 		title: 'Jobs on the Queue...', 		
 		progressList: progressList
 	});
};

// Queue Functions
// -----------------------------
function postJob (req,res,next) {			
	const msg = {
		id: uuid.v1(),
		job: req.body.command
	};
	sendJobRequestToQueue(msg, (err) => {
		if(err) { return next(err) };
	});
	res.redirect('/');
};

function sendJobRequestToQueue(jobRequest, done){		
	console.log('job sent to queueu...');
	sender.send(jobRequest);
}

module.exports = router;
