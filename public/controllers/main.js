angular.module('Hiemino')
  .controller('MainCtrl', ['$scope', 'Post', function($scope, Post) {

    $scope.categories = ['Photo', 'Reading', 'Diary', 'Comedy',
      'Drama', 'Food', 'News'];

    $scope.headingTitle = 'Recent 12 Posts';

    $scope.posts = Post.query();

    $scope.filterByCategory = function(category) {
      $scope.posts = Post.query({ category: category });
      $scope.headingTitle = category;
    };

    // $scope.deletePost = function(post) {
    //   Post.delete({ _id: $scope.title, content: $scope.content },
    //     function() {
    //       $scope.title='';
    //       $scope.content='';
    //       $scope.addForm.$setPristine();
    //       $alert({
    //         content: 'Post has been added.',
    //         placement: 'top-right',
    //         type: 'success',
    //         duration: 3
    //       });
    //     },
    //     function(response) {
    //       $scope.title = '';
    //       $scope.content = '';
    //       $scope.addForm.$setPristine();
    //       $alert({
    //         content: response.data.message,
    //         placement: 'top-right',
    //         type: 'danger',
    //         duration: 3
    //       });
    //     });
    // };
  }]);