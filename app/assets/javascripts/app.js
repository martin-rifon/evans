(function() {

  'use strict';

  angular.module('evansClient', [
    'ui.router',
    'ui.bootstrap',
    'evansClient.iscroll',
    'evansClient.slide',
    'evansClient.propertyCard',
    'evansClient.contactInfo',
    'angularMoment'
  ])
    .config(configApp)
    .constant('GET_PROPERTIES_URL', '/properties/json')
    .constant('GET_PROPERTY_URL', '/properties')
    .constant('PROPERTIES_PER_LOAD', 12)

    .run(function(amMoment) {
      amMoment.changeLocale('es');
    });

  configApp.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];

  function configApp($urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
  }

})();
