angular.module('todoController', [])
  .controller('mainController', function($scope, $http, Todos) {
    $scope.formData = {};
    $scope.addTodo = false;

    $scope.toggle = function() {
      $scope.addTodo = !$scope.addTodo;
    }

    $scope.clearAndToggle = function() {
      $scope.formData={};
      $scope.addTodo = !$scope.addTodo;
    }

      Todos.get()
        .success(function(data) {
          console.log('data'+JSON.stringify(data));
          $scope.todos = data;
        })

      Todos.getHistory()
           .success(function(history) {
             $scope.todoHistory = history;
           })

      $scope.addNewTodo = function() {
           Todos.create($scope.formData)
             .success(function(data) {
               $scope.formData = {};
               $scope.todos = data;
             });

        $scope.addTodo = !$scope.addTodo;
      }

      $scope.createTodo = function() {
        if(!$.isEmptyObject($scope.formData)) {
          Todos.create($scope.formData)
            .success(function(data) {
              $scope.formData = {};
              $scope.todos = data;
            });
        };
      };

      $scope.deleteTodo = function(id) {
        Todos.delete(id)
          .success(function(data) {
            $scope.todos = data;
          });
      };
  });
