var express = require("express");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.set('views', __dirname + '/views');
app.get('/', function(req, res){
  res.sendfile('views/index.html');
});
app.use(express.static(__dirname + '/public'));
io.on('connection', function(socket){
  console.log('user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});
