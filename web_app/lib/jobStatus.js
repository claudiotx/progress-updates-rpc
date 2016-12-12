const Receiver = require('./jobStatusReceiver');
const status = {
	progress: {},
	listen: () =>{
		console.log('WEB App Listening for Job Status updates on the Queue...'); 
		const receiver = new Receiver();
		receiver.receive(function(message, properties, actions, next){
			console.log('receiving completed response...', message);
			status.progress[message.id] = message;
			actions.ack();		
		});
	},
	reset: () => {
		status.progress = {};
	}
}
module.exports = status;