//Server template credit to Alessio Bonti - found at: https://github.com/alexbonti/deakin-crowds/blob/master/server.js
var dbConnection = require('./services/database/dbConnection')
var express = require("express");
var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// let dbConnection = require('./dbConnection.js');

let http = require('http').createServer(app);
let io = require('socket.io')(http);

var sockets = require('./util/sockets');
sockets.connect(io);




var port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(__dirname + '/public'));


let userRoute = require('./routes/users/user');
let propertyRoute = require('./routes/users/landlord/property');
let renterProfileRoute = require('./routes/users/renter/renterProfile');
let applicationRoute = require('./routes/transactions/application');
let applicationRequirementSorter = require ('./routes/transactions/applicationRequirementSorter');


app.use('/user', userRoute);
app.use('/property', propertyRoute);
app.use('/renter_profile', renterProfileRoute);
app.use('/application', applicationRoute)
app.use('/filter/application_requirements', applicationRequirementSorter);





//socket test
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

app.post('/test/:api', async (req, res) => {
  let Controller; 
  let api = req.params.api;
  switch(api){
    
    case 'user1':
        Controller = require('./controllers/users/userController');
        req.body = {
          firstName: "",
          lastName: "Simpson",
          email: "eatmy@shorts.com",
          postcode: 3000
        };

        Controller.createUser(req, res);
      break;

      case 'user2':
        Controller = require('./controllers/users/userController');
        req.body = {
          firstName: "Bart",
          lastName: "",
          email: "eatmy@shorts.com",
          postcode: 3000
        };

        Controller.createUser(req, res);
      break;

      case 'user3':
        Controller = require('./controllers/users/userController');
        req.body = {
          firstName: "Bart",
          lastName: "Simpson",
          email: "eatmy@shorts.com",
          postcode: ""
        };

        Controller.createUser(req, res);
      break;

      case 'user4':
        Controller = require('./controllers/users/userController');
        req.body = {
          firstName: "Bart",
          lastName: "Simpson",
          email: "",
          postcode: 3000
        };

        Controller.createUser(req, res);
      break;

      case 'user5':
        Controller = require('./controllers/users/userController');
        req.body = {
          firstName: "Bart",
          lastName: "Simpson",
          email: "eatmy@shorts.com",
          postcode: 3000
        };

        Controller.createUser(req, res);
      break;
    }
    

    
  });

http.listen(port,()=>{
  console.log("Listening on port ", port);
});