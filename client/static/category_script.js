myApp.factory('categoryFactory',function ($http,$location) {
  // body...
  var factory = {};

  return factory;
})

myApp.controller('categoryController',function($scope, categoryFactory,mainFactory ){
  var getUser = function(data){
    $scope.user = data;
    console.log($scope.user);
  }
  getUser(mainFactory.user);
})