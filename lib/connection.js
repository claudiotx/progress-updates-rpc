var util = require("util");
var rabbot = require("rabbot");
const epa = require('epa').getEnvironment();

// RabbitMQ Connection Interface
// -----------------------------
function connect(cb){
   const rabbitMqConfig = epa.get('rabbitmq');   
  rabbot
    .configure({ connection: rabbitMqConfig })
    .then(cb)
    .catch(function(err){
      setImmediate(function(){ throw err; });
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
