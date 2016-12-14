# Quick Install
$npm install
terminal 1 > $nodemon npm run start
terminal 2 > $node long_process_app/index
browser 1 > http://localhost:15672/ *Rabbit MQ Web Management Console
browser 2 > http://localhost:3000/ *Node Web Server 

# Advanced 

# Scaffolding 
$npm install
sudo npm install express-generator --global
express . 
mkdir env/development > touch config.json (mongo db url)
mkdir lib (dbms mongo files)
mkdir web_app (express app folder)
move express folders to web_app/*
mkdir web_app/lib (business logic goes here)

# Nodemon 
touch nodemon.json (watch express stuff and lib, ignore the rest)

# Update Start Scripts 
update package.json scripts to start the bash script: "start": "nodemon ./web_app/bin/www"

# Start the Web App 
nodemon

=== Rabbus Docs ===
https://github.com/watchmecode/rabbitmq/tree/master/76-encapsulating-rabbitmq/emailHandlers