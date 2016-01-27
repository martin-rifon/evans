require 'sneakers'

queue_configuration = YAML.load_file('config/rabbitmq.yml')

config = Rails.env.production? ? queue_configuration['production'] : queue_configuration['development']

Sneakers.configure :heartbeat          => config['heartbeat'],
                   :amqp               => config['amqp'],
                   :vhost              => config['vhost'],
                   :exchange           => config['exchange'],
                   :exchange_type      => config['exchange_type'],
                   :start_worker_delay => config['start_worker_delay'].to_f,
                   :workers            => config['workers'],
                   :log                => config['log'],
                   :pid_path           => config['pid_path'],
                   :timeout_job_after  => config['timeout_job_after'],
                   :prefetch           => config['prefetch'],
                   :threads            => config['threads'],
                   :durable            => config['durable'],
                   :ack                => config['ack']

Sneakers.logger.level = Logger::INFO
