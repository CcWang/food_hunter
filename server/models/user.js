var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
  email:{type:String, required:true, index:{ unique: true}},
  password:{type:String, required:true},
  fav_category: {},
  restaurant: {}
});

mongoose.model('User',userSchema);

/* ------------- user password utils -------------- */ 

userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  } 

  // update password with hash
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});
