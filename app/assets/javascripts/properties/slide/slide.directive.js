(function() {
  'use strict';

  angular.module('evansClient.slide', [])
    .directive('slide', slideDirective);

  function slideDirective() {

    slideDirectiveController.$inject = ['$interval', '$scope'];

    function slideDirectiveController($interval, $scope) {
      var vm = this;

      // Default image.
      if (($scope.images === undefined) || !Array.isArray || (Array.isArray && $scope.images.length < 1))
      {
        $scope.images = [{ 
          alt_text: 'No se poseen imagenes.',
          url: 'http://placeholdit.imgix.net/~text?txtsize=25&txt=270%C3%97270&w=270&h=270'
        }];
        vm.numberOfImages = 1;
      }
      else
        vm.numberOfImages = $scope.images.length;

      console.log($scope.images);

      vm.selectedImage  = 0;
      vm.setTime        = 4000; // Interval time.

      vm.dots            = dots;
      vm.setSelected     = setSelected;
      vm.sliderBack      = sliderBack;
      vm.sliderForward   = sliderForward;
      vm.autoSlider      = autoSlider;
      vm.stopSlider      = stopSlider;
      vm.toggleStartStop = toggleStartStop;
      vm.startSlider     = startSlider;
      vm.show            = show;

      // Pagination dots - gets number of images          
      function dots(num) {
        return new Array(num);   
      };

      // Pagination - click on dots and change image
      function setSelected(idx) {
        var vm = this;

        vm.stopSlider();
        vm.selectedImage = idx;
      };

      // Slideshow controls
      function sliderBack() {
        var vm = this;

        vm.stopSlider();
        vm.selectedImage === 0 ? vm.selectedImage = vm.numberOfImages - 1 : vm.selectedImage--;
      };

      function sliderForward() {
        var vm = this;

        vm.stopSlider();
        vm.autoSlider();
      };

      function autoSlider() {
        var vm = this;

        vm.selectedImage < vm.numberOfImages - 1 ? vm.selectedImage++ : vm.selectedImage = 0;
      };

      function stopSlider() {
        var vm = this;

        $interval.cancel(vm.intervalPromise);
        vm.activePause = true;
        vm.activeStart = false;
      };

      function toggleStartStop() {
        var vm = this;

        if (vm.activeStart) {
          vm.stopSlider();
        } else {
          vm.startSlider();
        }
      };
      
      function startSlider() {
        var vm = this;

        vm.intervalPromise = $interval(vm.autoSlider, vm.setTime);
        vm.activeStart = true;
        vm.activePause = false;
      };

      function show(idx) {
        var vm = this;

        if (vm.selectedImage==idx) {
          return "show";
        }
      };
    }

    var directiveConf = {
      restrict: 'E',
      scope: {
        images: '='
      },
      replace: true,
      templateUrl: 'assets/properties/slide/slide.html',
      controller: slideDirectiveController,
      controllerAs: 'slideVm'
    }

    return directiveConf;
  }
})();
