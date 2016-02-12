require 'elasticsearch'

class PropertiesController < ApplicationController
  def index
    render :json => Property.includes(:images).all, include: :images
  end

  def show
    render :json => Property.includes(:images).find(params[:id]), include: :images
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

  def get_json
    render :json => Property.includes(:images).limit(params[:take]).offset(params[:start]), include: :images
  end

  def get_one_json
    render :json => Property.includes(:images).find(params[:id]), include: :images
  end

end

private
  def property_params
    params.require(:property).permit(:title, :text)
  end
