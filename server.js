//Server template credit to Alessio Bonti - found at: https://github.com/alexbonti/deakin-crowds/blob/master/server.js
var dbConnection = require('./services/database/dbConnection')
var express = require("express");
var app = express();
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))



let http = require('http').createServer(app);
let io = require('socket.io')(http);

var sockets = require('./util/sockets');
sockets.connect(io);




var port = process.env.PORT || 8080;
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



http.listen(port,()=>{
  console.log("Listening on port ", port);
});