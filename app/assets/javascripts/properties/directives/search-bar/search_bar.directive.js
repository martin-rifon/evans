(function() {

  'use strict';

  angular.module('evansClient.searchBar', [])
    .directive('searchBar', searchBarDirective);

  function searchBarDirective() {

    searchBarDirectiveController.$inject = [
      '$state',
      '$http',
      'propertiesService'
    ];

    function searchBarDirectiveController($state, $http, propertiesService) {
      var vm = this;

      vm.searchTerm       = "";
      vm.searchProperties = searchProperties;
      vm.neighborhoods = [
        { name: 'Pocitos' },
        { name: 'Centro' },
        { name: 'Punta Carretas' },
        { name: 'Prado' },
        { name: 'Cerro' }
      ];
      vm.operations = [
        { name: 'Alquiler' },
        { name: 'Venta' }
      ];
      vm.property_types = [
        { name: 'Apartamento' },
        { name: 'Casa' }
      ];

      vm.filters = propertiesService.filters;

      // Default values.
      vm.operation     = { name: propertiesService.filters.operation };
      vm.property_type = { name: propertiesService.filters.type };

      function searchProperties() {
        $state.go('properties', { }, { reload: true });
      }
    }

    var directiveConf = {
      restrict: 'E',
      scope: {
        showLogo: '='
      },
      replace: true,
      templateUrl: 'assets/properties/directives/search-bar/search_bar.html',
      controller: searchBarDirectiveController,
      controllerAs: 'vm'
    };

    return directiveConf;
  }

})();
