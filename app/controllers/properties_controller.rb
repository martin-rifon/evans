require 'elasticsearch'

class PropertiesController < ApplicationController
  def index
    render :json => Property.includes(:images).all, include: :images
  end

  def show
    @property = Property.includes(:images).find(params[:id])
  end

  def new
  end

  def create
    @property = Property.new(property_params)
 
    @property.save

    client = Elasticsearch::Client.new log: true

    client.index  index: 'evans', type: 'property', id: @property.id, body: @property.to_json

    redirect_to @property
  end

  def search
    client = Elasticsearch::Client.new log: true

    @results = client.search index: 'evans', body: { 
      query: { 
        multi_match: { 
          query: params[:title],
          fields: ['title', 'text']
        } 
      } 
    }

    @result_list = @results['hits']['hits']

  end
end

private
  def property_params
    params.require(:property).permit(:title, :text)
  end
