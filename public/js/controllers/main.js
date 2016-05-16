angular.module('todoController', [])
  .controller('mainController', function($scope, $http, Todos) {
    $scope.formData = {};
    $scope.addTodo = false;
    $scope.listName = "Listy";

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
      if (Number.isInteger($scope.formData.periodQuantity) === false){
        alert("Ilość powtórzeń musi być liczbą!");
        return false;
       }
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

      $scope.archiveTask = function(id) {
        Todos.archive(id)
             .success(function(todos) {
               $scope.todos = todos[0];
               $scope.todoHistory = todos[1];
             });
      }

    $scope.myDate = new Date();

    $scope.minDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() - 2,
        $scope.myDate.getDate());

    $scope.maxDate = new Date(
        $scope.myDate.getFullYear(),
        $scope.myDate.getMonth() + 2,
        $scope.myDate.getDate());

    $scope.onlyWeekendsPredicate = function(date) {
      var day = date.getDay();
      return day === 0 || day === 6;
    }
  });
