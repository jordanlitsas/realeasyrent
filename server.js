//Server template credit to Alessio Bonti - found at: https://github.com/alexbonti/deakin-crowds/blob/master/server.js
var express = require("express");
var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// let dbConnection = require('./dbConnection.js');

let http = require('http').createServer(app);
let io = require('socket.io')(http);






var port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.static(__dirname + '/public'));


let userRoute = require('./routes/users/user');
let propertyRoute = require('./routes/users/landlord/property');
let renterProfileRoute = require('./routes/users/renter/renterProfile');
let applicationRoute = require('./routes/transactions/application')

app.use('/user', userRoute);
app.use('/property', propertyRoute);
app.use('/renterProfile', renterProfileRoute);
app.use('/application', applicationRoute)





//socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


http.listen(port,()=>{
  console.log("Listening on port ", port);
});