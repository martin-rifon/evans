(function() {

  'use strict';

  angular.module('evansClient.contactInfo')
    .directive('showHideContactInfo', showHideContactInfoDirective);

  showHideContactInfoDirective.$inject = [];

  showHideContactInfoDirectiveController.$inject = [
      '$scope'
    ];

  function showHideContactInfoDirectiveController($scope) {
      var vm = this;

      vm.dataobject = $scope.dataobject;
    }

  function showHideContactInfoDirective() {

    var directiveConf = {
      restrict: 'E',
      scope: {
        dataobject: '='
      },
      replace: true,
      templateUrl: 'assets/properties/detail/directives/show-hide-contact-info/show_hide_contact_info.html',
      controller: showHideContactInfoDirectiveController,
      controllerAs: 'vm'
    };

    return directiveConf;
  }

})();
