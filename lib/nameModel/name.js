const mongoose = require('mongoose');
const NameSchema = new mongoose.Schema({
	name: {type: String, index: {unique: true}}
});


// DB Basic Query Method
// -----------------------------
NameSchema.static('findByName', function(name, cb){		
	const query = {
		name: name
	};
	NameModel.findOne(query,(error,file)=>{
		if(error) { throw error; }								
		cb(error,file);
	});
});


const NameModel = mongoose.model('Names', NameSchema);
module.exports = NameModel;