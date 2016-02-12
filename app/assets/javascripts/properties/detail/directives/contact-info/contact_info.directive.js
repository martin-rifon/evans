(function() {

  'use strict';

  angular.module('evansClient.contactInfo', [])
    .directive('contactInfo', contactInfoDirective);

  contactInfoDirective.$inject = [];

  function contactInfoDirective() {

    var directiveConf = {
      restrict: 'E',
      scope: {
        dataobject: '='
      },
      replace: true,
      templateUrl: 'assets/properties/detail/directives/contact-info/contact_info.html'
    };

    return directiveConf;
  }

})();
