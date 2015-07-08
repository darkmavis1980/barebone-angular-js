'use strict';
/**
  * @namespace  controllers
  * @memberOf   myApp.module1
  */
angular.module('myApp.module1')

.controller('MyController',['$scope',
  function($scope){
    $scope.hello = 'world';
  }
]);