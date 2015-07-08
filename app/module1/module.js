'use strict';

angular.module('myApp.module1', [
  'ngRoute'
])

// Routes
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/view1', {
    templateUrl: 'module1/templates/view1.html'
  });
}]);
