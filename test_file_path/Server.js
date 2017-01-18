var express = require("express");
var multer  = require('multer');
var path    = require('path');
var app     = express();
var fs      = require('fs');
var bodyParser = require("body-parser")

var PythonShell = require('python-shell');

var options = {

  mode: 'text',

  pythonPath: '',

  pythonOptions: ['-u'],

  scriptPath: '',

  args: ['value1', 'value2', 'value3']

};


/*Configure the multer.*/

/*Handling routes.*/

app.get('/',function(req,res){
      res.sendfile("index.html");
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

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

app.post('/search/source', function(req, res) {
  //console.log(req.body.user.name)
  var pathArray = [];
  var pathSource = __dirname + '/uploads/' + req.body.user.name;

  try {
    stat = fs.statSync(pathSource);
    fs.readdir(pathSource, function(err, items){

      for (var i=0; i<items.length; i++) {
        var file = req.body.user.name + '\\' + items[i];
        pathArray.push(file);
      }

      res.send(pathArray);
    });

  } catch (err) {
    console.log("path isn't exist");
  }
});

app.post('/execute/source', function(req, res) {
  var source = req.body.user.source;

  PythonShell.run('uploads\\' + source, options, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});


/*Run the server.*/
app.listen(3000,function(){
    console.log("Working on port 3000");
});
