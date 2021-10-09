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
  
  
  app.get('/test/:api', async (req, res) => {
    let Controller; 
    let api = req.params.api;
    let userId = "";
    switch(api){
      
      case 'user1':
        Controller = require('./controllers/users/userController');
        req.body = {
          operator: "",
          query:""
        };
  
        Controller.getUser(req, res);
      break;
  
      case 'user2':
        Controller = require('./controllers/users/userController');
        req.body = {
          operator: "userId",
          query:"false id"
        };
  
        Controller.getUser(req, res);
      break;
  
      case 'user3':
        Controller = require('./controllers/users/userController');
        let Service = require('./services/users/userService');
  
        
        userId = await Service.createUser({firstName: "Lisa", lastName: "Simpson", postcode: 1000, email: "lisa's email"});
  
        req.body = {
          operator: "userId",
          query: userId
        };
  
        Controller.getUser(req, res);
      break;
  
      case 'user4':
        Controller = require('./controllers/users/userController');
  
        req.body = {
          operator: "userId",
          query: "a bad userId"
        };
  
        Controller.getUser(req, res);
      break;
  
      case 'user5':
        Controller = require('./controllers/users/userController');
  
        req.body = {
          operator: "personalInfoQuery",
          query: {firstName: "Lisa"}
        };
  
        Controller.getUser(req, res);
      break;
  
      case 'user6':
        Controller = require('./controllers/users/userController');
  
        req.body = {
          operator: "personalInfoQuery",
          query: {firstName: "Moe"}
        };
  
        Controller.getUser(req, res);
      break;
  
      case 'user7':
        Controller = require('./controllers/users/userController');
  
        req.body = {
          operator: "multipleUsers",
          query: {firstName: "Moe"}
        };
  
        Controller.getUser(req, res);
      break;
  
      case 'user8':
        Controller = require('./controllers/users/userController');
  
        req.body = {
          operator: "multipleUsers",
          query: {firstName: "Moe"}
        };
  
        Controller.getUser(req, res);
      break;
  
      case 'user9':
        Controller = require('./controllers/users/userController');
  
        req.body = {
          operator: "multipleUsers",
          query: {}
        };
  
        Controller.getUser(req, res);
      break;
  
       
      }
  });
  
  app.delete('localhost:3000/test/:api', (req, res) => {
    let Controller; 
    let api = req.params.api;
    let userId = "";
  
    switch(api){
      case "user1":
        Controller = require('./controllers/users/userController');
        req.body = {};
        Controller.deleteUser(req, res);
      break;
    }
  
  });

http.listen(port,()=>{
  console.log("Listening on port ", port);
});