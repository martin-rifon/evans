(function() {

  'use strict';

  angular.module('evansClient', [
    'ui.router',
    'ui.bootstrap',
    'evansClient.iscroll',
    'evansClient.slide',
    'evansClient.propertyCard'
  ])
    .config(configApp)
    .constant('GET_PROPERTIES_URL', '/properties/json')
    .constant('PROPERTIES_PER_LOAD', 12);

  configApp.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];

  function configApp($urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
  }

})();
