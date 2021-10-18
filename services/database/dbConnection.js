const mongoose = require('mongoose');
const Grid = require('gridfs-stream')
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin123@cluster0.wm9no.mongodb.net/dev_jordan?retryWrites=true&w=majority";

let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(uri);

const db = mongoose.connection;
client.connect((err, db) => {
  if (!err){ console.log("Connected to development database"); }
});

client.once("open", function () {
  gfs = Grid(db, mongoose.mongo);
  gfs.collection("photos");
})

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
  console.log("Mongoose Connection");
})

