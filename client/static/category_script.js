
myApp.controller('mainController',function($scope,mainFactory){
  
  $scope.login = function(){
    mainFactory.login($scope.user,function(data){
      $scope.error=data;
    });
  }
})

myApp.controller('categoryController',function($scope,mainFactory ){
  $scope.category = [];
  $scope.checked_cat = [];
  var getUser = function(data){
  $scope.user = data;
  // console.log($scope.user);
  //sort category by value;
    for (var cat in $scope.user.fav_category) {
      $scope.category.push([cat,$scope.user.fav_category[cat]]);
    }
    $scope.category.sort(function(a,b){return b[1] - a[1]});
  }
  //use localStorage.email to find the loged in user.
  mainFactory.findUser(localStorage.email, getUser);
  $scope.update = function(name){
    var i = $scope.checked_cat.indexOf(name);
      if (i == -1) {
        $scope.checked_cat.push(name); 
      }else{
        $scope.checked_cat.splice(i,1)
      }
  }
  $scope.submit = function(){
     // localStorage.checked_cat = [];
    if ($scope.checked_cat.length > 0) {
      mainFactory.update_cat($scope.checked_cat)  
    }
  }
  $scope.logoff = function(){
    mainFactory.logoff();
  }
  
})

myApp.controller('resController',function($scope, mainFactory,$routeParams,$location){
  var getUser = function(data){
    console.log('user',data);
    $scope.user = data;
  }
  var getRes = function(data){
    $scope.restaurants =data;
    $scope.lists = localStorage.list.split(',');
  }
  var changeDistance = function(data){
    $scope.restaurants = data;
    // console.log($scope.restaurants[$scope.currentList]);
  }
  
   $scope.logoff = function(){
    mainFactory.logoff();
  }
  $scope.showMore = function(list){
    $location.path('/restaurant/'+list);
  }
  var getList = function () {
    $scope.currentList = $routeParams.id;
  }
  getList();
  mainFactory.findUser(localStorage.email, getUser);
  mainFactory.getYelp({list:localStorage.list,location:[localStorage.lat,localStorage.lng]},getRes);
// ALTER DISTANCE
  $scope.changeDistance = function(data){
    // console.log($scope.currentList);
  mainFactory.changeDistance({list:$scope.currentList,location:[localStorage.lat,localStorage.lng],radius:data},changeDistance);
  }

//Alter location
  $scope.changeLocation = function(){
    mainFactory.newLocation($scope.newLocation, getRes);
  }

//add browsed restaurants into user db
  $scope.updateRes = function(name,url,category){
    mainFactory.updateRes(name,url,category);
     mainFactory.findUser(localStorage.email, getUser);
  }

  // update if user like that restaurants 
  $scope.like = function(category,name,like){
    mainFactory.like(category,name,like);
    mainFactory.findUser(localStorage.email, getUser);
  }
})
