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
myApp.factory('mainFactory',function($window, $location,$http){
  var factory={};
  factory.user = {};
  factory.login = function(user,cb){
    $http.post('/user',user).success(function(data){
      if(data == 'Email address and password do not match'){
        cb(data);
      }else if(data){
        // factory.user = data;
        factory.storeUser(data.email);
        // console.log(localStorage);
        $location.path('/category');
      }else{
        //create that user
        $http.post('/create',user).success(function(data){
          // factory.user = data;
          factory.storeUser(data.email);
          // console.log(localStorage);
          $location.path('/category');
        });
      }
    });
  }
 factory.storeUser = function(data){
  localStorage.email = data;
 }
 factory.findUser = function(data,cb){

    $http.post('/findByEmail',{email:data}).success(function(user){
      console.log(user);
      factory.user = {email:user[0].email,fav_category:user[0].fav_category,_id:user[0]._id};
      cb(factory.user);
      console.log(factory.user);
    })
 }
  factory.update_cat = function(data){
    //get user's picked category
    $http.post('/updateCategory/'+factory.user._id, data).success(function(data){
      var location = {list:data};
      factory.getYelp(location);
    })
  }

  factory.getYelp = function (location) {
    $http.post('/index',location).success(function (data) {
      factory.restaurants = data;
      $location.path('/restaurant');
    })
  }
  factory.logoff = function(){
    delete localStorage.email;
    $location.path('/');
    $window.location.reload();
  }
  return factory;
})

myApp.controller('mainController',function($scope,mainFactory){
  
  $scope.login = function(){
    mainFactory.login($scope.user,function(data){
      $scope.error=data;
    });
  }
})