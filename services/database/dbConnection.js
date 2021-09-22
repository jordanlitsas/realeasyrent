const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin123@cluster0.wm9no.mongodb.net/Users?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(uri);
const db = mongoose.connection;

exports.userCollection = () => {
  let collection;
  client.connect((err, db) => {
    if (!err){ console.log("Connectied to User Collection"); }
     client.db("user").collection("personal_information");
  });

}


db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log("Mongoose Connection");
})

