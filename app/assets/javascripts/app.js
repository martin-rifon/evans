'use strict';

angular.module('evansClient', [
  /*'gameofnodesClientNewestTryApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',*/
  'ui.router'
  /*'ui.bootstrap',
  'ngMessages'*/
])
.config(configApp)
.constant('GET_PROPERTIES_URL', '/properties');

configApp.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];

function configApp($urlRouterProvider, $locationProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');
}
