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
        
        if (req.body.userId){
            let userId = req.body.userId;

            userId = mongoose.Types.ObjectId(userId); 
    
            let user = await database.getUserWithId(userId);
    
            return user;

        } else if (req.body.personalInfoQuery){
            let query = req.body.personalInfoQuery;
            let user = await database.getUserWithPersonalInfoQuery(query);
            return user;

        } else if (req.body.getMultipleUsers){
            let query = req.body.getMultipleUsers;

            let users = await database.getAllUsersWithPersonalInfoQuery(query);
            return users;

        }
        
    }
    catch {
        return false;
    }
}




const updateUser = async (req) => {
    try {
        /* This will need to be redone after examining the desired method for updating records. i.e., whether req.body will already contain the updated document model or it will
        need to be organised here. */
        let user = req.body.user;
        let flag = await database.updateUser(user);

        return flag;
    }
    catch {
        return false;
    }
}


module.exports = {createUser, getUser, updateUser}