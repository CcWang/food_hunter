var myApp = angular.module('myApp',["ngRoute"]);
myApp.config(function($routeProvider){
  $routeProvider
    .when('/category',{
      templateUrl:'/static/partials/category.html'
    })
    .when('/restaurant',{
      templateUrl:'/static/partials/restaurant.html'
    })
    .when('/',{
      templateUrl:'/static/partials/main.html'
    })
    .otherwise({
      redirectTo:'/'
    })
})
// myApp.factory('homeFactory',function($http){
//   var factory = {};
//   factory.getYelp = function () {
//     console.log('factory')
//     $http.get('/index').success(function (data) {
//       console.log(data)
//     })
//   }
//   return factory;
// });
// myApp.controller('homeController', function ($scope, homeFactory) {
//   $scope.getYelp = function (){
//     console.log('controller answer')
//     homeFactory.getYelp();
//   }
// })
myApp.factory('mainFactory',function($location,$http){
  var factory={};

  factory.findUser = function(user,cb){
    $http.post('/user',user).success(function(data){
      if(data == 'Email address and password do not match'){
        cb(data);
      }else if(data){
        factory.user = data;
        $location.path('/category');
      }else{
        //create that user
        $http.post('/create',user).success(function(data){
          factory.user = data;
          $location.path('/category');
        });
      }
    });
  }
  return factory;
})

myApp.controller('mainController',function($scope,mainFactory){
  
  $scope.findUser = function(){
    mainFactory.findUser($scope.user,function(data){
      $scope.error=data;
    });
  }
})