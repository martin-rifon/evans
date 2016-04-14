(function() {

  'use strict';

  angular.module('evansClient', [
    'ui.router',
    'ui.bootstrap',
    'ui.select',
    'ngSanitize',
    'evansClient.iscroll',
    'evansClient.slide',
    'evansClient.propertyCard',
    'evansClient.contactInfo',
    'evansClient.viewer',
    'evansClient.searchBar',
    'angularMoment',
    'uiGmapgoogle-maps',
    'rzModule'
  ])
    .config(configApp)
    .constant('GET_PROPERTIES_URL', '/properties/json')
    .constant('GET_PROPERTY_URL', '/properties')
    .constant('PROPERTIES_PER_LOAD', 12)

    .run(runApp);

  runApp.$inject = ['amMoment', '$rootScope'];

  function runApp(amMoment, $rootScope) {
    amMoment.changeLocale('es');

    $rootScope.bodyClass = 'home';

    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams, options) {

        if (toState.name === "home")
          $rootScope.bodyClass = 'home';
      });

    $rootScope.$on('$stateChangeSuccess', 
      function(event, toState, toParams, fromState, fromParams) { 
        if (toState.name !== "home")
          $rootScope.bodyClass = '';
      });
  }

  configApp.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider', 'uiGmapGoogleMapApiProvider', '$compileProvider'];

  function configApp($urlRouterProvider, $locationProvider, $httpProvider, uiGmapGoogleMapApiProvider, $compileProvider) {
    $urlRouterProvider.otherwise('/');

    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyARdo41VKVvIxjMby7bCrBfDbzIpFD1W0g',
        v: '3.23', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
  }

})();
