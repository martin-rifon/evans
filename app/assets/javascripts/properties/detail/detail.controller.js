(function() {

  'use strict';

  angular.module('evansClient')
    .controller('PropertyDetailsCtrl', PropertyDetailsCtrl);

  PropertyDetailsCtrl.$inject = [
    '$state', '$http', 'propertyData', '$stateParams', '$timeout', '$scope',
    '$sce', 'viewerService', 'uiGmapGoogleMapApi'
  ];

  function PropertyDetailsCtrl($state, $http, propertyData, $stateParams, $timeout, $scope, $sce, viewerService, uiGmapGoogleMapApi) {
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

    vm.validModelURL = (vm.propertyData.model_URL !== null &&
      typeof vm.propertyData.model_URL != 'undefined' &&
      vm.propertyData.model_URL != '');

    vm.active = vm.validModelURL ? 0 : 1;

    vm.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }

    // vm.map = { center: { latitude: vm.propertyData.lat, longitude: vm.propertyData.lon }, zoom: 8 };
    uiGmapGoogleMapApi.then(function (maps) {
            vm.map = {
              center: {
                latitude: vm.propertyData.lat,
                longitude: vm.propertyData.lon
              },
              zoom: 18
            };
        })

    // vm.googleMapsSource = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/view?key=AIzaSyAWFlnHi7J2jtUW1nKXPWGt8bCx_l7bGIA&center=" + 
    //   vm.propertyData.lat + "," + vm.propertyData.lon + "&zoom=18");

    vm.displayContactInfo = displayContactInfo;

    vm.load3DModel = load3DModel;

    function displayContactInfo()
    {
      // Wait for the current digest loop to finish.
      $timeout(function() {
        // Let Angular know we are changing model data.
        $scope.$apply(function () {
          vm.showContactInfo = true;
        });
      });
    }

    function load3DModel()
    {
      console.log(vm.propertyData);
      viewerService.loadModel('assets/M1.ply');
    }
  }

})();
