myApp.factory('categoryFactory',function ($http,$location) {
  // body...
  var factory = {};

  return factory;
})

myApp.controller('categoryController',function($scope, categoryFactory,mainFactory ){
  $scope.category = [];
  // get data.fav_category, try to put into a new map{counter:[category]}
  var getUser = function(data){
    $scope.user = data;
    // Object.keys(data.fav_category).forEach(function(key) {
    //   var value = data.fav_category[key];
    //   var cat = {};
    //   cat[key] = value;
    //   $scope.category.push(cat);
    // });
    for (var cat in data.fav_category) {
      $scope.category.push([cat,data.fav_category[cat]]);
    }
    $scope.category.sort(function(a,b){return b[1] - a[1]});
  }
  getUser(mainFactory.user);
  $scope.update = function(name){
    console.log(name);
  }
})
