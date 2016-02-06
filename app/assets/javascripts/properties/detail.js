(function() {

  'use strict';

  angular.module('evansClient')
    .config(configApp);

  configApp.$inject = [
    '$stateProvider', '$urlRouterProvider', 'propertiesServiceProvider'
  ];

  function configApp($stateProvider, $urlRouterProvider, propertiesService) {
    $stateProvider
      .state('properties.detail', {
        url: '/properties/:id',
        templateUrl: 'assets/properties/detail.html',
        controller: 'PropertiesDetailCtrl as propertiesDetailVm',
        resolve: {
          propertyData: ['propertiesService', function(propertiesService, id) {
              return propertiesService.getOne(id);
          }]
        }
      });
  }

})();
