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
        "Barbeque":0,
        'Brazilian':0,
        'Breakfast & Brunch':0,
        'British':0,
        'Buffets':0,
        'Burgers':0,
        'Chicken Wings':0,
        'Chinese':0,
        'Canadian':0,
        'Caribbean':0,
        'Dumplings':0,
        'Eastern European':0,
        'Fast Food':0,
        'Fish & Chips':0,
        'French':0,
        'Filipino':0,
        'German':0,
        'Gluten - Free':0,
        'Greek':0,
        'Hawaiian':0, 
        'Hot Pot':0,
        'Hungarian':0,
        'Indian':0,
        'Irish':0,
        'Italian':0,
        'Japanese':0,
        'Korean':0,
        'Latin American':0,
        'Malaysian':0,
        'Mediterranean':0,
        'Mexican':0,
        'Middle Eastern':0,
        'Pizza':0,
        'Russian':0,
        'Salad':0,
        'Sandwiches':0,
        'Seafood':0,
        'Soup':0,
        'Spanish':0,
        'Steakhouses':0,
        'Sushi Bars':0,
        'Taiwanese':0,
        'Thai':0,
        'Turkish':0,
        'Ukrainian':0,
        'Vegan':0,
        'Vegetarian':0,
        'Vietnamese':0
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