angular.module('Hiemino')
  .factory('Post', ['$resource', function($resource) {
    return $resource('/api/posts/:_id');
  }]);