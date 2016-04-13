
myApp.controller('categoryController',function($scope,mainFactory ){
  $scope.category = [];
  $scope.checked_cat = [];
  // get data.fav_category, try to put into a new map{counter:[category]}
  var getUser = function(data){
     $scope.user = {};
    $scope.user.email = data.email;
    $scope.user.fav_category = data.fav_category;
    $scope.user._id = data._id;
    for (var cat in data.fav_category) {
      $scope.category.push([cat,data.fav_category[cat]]);
    }
    $scope.category.sort(function(a,b){return b[1] - a[1]});
  }
  getUser(mainFactory.user);
  $scope.update = function(name){
    var i = $scope.checked_cat.indexOf(name);
      if (i == -1) {
        $scope.checked_cat.push(name); 
      }else{
        $scope.checked_cat.splice(i,1)
      }
  }
  $scope.submit = function(){
    if ($scope.checked_cat.length > 0) {
      mainFactory.update_cat($scope.checked_cat)  
    }
  }
  
})

myApp.controller('resController',function($scope,mainFactory){
  var getUser = function(data){
    $scope.user = {};
    $scope.user.email = data.email;
    $scope.user.fav_category = data.fav_category;
    $scope.user._id = data._id;
  }
  var getRes = function(data){
    $scope.restaurants =data;
  }
  getUser(mainFactory.user);
  getRes(mainFactory.restaurants);
})
