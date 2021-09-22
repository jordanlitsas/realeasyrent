const { nextTick } = require('process');
let database = require('../database/userDocConnection');
var mongoose = require('mongoose');


//Receives form data, creates object mirroring database schema, 
const createUser = async (req) => {
    let userData;
    try {
        let data = req.body;

        userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            postcode: data.postcode,
        };

       let user = await database.insertUser(userData);
       let userId = user._id.toString();
       

       return userId;
        
        

      
        
    }
    catch{
        return false;
    }
}

const getUser = async (req) => {
    try{
        /*By not converting the request body into a user document format, and only passing the forwarding the given argument (req.body), the decision as to what specific information
        is required to retrieve a user can be determined at a later time. Therefore, the only restriction is that the argument is sufficient to locate a document in the collection.*/
        let userId = req.body.userId;

        userId = mongoose.Types.ObjectId(userId); 

        let user = await database.getUserWithId(userId);

        return user;
        
    }
    catch {
        return false;
    }
}

//Currently (16/09/2021), it is assumed a user document can be deleted with only id.
const deleteUser = (req) => {
    try {
        let userId = req.query.user._id;
        let flag = database.deleteUser(userId);
        
        return flag;
    }
    catch {
        return false;
    }
}




const updateUser = (req) => {
    try {
        /* This will need to be redone after examining the desired method for updating records. i.e., whether req.body will already contain the updated document model or it will
        need to be organised here. */
        let user = req.query.user;
        let flag = database.updateUser(user);

        return flag;
    }
    catch {
        return false;
    }
}


module.exports = {createUser, deleteUser, getUser, updateUser}