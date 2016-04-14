(function() {

  'use strict';

  angular.module('evansClient')
    .config(configApp);

  configApp.$inject = [
    '$stateProvider', '$urlRouterProvider', 'propertiesServiceProvider'
  ];

  function configApp($stateProvider, $urlRouterProvider, propertiesService) {
    $stateProvider
      .state('property', {
        url: '/property/:propertyId',
        templateUrl: 'assets/properties/detail/detail.html',
        controller: 'PropertyDetailsCtrl as vm',
        resolve: {
          propertyData: ['propertiesService', '$stateParams', 
            function(propertiesService, $stateParams) {
              return propertiesService.getOne($stateParams.propertyId);
          }]
        }
      });
  }

})();
