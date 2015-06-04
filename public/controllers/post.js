angular.module('Hiemino')
  .controller('PostCtrl', ['$scope', '$alert', 'Post', function($scope, $alert, Post) {
    $scope.addPost = function() {
      Post.save({ title: $scope.title, content: $scope.content },
        function() {
          $scope.title='';
          $scope.content='';
          $scope.addForm.$setPristine();
          $alert({
            content: 'Post has been added.',
            placement: 'top-right',
            type: 'success',
            duration: 3
          });
        },
        function(response) {
          $scope.title = '';
          $scope.content = '';
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