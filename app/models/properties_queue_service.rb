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
      puts "Received #{payload}"
    end
  end

  def stop
    @conn.close
  end
end
