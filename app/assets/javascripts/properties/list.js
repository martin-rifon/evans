'use strict';

angular.module('evansClient')
  .config(configApp);

configApp.$inject = ['$stateProvider', '$urlRouterProvider', 'propertiesServiceProvider', '$stateParamsProvider'];

function configApp($stateProvider, $urlRouterProvider, propertiesService, $stateParams) {
  $stateProvider
    .state('properties', {
      url: '/properties',
      templateUrl: 'assets/properties/list.html',
      controller: 'PropertiesCtrl as propertiesVm',
      resolve: {
        propertiesList: ['propertiesService', function(propertiesService) {
            return propertiesService.getAll(0);
        }]
      }
    });
}
