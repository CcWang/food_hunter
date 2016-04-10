var mongoose = require('mongoose');
var fs = require('fs');
mongoose.connect('mongodb://localhost/foodHunter');

var models_path = __dirname +'/../models';

fs.readdirSync(models_path).forEach(function (file) {
  // body...
  if (file.indexOf('.js')>0) {
    require(models_path+'/'+file);
  }
})