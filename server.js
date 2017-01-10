/* express */
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);


/* Binding */
app.use('/public', express.static('public'));


/* Web Server Open at 3000 */
server.listen(3000);
console.log("wait port 3000")


/* Rendring index */
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});