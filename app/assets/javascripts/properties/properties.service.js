'use strict';

angular.module('evansClient')
  .service('propertiesService', propertiesService);

  propertiesService.$inject = ['$http', 'GET_PROPERTIES_URL'];

  function propertiesService($http, GET_PROPERTIES_URL) {
    var service = {};

    service.getAll = getAll;

    return service;

    function getAll() {
      var results = $http.get(GET_PROPERTIES_URL)
      return results;
    }
  }
