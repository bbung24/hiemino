angular.module('Hiemino', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
	  .when('/', {
	    templateUrl: 'views/login.html',
	    controller: 'LoginCtrl'
	  })
	  .when('/home', {
	  	templateUrl: 'views/home.html',
	    controller: 'MainCtrl'
	  })
	  .when('/posts/:id', {
	    templateUrl: 'views/detail.html',
	    controller: 'DetailCtrl'
	  })
	  .when('/post', {
	    templateUrl: 'views/post.html',
	    controller: 'PostCtrl'
	  })
	  .otherwise({
	    redirectTo: '/'
	  });
  }]);