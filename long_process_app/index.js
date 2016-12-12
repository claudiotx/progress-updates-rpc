const JobRequestReceiver = require('./jobRequestReceiver');
const JobStatusSender = require('./jobStatusSender');
const rabbot = require('rabbot');
const connection = require('../lib/connection');

// helper function
// -----------------------------
const jobStatusSender = new JobStatusSender();
const processData = (message, properties, actions, next) => {	
	console.log("Job Request Received on LONG_PROCESS_APP", message);	
	const progress = {
		id: message.id,
		percent: 0
	};	
	// throw new Error('something bad');
	progress.percent = 25;
	jobStatusSender.send(progress);		
	setTimeout(()=>{
		progress.percent = 50;	
		jobStatusSender.send(progress);
		setTimeout(()=>{
			progress.percent = 75;
			jobStatusSender.send(progress);
			setTimeout(()=>{								
				progress.percent = 100;
				jobStatusSender.send(progress);								
			},3000);					
		},3000);
	},3000);	
	// Acknowledge Reception
	actions.ack();		
}

// connect and wait for messages
// -----------------------------
connection(function(){
	console.log("Long Processs Connected and Listening..");	
	const jobRequestReceiver = new JobRequestReceiver();
	// basic error handler
	jobRequestReceiver.use(function(err, msg, props, actions, next){
		setTimeout(function(){ throw err; });
	});
	jobRequestReceiver.receive(processData);
});