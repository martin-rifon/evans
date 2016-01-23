require "bunny"

class PropertiesQueueController < ApplicationController
  def listen
  	PropertiesQueueService.instance.listen

  	render layout: 'internal'
  end

  def stop
    PropertiesQueueService.instance.stop

    render layout: 'internal'
  end
end
