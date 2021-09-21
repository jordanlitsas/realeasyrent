const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server);
const { instrument } = require('@socket.io/admin-ui')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected' + (socket.id));
  socket.broadcast.emit('hi');
  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
socket.on('chat message', (msg) => {
  console.log('message: ' + msg);
 io.emit('chat message', msg);
 });
});

// socket.on("send-notification", function () {
  // io.broadcast.emit("new-notification", data);
 // socket.broadcast.emit("new-notification", data);
//})

//instrument(io, {auth: false})
 
//io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

server.listen(3000, () => {
  console.log('listening on *:3000');
});