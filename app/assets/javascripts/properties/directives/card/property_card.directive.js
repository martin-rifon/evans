(function() {

  'use strict';

  angular.module('evansClient.propertyCard', [])
    .directive('propertyCard', propertyCardDirective);

  function propertyCardDirective() {

    propertyCardDirectiveController.$inject = [
      '$scope'
    ];

    function propertyCardDirectiveController($scope) {
      var vm = this;

      if ($scope.property.price_includes_shared_expenses)
        vm.sharedExpensesDisclaimer = 'Incluye ' + 
          accounting.formatMoney($scope.property.shared_expenses, 
            $scope.property.price_currency + ' ', 0, ".", ",") + 
          ' de gastos comunes.';
      else
        vm.sharedExpensesDisclaimer = 'No incluye gastos comunes.';

      vm.formattedPrice = accounting.formatMoney($scope.property.price, 
                                                 $scope.property.price_currency + 
                                                 ' ', 0, ".", ",");

      vm.linkState = "property({propertyId: '" + $scope.property.id + "'})";
    }

    var directiveConf = {
      restrict: 'E',
      scope: {
        property: '='
      },
      replace: true,
      templateUrl: 'assets/properties/directives/card/property_card.html',
      controller: propertyCardDirectiveController,
      controllerAs: 'vm'
    };

    return directiveConf;
  }

})();
