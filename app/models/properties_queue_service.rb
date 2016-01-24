require 'singleton'

class PropertiesQueueService
  include Singleton

  @conn

  def listen
    @conn = Bunny.new
    @conn.start

    ch = @conn.create_channel
    q  = ch.queue("evans.properties_queue", :auto_delete => false)
    x  = ch.default_exchange

    q.subscribe do |delivery_info, metadata, payload|
      property_array = JSON.parse payload

      property_array.each do |property|
        property['tiger_id'] = property['id']
        property.delete('id')

        property['images'] = property['images'].map do |image_base64_string| 
          Image.new(image_base64_string)
        end

        db_property = Property.find_by tiger_id: property['tiger_id']

        if (db_property.nil?)
          property = Property.new(property)
          property.save
        else
          db_property.images.delete
          db_property.update_attributes(property)
        end
      end
    end
  end

  def stop
    @conn.close
  end
end
