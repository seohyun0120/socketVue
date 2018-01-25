var express = require('express');
var app = express();
var server = require('http').createServer(app);
var fs = require('fs');
var io = require('socket.io')(server);
var port = 8000;

app.use('/lib', express.static(__dirname + "/lib"));

app.get('/', function(req,res){
  fs.readFile('./Web/index.html',function(error, data){
    res.end(data);
  });
});

io.on('connection',function(socket){
    console.log('a user connected');

    socket.on('client', function(msg){
      io.emit('client', msg);
    });

    socket.on('disconnect', function(msg){
      console.log("a user disconnected");
    });

});


server.listen(port, function(){
  console.log('Hello WebChat Server! I am Seohyun! Hello THERE!!!');
});
