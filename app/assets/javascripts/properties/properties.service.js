(function() {

  'use strict';

  angular.module('evansClient')
    .service('propertiesService', propertiesService);

  propertiesService.$inject = [
    '$http', 'GET_PROPERTIES_URL', 'PROPERTIES_PER_LOAD', 
    'GET_PROPERTY_URL', 'moment'
  ];

  function propertiesService($http, GET_PROPERTIES_URL, 
                              PROPERTIES_PER_LOAD,
                              GET_PROPERTY_URL, moment) {
    var service = {};

    service.getAll = getAll;
    service.getOne = getOne;

    return service;

    function getAll(propertiesLoaded) {
      var url     = GET_PROPERTIES_URL + '/' +
                    propertiesLoaded + '/' +
                    PROPERTIES_PER_LOAD;

      return $http.get(url);
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
  }

})();
