angular.module('Hiemino')
  .controller('MainCtrl', ['$scope', 'Post', function($scope, Post) {

    $scope.alphabet = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
      'Y', 'Z'];

    $scope.categories = ['Photo', 'Reading', 'Diary', 'Comedy',
      'Drama', 'Food', 'News'];

    $scope.headingTitle = 'Top 12 Posts';

    $scope.posts = Post.query();

    $scope.filterByCategory = function(category) {
      $scope.posts = Post.query({ category: category });
      $scope.headingTitle = category;
    };

    $scope.filterByAlphabet = function(char) {
      $scope.posts = Post.query({ alphabet: char });
      $scope.headingTitle = char;
    };
  }]);