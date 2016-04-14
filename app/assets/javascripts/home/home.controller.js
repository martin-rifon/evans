(function() {

    'use strict';

    angular.module('evansClient')
      .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = [
      '$state',
      '$http',
      '$rootScope'
    ];

    function HomeCtrl($state, $http, $rootScope) {
      var vm = this;
    }

})();
