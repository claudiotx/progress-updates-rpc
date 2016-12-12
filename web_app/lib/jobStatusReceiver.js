const util = require('util');
const Rabbus = require('rabbus');
const rabbot = require("rabbot");

// Constructor Function
function JobStatusReceiver() {
	Rabbus.Receiver.call(this, rabbot,{
		exchange: 'job.ex',
		queue: 'job.q',
		routingKey: 'status'						
	});
}

util.inherits(JobStatusReceiver, Rabbus.Receiver);
module.exports = JobStatusReceiver;//receiver goes here