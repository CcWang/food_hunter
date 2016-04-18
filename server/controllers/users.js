var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var User = mongoose.model('User');
module.exports = {
  create: function (req,res) {
    // body..
    var user = new User({ email:req.body.email, 
      password:req.body.pwd,
      fav_category: {
        'American(New)':1,
        'American(Tranditional)':1,
        "BBQ":1,
        'Brazilian Restaurant':0,
        'Breakfast & Brunch':1,
        'British Restaurant':0,
        'Buffets':1,
        'Burgers':1,
        'Chicken Wings':1,
        'Chinese Restaurant':1,
        'Canadian Restaurant':0,
        'Caribbean Restaurant':0,
        'Eastern European Restaurant':0,
        'Fish & Chips':0,
        'French Restaurant':1,
        'Filipino Restaurant':0,
        'German Restaurant':1,
        'Gluten - Free':0,
        'Greek Restaurant':0,
        'Hawaiian Restaurant':0, 
        'Hot Pot':1,
        'Hungarian Restaurant':0,
        'Indian Restaurant':1,
        'Irish Restaurant':0,
        'Italian Restaurant':1,
        'Japanese Restaurant':1,
        'Korean Restaurant':1,
        'Latin American Restaurant':0,
        'Malaysian Restaurant':0,
        'Mediterranean Restaurant':0,
        'Mexican Restaurant':1,
        'Middle Eastern Restaurant':0,
        'Pizza':1,
        'Russian Restaurant':0,
        'Salad':1,
        'Sandwiches':1,
        'Seafood':1,
        'Soup':1,
        'Spanish Restaurant':1,
        'Steakhouses':1,
        'Sushi Bars':1,
        'Taiwanese Restaurant':1,
        'Thai Restaurant':1,
        'Turkish Restaurant':0,
        'Ukrainian Restaurant':0,
        'Vegan':0,
        'Vegetarian':1,
        'Vietnamese Restaurant':1
          },
      restaurant:{}
    });
    user.save(function(err,data){
      if(err){
        console.log('createing user error',err);
      }else{
        res.json(data)
      }
    })
  },

  findOne:function(req,res){
    User.findOne({'email':req.body.email}, function(err, data){
      if (err) {
        console.log('find user errors', err);
      };
      if (data) {
        var user = data;
        // compare password using bcrypt
        bcrypt.compare(req.body.pwd, user.password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) res.json(user);
          else res.json('Email address and password do not match');
        });
      }else{
        res.json(data);
      }
    })
  },

  updateCategory:function(req,res){
    // console.log(req.body);
    // console.log(req.params);
    for (var i=0;i < req.body.length ; i++) {
      //mongoose way to conplie object key ==>put in query
      var query = {}
      query['fav_category.'+ req.body[i]]=2;
      User.update({_id:req.params.id},{$inc:query},function(err,data){
        // console.log(data);
      })
    }

    res.json(req.body);
  },

  updateRestaurant:function(req,res){
    // console.log(req.body,req.params);
    var query = {}
    query['restaurant.'+req.body.category+'.'+req.body.name+'.url']=req.body.url;
    query['restaurant.'+req.body.category+'.'+req.body.name+'.like']=false;
    // console.log(query);
    User.findByIdAndUpdate(req.params.id,{$set:query},function(err,data){
      if (err){
        console.log('updateRestaurant errors',err);
      }else{
        res.send(data); 
      }
    })
  },
  updatelike:function(req,res){
    var query = {}
    query['restaurant.'+req.body.category+'.'+req.body.name+'.like']=!req.body.like;
    User.findByIdAndUpdate(req.params.id,{$set:query},function(err,data){
      if (err){
        console.log('updateRestaurant errors',err);
      }else{
        res.send(data); 
      }
    })
  },

  findByEmail:function(req,res){
    User.find({'email':req.body.email},function(err,data){
        if (err) {
            console.log('errors',err);
        }else{
            res.json(data);
        }
    })
  }
}