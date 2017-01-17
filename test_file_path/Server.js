var express = require("express");
var multer  = require('multer');
var path    = require('path');
var app     = express();
var fs      = require('fs');
var bodyParser = require("body-parser")


/*Configure the multer.*/

/*Handling routes.*/

app.get('/',function(req,res){
      res.sendfile("index.html");
});


var newDestination = null;
app.post('/register/source', multer({ dest: './uploads/',
  rename: function (fieldname, filename) {
    newDestination = fieldname;
    return filename;
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

}), function(req, res){
  res.end("File uploaded");
}
);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/execute/source', function(req, res) {
  //console.log(req.body.user.name)
  var pathArray = [];
  var pathSource = __dirname + '/uploads/' + req.body.user.name;
  try {
    stat = fs.statSync(pathSource);
    fs.readdir(pathSource, function(err, items){
      for (var i=0; i<items.length; i++) {
        var file = pathSource + '/' + items[i];
        pathArray.push(file);
        //console.log("Start: " + file);

        /*
        fs.stat(file, function(err, stats) {
          console.log(file);
          console.log(stats["size"]);
        })
        */
      }
      res.send(pathArray);
    });

  } catch (err) {
    console.log("path isn't exist");
  }
});


/*Run the server.*/
app.listen(3000,function(){
    console.log("Working on port 3000");
});
