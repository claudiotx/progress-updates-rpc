== Application Flow ==
1. WEBAPP: Router: GET -> Render View w/ boolean stored in session (in progress or not)
2. WEBAPP: Router: POST -> Use new JobRequestSender() from /WEB_APP/LIB/ and call send() to send a message to the job.queue
3. LONG_PROCESS_APP: Connect to RabbitMQ -> Start listening on the queue for messages
3.1 LONG_PROCESS_APP: Upon Receival, send message back to queue stating that job was received and processed.
4.2 WEBAPP: Via LIB: Listen to message send by the LONG_PROCESS_APP (via bib.wwww after connection is established with rabbitmq)
4.3 WEBAPP: On req, check via LIB the last progress status sent by the LONG_PROCESS_APP

== QUEUING ARCHITECTURE == 

   {{ WEB APP }}				{{ JOB RUNNER }}
JOB_REQUEST_SENDER  -------- > JOB_REQUEST_RECEIVER		// exchange: job.ex; key: command; mtype: 'command.execute'; queue: job.q
JOB_STATUS_RECEIVER < -------- JOB_STATUS_SENDER		// exchange: job.ex; key: status; mtype: 'status.response'; queue: job.q


== STARTING APPS ==
Please start first the LONG_PRESS_APP.
Second start the WEB_APP.
