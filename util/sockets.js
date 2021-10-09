const connect = (serverIO)=>{
// const io = socketio(server);
const io = serverIO;

//Display when someone connects
 io.on('connection', socket => {
    socket.on('joinRoom', ({username, room})=> {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);
        
    //Tell single client that is connecting = personal message
    socket.emit('message', formatMessage(botName, 'Welcome to Lets Chat Support! Please wait while we connect you to support staff...'));

    //Tell everyone a client has connected except the client connecting
    socket.broadcast
    .to(user.room)
    .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );
    //Send users and room info
    io.to(user.room).emit('roomUsers',{
         room: user.room,
         users: getRoomUsers(user.room)
        });
  
    });


  
   //listen for chatMessage
   socket.on('chatMessage', (msg)=>{
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
   });

   io.on("connection", (socket) => {
    socket.on("hello", (arg) => {
      console.log(arg); // world
    });
  });

    //This runs when client disconnects
    socket.on('disconnect', ()=>{
        const user = userLeave(socket.id);

        if(user){
            //Tells everyone a client has connected including client connecting
            io.to(user.room).emit(
                'message', 
                formatMessage(botName, `${user.username} has left the chat`)) 
        };

        //Send users and room info
        io.to(user.room).emit('roomUsers',{
            room: user.room,
            users: getRoomUsers(user.room)
           });

        
       
     });
 
});
};

module.exports = {connect};