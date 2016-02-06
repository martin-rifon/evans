(function() {

  'use strict';

  angular.module('evansClient')
    .service('propertiesService', propertiesService);

  propertiesService.$inject = [
    '$http', 'GET_PROPERTIES_URL', 'PROPERTIES_PER_LOAD'
  ];

  function propertiesService($http, GET_PROPERTIES_URL, PROPERTIES_PER_LOAD) {
    var service = {};

    service.getAll = getAll;

    return service;

    function getAll(propertiesLoaded, successCallback) {
      var url     = GET_PROPERTIES_URL + '/' +
                    propertiesLoaded + '/' +
                    PROPERTIES_PER_LOAD
      ,   results = null;

      if (typeof successCallback === 'undefined')
        results = $http.get(url);
      else
        results = $http.get(url).then(successCallback);

      return results;
    }
  }

})();
