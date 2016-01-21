'use strict';

angular.module('evansClient')
  .controller('PropertiesCtrl', PropertiesCtrl);

PropertiesCtrl.$inject = ['$state', '$http', 'propertiesList', '$stateParams'];

function PropertiesCtrl($state, $http, propertiesList, $stateParams) {
  var vm = this;

  this.propertiesList = propertiesList.data;
}
