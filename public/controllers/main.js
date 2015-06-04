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

  }]);