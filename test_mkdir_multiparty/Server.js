var express=require("express");
var multer  = require('multer');
var app=express();
var done=false;
var fs = require('fs');
var dir = './tmp';


/*Configure the multer.*/

/*Handling routes.*/

app.get('/',function(req,res){
      res.sendfile("index.html");
});


var newDestination = null;
app.post('/register/source',multer({ dest: './uploads/',
  rename: function (fieldname, filename) {
    newDestination = fieldname;
    return filename;
    //return filename+Date.now();
  },
  changeDest: function(dest, req, res) {
    var path = dest + newDestination;
    var stat = null;
    try {
      stat = fs.statSync(path);
    } catch (err) {
      fs.mkdirSync(path);
    }

    if(stat && !stat.isDirectory()) {
      throw new Error('Directory cannot be created')
    }

    return path;
  },

  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...');
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
    newDestination = null;
  }
}));


/*Run the server.*/
app.listen(3000,function(){
    console.log("Working on port 3000");
});
