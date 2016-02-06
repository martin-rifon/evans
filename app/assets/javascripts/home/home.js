(function() {

	'use strict';

	angular.module('evansClient')
	  .config(configApp);

	configApp.$inject = [
    '$stateProvider', 
    '$urlRouterProvider'
  ];

	function configApp($stateProvider) {
	  $stateProvider
	    .state('home', {
	      url: '/',
	      templateUrl: 'assets/home/home.html',
	      controller: 'HomeCtrl as homeVm'
	    });
	}

})();
