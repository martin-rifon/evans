# evans

### Listening for new properties
Configure behavior in `rabbitmq.yml`, log levels can be changed in `sneakers.rb`.
The handlers for new messages is in `properties_queue_worker.rb`.
Default log location is `sneakers.log` at root.
#### Start listening
`WORKERS=PropertiesQueueWorker bundle exec rake sneakers:run`
