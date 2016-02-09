(function() {

  'use strict';

  angular.module('evansClient')
    .controller('PropertyDetailsCtrl', PropertyDetailsCtrl);

  PropertyDetailsCtrl.$inject = [
    '$state', '$http', 'propertyData', '$stateParams'
  ];

  function PropertyDetailsCtrl($state, $http, propertyData, $stateParams) {
    var vm = this;

    vm.propertyData = propertyData.data;

    vm.formattedPrice = accounting.formatMoney(vm.propertyData.price, 
                                                 vm.propertyData.price_currency + 
                                                 ' ', 0, ".", ",");

    vm.formattedSharedExpenses = accounting.formatMoney(vm.propertyData.shared_expenses, 
                                                 vm.propertyData.price_currency + 
                                                 ' ', 0, ".", ",");

    vm.formattedHasGarage = vm.propertyData.has_garage ? 'Si' : 'No';

    vm.showContactInfo = false;
  }

})();
