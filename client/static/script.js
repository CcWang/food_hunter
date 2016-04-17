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
    .when('/restaurant/:id',{
      templateUrl:'/static/partials/more_restaurants.html'
    })
    .otherwise({
      redirectTo:'/'
    })
})
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

      factory.user = {email:user[0].email,fav_category:user[0].fav_category,_id:user[0]._id,name:user[0].email.split('@')[0]};
      // console.log(factory.user);
      cb(factory.user);
      // console.log(factory.user);
    })
 }
  factory.update_cat = function(data){
    //get user's picked category
    $http.post('/updateCategory/'+factory.user._id, data).success(function(data){
      var location = {list:data,location:[localStorage.lat,localStorage.lng]};
      localStorage.list = data;
      // factory.getYelp(location);
      factory.next();
    })
  }
// inital getYelp
  factory.getYelp = function (location,cb) {
    // console.log('inital getYelp',location);
    $http.post('/index',location).success(function (data) {
      factory.restaurants = data;
      cb(factory.restaurants);
    })
  }
  factory.next = function(){
    $location.path('/restaurant');
  }
  factory.logoff = function(){
    delete localStorage.email;
    delete localStorage.lat;
    delete localStorage.lng;
    delete localStorage.list;
    $location.path('/');
    $window.location.reload();
  }
  factory.getLocation = function(){
    $http.post('/getGoogleKey').success(function(data){
      $http.post('https://www.googleapis.com/geolocation/v1/geolocate?key='+data.key).success(function(data){
        localStorage.lat=data.location.lat;
        localStorage.lng =data.location.lng;
      })
    })  
  }
  if (!(localStorage.lat && localStorage.lng)) {
    factory.getLocation();
    
  }

  //change location:
  factory.newLocation = function(location){
    $http.post('/getGoogleKey').success(function(data){
      $http.post('https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key='+data.key).success(function(data){
        console.log('newLocation',data.results[0].geometry.location);
        localStorage.lat=data.results[0].geometry.location.lat;
        localStorage.lng =data.results[0].geometry.location.lng;
        $window.location.reload();
      })
    }) 
    // cb;
  }

  //check if loged in
  if (localStorage.email == undefined) {
     $location.path('/');
    
  }
  factory.changeDistance = function(info,cb){
    $http.post('/changeDistance',info).success(function (data) {
      factory.restaurants = data;
      cb(factory.restaurants);
    })
  }
  return factory;
})
