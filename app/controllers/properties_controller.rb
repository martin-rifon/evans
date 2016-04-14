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

    client = Elasticsearch::Client.new log: true#, url: 'https://5x3q51fa:w1eqasw75bc9qxyy@ash-6669169.us-east-1.bonsai.io'

    client.index  index: 'evans', type: 'property', id: @property.id, body: @property.to_json

    redirect_to @property
  end

  def search
    client = Elasticsearch::Client.new log: true#, url: 'https://5x3q51fa:w1eqasw75bc9qxyy@ash-6669169.us-east-1.bonsai.io'
    elastic_must_query   = []
    elastic_should_query = []

    puts params

    if ((params.has_key?(:query)) && (!params[:query].empty?))
      elastic_should_query.push({
          multi_match: { 
            query: params[:query],
            fields: ['neighborhood', 'address', 'description']
          }
        })
    end

    if ((params.has_key?(:neighborhoods)) && (Array(params[:neighborhoods]).length > 0) && (!params[:neighborhoods].nil?))
      elastic_must_query.push({
          terms: {
            neighborhood: Array(params[:neighborhoods])
          }
        })
    end

    if ((params.has_key?(:operation)) && (!params[:operation].empty?))
      if (params[:operation].downcase == "alquiler")
        elastic_must_query.push({
          match: { 
            for_rent: true
          }
        })
      elsif (params[:operation].downcase == "venta")
        elastic_must_query.push({
          match: { 
            for_sale: true
          }
        })
      end
    end

    if ((params.has_key?(:property_type)) && (!params[:property_type].empty?))
      property_type_query = params[:property_type]

      if (property_type_query.downcase == "apartamento")
        property_type_query = "apartment"
      elsif (property_type_query.downcase == "casa")
        property_type_query = "house"
      end

      elastic_must_query.push({
          match: { 
            property_type: property_type_query
          }
        })
    end

    if ((params.has_key?(:bathrooms)) && (!params[:bathrooms].nil?) && (!params[:bathrooms].empty?))
      bathrooms_query = params[:bathrooms].downcase

      if (bathrooms_query == "1 bano")
        elastic_must_query.push({
          match: { 
            bathroom_amount: 1
          }
        })
      elsif (bathrooms_query == "2 banos")
        elastic_must_query.push({
          match: { 
            bathroom_amount: 2
          }
        })
      elsif (bathrooms_query == "3 o mas banos")
        elastic_must_query.push({
          range: { 
            bathroom_amount: {
              gte: 3
            }
          }
        })
      end
    end

    if ((params.has_key?(:bedrooms)) && (!params[:bedrooms].nil?) && (!params[:bedrooms].empty?))
      bedrooms_query = params[:bedrooms].downcase

      if (bedrooms_query == "monoambiente")
        elastic_must_query.push({
          match: { 
            bedroom_amount: 0
          }
        })
      elsif (bedrooms_query == "1 dormitorio")
        elastic_must_query.push({
          match: { 
            bedroom_amount: 1
          }
        })
      elsif (bedrooms_query == "2 dormitorios")
        elastic_must_query.push({
          match: { 
            bedroom_amount: 2
          }
        })
      elsif (bedrooms_query == "3 o mas dormitorios")
        elastic_must_query.push({
          range: { 
            bedroom_amount: {
              gte: 3
            }
          }
        })
      end
    end

    if ((params.has_key?(:price_from)) && (!params[:price_from].nil?))
        elastic_must_query.push({
          range: { 
            price: {
              gte: params[:price_from]
            }
          }
        })
    end

    if ((params.has_key?(:price_end)) && (!params[:price_end].nil?))
        elastic_must_query.push({
          range: { 
            price: {
              lte: params[:price_end]
            }
          }
        })
    end

    if ((params.has_key?(:price_currency)) && (!params[:price_currency].empty?))
        elastic_must_query.push({
          match: { 
            price_currency: params[:price_currency]
          }
        })
    end

    if ((params.has_key?(:garage)) && (!params[:garage].nil?) && (!params[:garage].empty?))
        elastic_must_query.push({
          match: { 
            has_garage: params[:garage]
          }
        })
    end

    if ((params.has_key?(:m2builtFrom)) && (!params[:m2builtFrom].nil?))
        elastic_must_query.push({
          range: { 
            m2_built: {
              gte: params[:m2builtFrom]
            }
          }
        })
    end

    if ((params.has_key?(:m2builtTo)) && (!params[:m2builtTo].nil?))
        elastic_must_query.push({
          range: { 
            m2_built: {
              lte: params[:m2builtTo]
            }
          }
        })
    end

    @results = client.search index: 'evans', body: { 
      query: {
        bool: { 
          must: elastic_must_query,
          should: elastic_should_query
        }
      },
      size: params[:take],
      from: params[:start]
    }

    @result_list = @results['hits']['hits']
    render :json => @result_list, include: :images
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
