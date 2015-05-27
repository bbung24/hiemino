angular.module('Hiemino')
  .factory('Auth', ['$http', '$location', '$rootScope', '$cookieStore', '$alert',
    function($http, $location, $rootScope, $cookieStore, $alert) {
      $rootScope.currentUser = $cookieStore.get('user');
      $cookieStore.remove('user');

      return {
        login: function(user) {
          return $http.post('/api/login', user)
            .success(function(data) {
              $rootScope.currentUser = data;
              $location.path('/home');

              $alert({
                title: 'Cheers!',
                content: 'You have successfully logged in.',
                placement: 'top-right',
                type: 'success',
                duration: 10
              });
            })
            .error(function() {
              $alert({
                title: 'Error!',
                content: 'Invalid username or password.',
                placement: 'top-right',
                type: 'danger',
                duration: 10
              });
            });
        },
        logout: function() {
          return $http.get('/api/logout').success(function() {
            $rootScope.currentUser = null;
            $cookieStore.remove('user');
            $location.path('/');
            
            $alert({
              content: 'You have been logged out.',
              placement: 'top-right',
              type: 'info',
              duration: 10
            });
          });
        }
      };
    }]);