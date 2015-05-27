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
        test: function(user) {
          return $http.get('/api/createaccount')
            .success(function(datat) {
              $rootScope.currentUser = data;
              $location.path('/home');

              $alert({
                title: 'Cheers!',
                content: 'You have successfully created account.',
                placement: 'top-right',
                type: 'success',
                duration: 10
              });
            })
            .error(function() {
              $alert({
                title: 'Error!',
                content: 'Create account failed',
                placement: 'top-right',
                type: 'danger',
                duration: 10
              });
            });
        },
        // signup: function(user) {
        //   return $http.post('/api/signup', user)
        //     .success(function() {
        //       $location.path('/login');

        //       $alert({
        //         title: 'Congratulations!',
        //         content: 'Your account has been created.',
        //         placement: 'top-right',
        //         type: 'success',
        //         duration: 10
        //       });
        //     })
        //     .error(function(response) {
        //       $alert({
        //         title: 'Error!',
        //         content: response.data,
        //         placement: 'top-right',
        //         type: 'danger',
        //         duration: 10
        //       });
        //     });
        // },
        logout: function() {
          return $http.get('/api/logout').success(function() {
            $rootScope.currentUser = null;
            $cookieStore.remove('user');
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