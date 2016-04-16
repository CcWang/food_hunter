var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = {
  create: function (req,res) {
    // body..
    var user = new User({ email:req.body.email, 
      password:req.body.pwd,
      fav_category: {
        'American(New)':0,
        'American(Tranditional)':0,
        "BBQ":0,
        'Brazilian Restaurant':0,
        'Breakfast & Brunch':0,
        'British Restaurant':0,
        'Buffets':0,
        'Burgers':0,
        'Chicken Wings':0,
        'Chinese Restaurant':0,
        'Canadian Restaurant':0,
        'Caribbean Restaurant':0,
        'Eastern European Restaurant':0,
        'Fish & Chips':0,
        'French Restaurant':0,
        'Filipino Restaurant':0,
        'German Restaurant':0,
        'Gluten - Free':0,
        'Greek Restaurant':0,
        'Hawaiian Restaurant':0, 
        'Hot Pot':0,
        'Hungarian Restaurant':0,
        'Indian Restaurant':0,
        'Irish Restaurant':0,
        'Italian Restaurant':0,
        'Japanese Restaurant':0,
        'Korean Restaurant':0,
        'Latin American Restaurant':0,
        'Malaysian Restaurant':0,
        'Mediterranean Restaurant':0,
        'Mexican Restaurant':0,
        'Middle Eastern Restaurant':0,
        'Pizza':0,
        'Russian Restaurant':0,
        'Salad':0,
        'Sandwiches':0,
        'Seafood':0,
        'Soup':0,
        'Spanish Restaurant':0,
        'Steakhouses':0,
        'Sushi Bars':0,
        'Taiwanese Restaurant':0,
        'Thai Restaurant':0,
        'Turkish Restaurant':0,
        'Ukrainian Restaurant':0,
        'Vegan':0,
        'Vegetarian':0,
        'Vietnamese Restaurant':0
      }});
    user.save(function(err,data){
      if(err){
        console.log('createing user error',err);
      }else{
        res.json(data)
      }
    })
  },
  findOne:function(req,res){
    User.findOne({'email':req.body.email},function(err,data){
      if (err) {
        console.log('find user errors',err);
      };
      if (data) {
        //compare password using bcrypt
        // user.comparePassword(req.body.pwd,function(err,isMatch){
        //   if(err) throw err;
        //   console.log(req.body.pwd, isMatch);
        // })
        if (data.password == req.body.pwd) {
          res.json(data);
        }else{
          res.json('Email address and password do not match')
        }
      }else{
        res.json(data);
      }
      
    })
  },
  updateCategory:function(req,res){
    console.log(req.body);
    // console.log(req.params);
    for (var i=0;i < req.body.length ; i++) {
        req.body[i]
        //mongoose way to conplie object key ==>put in query
        var query = {}
        query['fav_category.'+ req.body[i]]=1;
        User.update({_id:req.params.id},{$inc:query},function(err,data){
            console.log(data);
        })
    }

    res.json(req.body);
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