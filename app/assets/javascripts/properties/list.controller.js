(function() {

  'use strict';

  angular.module('evansClient')
    .controller('PropertiesCtrl', PropertiesCtrl)
    .controller('MoreFiltersModalController', MoreFiltersModalController);

  PropertiesCtrl.$inject = [
    '$state',
    '$http',
    'propertiesList',
    '$stateParams',
    'uiGmapGoogleMapApi',
    'propertiesService',
    '$timeout',
    '$scope',
    '$uibModal'
  ];

  function PropertiesCtrl($state, $http, propertiesList, $stateParams, uiGmapGoogleMapApi, propertiesService, $timeout, $scope, $uibModal) {
    var vm = this;

    vm.propertiesList = propertiesList.data;
    vm.searchData     = $stateParams;

    vm.changeFilter         = changeFilter;
    vm.openMoreFiltersModal = openMoreFiltersModal;

    vm.listFilters = propertiesService.filters;
    vm.sorting     = propertiesService.sorting;

    vm.bedroomFilters = [
        { name: 'Monoambiente' },
        { name: '1 dormitorio' },
        { name: '2 dormitorios' },
        { name: '3 o mas dormitorios' }
      ];
    vm.bathroomFilters = [
        { name: '1 bano' },
        { name: '2 banos' },
        { name: '3 o mas banos' }
      ];
    vm.currencies = [
        { name: 'Pesos' },
        { name: 'Dolares' }
      ];
    vm.sortings = [
        { name: 'Menor precio' },
        { name: 'Mayor precio' }
      ];

    vm.price_currency = { name: 'Pesos' };

    vm.price_slider_options = {
      floor: 10000,
      ceil: 1000000,
      step: 500,
      minRange: 1,
      translate: function(value) {
        return accounting.formatMoney(value, '', 0, ".", ",");
      },

      onEnd: changeFilter
    };

    function changeFilter(item, model) {
      // Reset properties.
      propertiesService
        .getAllWithQuery(true)
        .then(function(response) {
          vm.propertiesList = response.data;
      });
    }

    function openMoreFiltersModal() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'assets/properties/more_filters_modal.html',
        controller: 'MoreFiltersModalController',
        controllerAs: 'vm',
        size: 'lg'
      });

      modalInstance.result.then(function (ret) {

        if (ret.garage && ret.garage.name)
          propertiesService.filters.garage = ret.garage;
        else
          propertiesService.filters.garage = null;

        if (ret.m2built && ret.m2built.name)
          propertiesService.filters.m2built = ret.m2built;
        else
          propertiesService.filters.m2built = null;

        changeFilter();
      }, function () {
      });
    }

    uiGmapGoogleMapApi.then(function (maps) {
      vm.map = {
        center: {
          latitude: -34.896807,
          longitude: -56.164497
        },
        zoom: 13
      };
    });
  }

  MoreFiltersModalController.$inject = [
    '$uibModalInstance',
    'propertiesService',
  ];

  function MoreFiltersModalController($uibModalInstance, propertiesService) {
    var vm = this;

    vm.garageFilters = [
        { name: 'Si' },
        { name: 'No' }
      ];
    vm.m2builtFilters = [
        { name: 'Entre 0 y 50' },
        { name: 'Entre 51 y 100' },
        { name: 'Entre 101 y 150' },
        { name: 'Mas de 150' },
      ];

    vm.moreFilters = {
      garage: propertiesService.filters.garage,
      m2built: propertiesService.filters.m2built
    };

    vm.ok = function () {
      $uibModalInstance.close(vm.moreFilters);
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }

})();
