/*
    TO DO
    - set uri
*/ 

const MongoClient = require('mongodb').MongoClient;

const uri = "uriPlaceholder"; 
let mongoClient = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

mongoClient.connect((err, db) => {

     if(!err){
       console.log('Database Connected')
     } else{
       console.log('[error]',err)
     }
 });
 

exports.mongoClient = mongoClient;