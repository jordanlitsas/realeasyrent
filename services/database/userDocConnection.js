var schemas = require('./_schemas');
var mongoose = require('mongoose')
var dbConnection = require('./dbConnection.js')
const userModel = mongoose.model('personal_information', schemas.user);

dbConnection.userCollection();
    
const getUserWithId = async (userId) => {
    let user = await userModel.findById(userId);
    return user;
}
const insertUser = async (userData)=>{
    
    if(!userData){
        return false;
    }

    let existingUser = await userModel.findOne(userData);
    
    if (existingUser == null){
        const user = new userModel(userData);
        let savedUser = await user.save();
        if (savedUser == user){
            return user;
        }
        else {
            return false;
        }
        
    } 
    else {
        return false;
    }    
  

}

module.exports = {insertUser, getUserWithId}