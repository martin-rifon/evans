'use strict';

angular.module('evansClient', [
  /*'gameofnodesClientNewestTryApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',*/
  'ui.router',
  'ui.bootstrap',
  // 'ngMessages',
  // 'ngAnimate',
  // 'ngTouch',
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
