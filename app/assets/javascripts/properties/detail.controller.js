(function() {

  'use strict';

  angular.module('evansClient')
    .controller('PropertyDetailsCtrl', PropertyDetailsCtrl);

  PropertyDetailsCtrl.$inject = [
    '$state', '$http', 'propertiesList', '$stateParams'
  ];

  function PropertyDetailsCtrl($state, $http, propertyData, $stateParams) {
    var vm = this;

    vm.propertyData = propertyData.data;
  }

})();
