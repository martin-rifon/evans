require 'yaml'

class PropertiesQueueWorker
  include Sneakers::Worker

  queue_configuration = YAML.load_file('config/rabbitmq.yml')

  config = Rails.env.production? ? queue_configuration['production'] : queue_configuration['development']

  from_queue config['queue_name']

  def work(msg)
    property_array = JSON.parse(msg)

    property_array.each do |property|
      property['tiger_id'] = property['id']
      property.delete('id')

      property['images'] = property['images'].map { |url| Image.new(url) }

      db_property = Property.find_or_create_by(tiger_id: property['tiger_id'])
      db_property.update_attributes(property)
    end

    ack!
  end
end
