(function() {

  'use strict';

  angular.module('evansClient.iscroll', [
    'evansClient.propertyCard'
  ])
    .directive('iscroll', inifiniteScrollDirective);

  inifiniteScrollDirective.$inject = [
    'propertiesService', '$timeout'
  ];

  function inifiniteScrollDirective(propertiesService, $timeout) {

    inifiniteScrollDirectiveController.$inject = [
      '$scope'
    ];

    function inifiniteScrollDirectiveController($scope) {
      var vm = this;
    }

    var directiveConf = {
      restrict: 'E',
      scope: {
        elements: '=',
        filterData: '='
      },
      replace: true,
      templateUrl: 'assets/properties/directives/infinite-scroll/inifinite_scroll.html',
      controller: inifiniteScrollDirectiveController,
      controllerAs: 'vm',

      link: function (scope, element, attrs) {
          var elements           = scope.elements
          ,   filterData         = scope.filterData
          ,   timeout            = $timeout
          ,   lastScrollPosition = 0

          ,   debounced = function() {
                // Maximum height of the page at present.
                var totalHeight  = document.documentElement.scrollHeight
                
                // Height of the client's browser.
                ,   clientHeight = document.documentElement.clientHeight
                // How much the client has scrolled.
                ,   scrollTop    = (document.body && document.body.scrollTop) ? 
                                      document.body.scrollTop : 
                                      document.documentElement.scrollTop
                ,   userScrollPosition = scrollTop + clientHeight

                // Condition to load more properties, loading should start if user is
                // "near" the bottom, not exactly at the bottom.
                ,   nearBottomValue = userScrollPosition + 100;

                // If user is near the bottom and he is scrolling downwards.
                if ((totalHeight <= nearBottomValue) && (lastScrollPosition < userScrollPosition))
                {
                  // Load more properties.
                  propertiesService
                    .getAllWithQuery()
                    .then(function(response) {
                      // If we got valid data.
                      if (response && (response.data.length > 0))
                      {
                        // Wait for the current digest loop to finish.
                        $timeout(function() {
                          // Let Angular know we are changing model data.
                          scope.$apply(function () {
                              // Push the new properties onto the model.
                              response.data.forEach(function (element, index, array) {
                                elements.push(element);
                              });
                          });
                        });
                      }
                  });
                }

                // Update last scroll position.
                lastScrollPosition = userScrollPosition;
          };

          // Handler for user scrolling.
          angular.element(document).on('scroll', debounced);
      }
    };

    return directiveConf;
  }

})();
