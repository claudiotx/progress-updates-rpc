const util = require('util');
const Rabbus = require('rabbus');
const rabbot = require('rabbot');

function JobRequestReceiver(){
	Rabbus.Receiver.call(this, rabbot,{
		exchange: 'job.ex',
		queue: 'job.q',
		routingKey: 'command'				
	});
}

util.inherits(JobRequestReceiver, Rabbus.Receiver);
module.exports = JobRequestReceiver;