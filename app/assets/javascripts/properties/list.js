'use strict';

angular.module('evansClient')
  .service('properties', propertiesService);

  propertiesService.$inject = ['$http'];

  function propertiesService($http) {
    var service = {};

    service.getAll = getAll;

    return service;

    function getAll() {
      return $http.get('/properties');
    }
  }

angular.module('evansClient')
  .config(configApp);

configApp.$inject = ['$stateProvider', '$urlRouterProvider', 'propertiesService'];

function configApp($stateProvider, propertiesService) {
  $stateProvider
    .state('properties', {
      url: '/properties',
      templateUrl: 'assets/properties/list.html',
      controller: 'PropertiesCtrl as propertiesVm',
      resolve: {
        propertiesList: ['propertiesService', function(propertiesService) {
          return propertiesService.getAll();
        }]
      }
    });
}
