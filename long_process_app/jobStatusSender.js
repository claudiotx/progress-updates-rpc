const util = require('util');
const Rabbus = require('rabbus');
const rabbot = require("rabbot");

// Note: Will use the same exchange (job.ex) but with a different routing key to send message to different queue
function JobStatusSender(){
	Rabbus.Sender.call(this, rabbot,{
		exchange: 'job.ex',
		routingKey: 'status'		
	});
}

util.inherits(JobStatusSender, Rabbus.Sender);
module.exports = JobStatusSender;