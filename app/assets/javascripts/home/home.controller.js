(function() {

	'use strict';

	angular.module('evansClient')
	  .controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = [
		'$state',
    '$http'
  ];

	function HomeCtrl($state, $http) {
	  var vm = this;

	  vm.searchTerm       = "";
	  vm.searchProperties = searchProperties;

	  function searchProperties() {
	  	$state.go('properties', { searchTerm: vm.searchTerm });
	  }
	}

})();
