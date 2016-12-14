var util = require("util");
var rabbot = require("rabbot");
const epa = require('epa').getEnvironment();
const mongoose = require('mongoose'); // Mongo DBMS

// RabbitMQ & MongoDB Connection Interfaces
// -----------------------------
function connect(cb){
  console.log(`====== Express Server Connected to RabbitMQ ======`);  
  const rabbitMqConfig = epa.get('rabbitmq');   
  rabbot
    .configure({ connection: rabbitMqConfig })
    .then(connectToMongoDB(cb))
    .catch(function(err){
      setImmediate(function(){ throw err; });
    });   
}

function connectToMongoDB(cb){  
  mongoose.connect(epa.get('mongodb'), (err) =>{  
    if(err) { return next(err); }        
    console.log(`====== Express Server Connected to Mongo ${epa.get('mongodb')}======`);    
    cb();
  }); 
}


process.once("SIGINT", function(){
  exit();
});

process.on("unhandledException", function(err){
  console.log(err);
  exit();
});

function exit(){
  console.log("");
  console.log("shutting down ...");
  rabbot.closeAll().then(function(){
    process.exit();
  });
}

module.exports = connect;
