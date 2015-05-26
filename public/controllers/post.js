angular.module('Hiemino')
  .controller('PostCtrl', ['$scope', '$alert', 'Post', function($scope, $alert, Post) {
    $scope.addPost = function() {
      Post.save({ title: $scope.title },
        function() {
          $scope.title = '';
          $scope.addForm.$setPristine();
          $alert({
            content: 'TV show has been added.',
            placement: 'top-right',
            type: 'success',
            duration: 3
          });
        },
        function(response) {
          $scope.title = '';
          $scope.addForm.$setPristine();
          $alert({
            content: response.data.message,
            placement: 'top-right',
            type: 'danger',
            duration: 3
          });
        });
    };
  }]);