angular.module('todoService', [])
  .factory('Todos', function($http) {
    return {
      get : function() {
        return $http.get('/api/users/tasks/active/');
      },
      getHistory: function() {
        return $http.get('/api/users/tasks/inactive/');
      },
      create : function(todoData) {
        return $http.post('/api/users/tasks/', todoData);
      },
    delete : function(id) {
        return $http.delete('/api/todos/' + id);
      },
    archive : function(id) {
      return $http.post('/api/users/tasks/archieve/' + id);
    }
    }
  });
