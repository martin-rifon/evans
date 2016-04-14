(function() {

  'use strict';

  angular.module('evansClient')
    .config(configApp);

  configApp.$inject = [
    '$stateProvider', '$urlRouterProvider', 'propertiesServiceProvider', 
    '$stateParamsProvider'
  ];

  function configApp($stateProvider, $urlRouterProvider, propertiesService, $stateParams) {
    $stateProvider
      .state('properties', {
        url: '/properties/:query/:operation/:property_type',
        params: {
            'neighborhoods': []
        },
        templateUrl: 'assets/properties/list.html',
        controller: 'PropertiesCtrl as vm',
        resolve: {
          propertiesList: ['propertiesService', '$stateParams', function(propertiesService, $stateParams) {
              return propertiesService.getAllWithQuery(true);
          }]
        }
      });
  }

})();
