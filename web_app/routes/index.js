const express = require('express');
const JobRequestSender = require('../lib/JobRequestSender');
const jobStatus = require('../lib/jobStatus');
const NameModel = require('../../lib/nameModel');
const uuid = require('node-uuid');

// Router Initialization
// -----------------------------
const router = express.Router();

// Middleware - Data Container via Request Object
// -----------------------------
router.use((req,res,next)=>{
  req.appData = {};
  next();
});

// Middleware - DB Data Downloader Test
// -----------------------------
router.use((req, res, next) => {
  console.log('Middlware running.. fetching data from DB...');
  NameModel.findByName('file1.mp3', (error, file)=>{
    if(error) { return next(error); } 
    if(!file){
      console.log('404 File not found');
    } 
    else{
      console.log('200 found', file);
      req.appData.fileId = file.id;
      req.appData.file = file;
    }   
    next();
  }); 
});

router.get('/', renderView);
router.post('/', postJob);

// Message Queue Accesss Interface
// -----------------------------
const sender = new JobRequestSender();


// Test Function
// -----------------------------
// function testErrorReporter(req,res,next) {
// 	return next(new Error('xpto'));
// }

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
