angular.module('Hiemino', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);


  }]);