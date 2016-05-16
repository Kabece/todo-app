angular.module('todoController', [])
  .controller('mainController', function($scope, $http, $mdMedia, $mdDialog, Todos) {
    $scope.formData = {};
    $scope.addTodo = false;
    $scope.listName = "Listy";
    $scope.showDescription = false;
    $scope.isPeriodicalTask = false;

    $scope.showDes = function(){
        $scope.showDescription = !$scope.showDescription;
    }

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
               $scope.isPeriodicalTask=  false;
               $scope.todos = data;
             });

        $scope.addTodo = !$scope.addTodo;
      }

      $scope.periodUpdate = function(id, value) {
          var data = {
              taskId : id,
              periodChange : value
          }
          Todos.quantityUpdate(data)
               .success(function(tasks) {
                 $scope.todos = tasks;
               });
      }

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

 $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

     $scope.showAdvanced = function(ev, index) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

        $mdDialog.show({
          controller: DialogController,
          controllerAs: 'crtl',
          templateUrl: 'dialog1.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: useFullScreen,
          locals: {
            items: $scope.todos[index]
          }
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
     }

     function DialogController($scope, $mdDialog, locals) {
        $scope.locals = locals;
       $scope.hide = function() {
         $mdDialog.hide();
       };

       $scope.cancel = function() {
         $mdDialog.cancel();
       };
     }


  });
