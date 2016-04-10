var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var userSchema = new Schema({
  name:{type:String, required:true,index:{unique:true}},
  email:{type:String, required:true, index:{ unique: true}},
  password:{type:String, required:true},
  fav_category:{type:Array},
  restaurant:{type:Array}
});

mongoose.model('User',userSchema);

userSchema.pre('save',function(next){
  var user = this;
  if(!user.isModified('password')) {
    return next();
  };
  bcrypt.getSalt(SALT_WORK_FACTOR, function(err,salt){
    if (err) {
      return next(err);
    };
    user.password = hash;
    next();
  })
});

userSchema.methods.comparePassword = function(userPassword,cb){
  bcrypt.compare(userPassword, this.password, function(err, isMatch){
    if(err){
      return cb(err);
    };
    cb(null, isMatch);
  });
};