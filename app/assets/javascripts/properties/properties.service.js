(function() {

  'use strict';

  angular.module('evansClient')
    .service('propertiesService', propertiesService);

  propertiesService.$inject = [
    '$http', 'GET_PROPERTIES_URL', 'PROPERTIES_PER_LOAD', 
    'GET_PROPERTY_URL', 'moment', '$q', '$state'
  ];

  function propertiesService($http,
                             GET_PROPERTIES_URL, 
                             PROPERTIES_PER_LOAD,
                             GET_PROPERTY_URL,
                             moment,
                             $q,
                             $state) {
    var service = {};

    service.getAllWithQuery = getAllWithQuery;
    service.getOne = getOne;

    service.filters = {
      query: "",
      selected_neighborhoods: [],
      operation: { name: "Alquiler" },
      property_type: { name: "Apartamento" },
      bedrooms: null,
      bathrooms:null,
      price_from: 10000,
      price_end: 30000,
      price_currency: { name: "Pesos" },
      sorting: { name: "Menor precio" },

      garage: null,
      m2built: null
    };

    service.propertiesLoaded = 0;

    service.working = false;

    return service;

    function getAllWithQuery(firstBatchOfResults) {

      if (service.working)
        return $q.resolve(null);

      service.working = true;

      var url = GET_PROPERTIES_URL + '/' + (firstBatchOfResults ? 0 : service.propertiesLoaded) + '/' + PROPERTIES_PER_LOAD
      
      ,   selected_neighborhoods = service.filters.selected_neighborhoods
      ,   operation              = service.filters.operation
      ,   property_type          = service.filters.property_type
      ,   bedrooms               = service.filters.bedrooms
      ,   bathrooms              = service.filters.bathrooms
      ,   price_currency         = service.filters.price_currency

      ,   garage  = service.filters.garage
      ,   m2built = service.filters.m2built
      ,   m2builtFrom = null
      ,   m2builtTo   = null

      ,   results;

      if (selected_neighborhoods && (selected_neighborhoods.length > 0))
        selected_neighborhoods = selected_neighborhoods.map(function(index, elem) {
          return index.name.toLowerCase();
        });

      if (operation)
        operation = operation.name.toLowerCase();

      if (property_type)
        property_type = property_type.name.toLowerCase();

      if (bedrooms)
        bedrooms = bedrooms.name.toLowerCase();

      if (bathrooms)
        bathrooms = bathrooms.name.toLowerCase();

      if (price_currency)
      {
        price_currency = price_currency.name.toLowerCase();

        if (price_currency === "dolares")
          price_currency = 'USD';
        else if (price_currency === "pesos")
          price_currency = 'UYU';
      }

      if (garage)
      {
        garage = garage.name.toLowerCase();

        if (garage === "si")
          garage = "TRUE";
        else if (garage === "si")
          garage = "FALSE";
      }

      if (m2built)
      {
          m2built = m2built.name.toLowerCase();

          if (m2built === "entre 0 y 50")
          {
            m2builtFrom = 0;
            m2builtTo   = 50;
          }
          else if (m2built === "entre 51 y 100")
          {
            m2builtFrom = 51;
            m2builtTo   = 100;
          }
          else if (m2built === "entre 101 y 150")
          {
            m2builtFrom = 101;
            m2builtTo   = 150;
          }
          else if (m2built === "mas de 150")
            m2builtFrom = 151;
      }

      results = $http.post(url, {
        query:          service.filters.query ,
        neighborhoods:  selected_neighborhoods,
        operation:      operation,
        property_type:  property_type,
        bedrooms:       bedrooms,
        bathrooms:      bathrooms,
        price_from:     service.filters.price_from,
        price_end:      service.filters.price_end,
        price_currency: price_currency,

        garage: garage,
        m2builtFrom: m2builtFrom,
        m2builtTo: m2builtTo
      });

      results.then(function(response) {
        // If we got valid data.
        if ((response.data) && (response.data[0]) && (response.data[0]._index))
        {
          for (var i = 0; i < response.data.length; i++)
          {
            // Strip away search metadata.
            response.data[i] = response.data[i]._source;
            // Add image link.
            if (response.data[i].images)
              for (var j = 0; j < response.data[i].images.length; j++)
                response.data[i].images[j].link = $state.href("property", { propertyId: response.data[i].id });
          }

          // Apply sorting.
          response.data.sort(sortProperties);

          service.propertiesLoaded += response.data.length;
        }

        service.working = false;
      });

      return results;
    }

    function getOne(propertyId) {
      var url     = GET_PROPERTY_URL + '/' +
                    propertyId
      ,   results = null;

      results = $http.get(url);

      results.then(function(response) {
        // If we got valid data.
        if (response.data)
        {
          response.data.contact_from_day = moment().locale("es").weekday(response.data.contact_from_day).format('dddd');
          response.data.contact_to_day = moment().locale("es").weekday(response.data.contact_to_day).format('dddd');
        }
      });

      return results;
    }

    function sortProperties(a, b) {
      var chosenSorting = service.filters.sorting.name.toLowerCase();

      if (chosenSorting === "menor precio")
        return sortBySmallerPrice(a, b);
      else if (chosenSorting === "mayor precio")
        return sortByLargerPrice(a, b);
    }

    function sortBySmallerPrice(a, b) {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      // a must be equal to b
      return 0;
    }
    function sortByLargerPrice(a, b) {
      if (a.price < b.price) {
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      }
      // a must be equal to b
      return 0;
    }
  }
})();
