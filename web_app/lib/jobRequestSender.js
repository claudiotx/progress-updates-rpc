const util = require('util');
const Rabbus = require('rabbus');
const rabbot = require('rabbot');

// Constructor Function
function JobRequestSender() {
	Rabbus.Sender.call(this, rabbot,{
		exchange: 'job.ex',
		routingKey: 'command'		
	});
}

util.inherits(JobRequestSender, Rabbus.Sender);
module.exports = JobRequestSender;