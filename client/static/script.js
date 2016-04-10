var myApp = angular.module('myApp',[]);
myApp.factory('homeFactory',function($http){
  var factory = {};
  factory.getYelp = function () {
    console.log('factory')
    $http.get('/index').success(function (data) {
      console.log(data)
    })
  }
  return factory;
});
myApp.controller('homeController', function ($scope, homeFactory) {
  $scope.getYelp = function (){
    console.log('controller answer')
    homeFactory.getYelp();
  }
})
