var schemas = require('./_schemas');
var mongoose = require('mongoose')
const userModel = mongoose.model('user', schemas.user);


const getUserWithPersonalInfoQuery = async (query) => {
    let user = await userModel.findOne(query);
    return user;
}

const getAllUsersWithPersonalInfoQuery = async (query) => {
    let users = await userModel.find(query);
    return users;
}


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

const updateUser = async (user) => {
    let updatedUser = await userModel.findOneAndUpdate({_id: user._id}, user, {new: true});
    if (updatedUser) {
        return true;
    } else {
        return false;
    }


}

module.exports = {insertUser, getUserWithId, getUserWithPersonalInfoQuery, getAllUsersWithPersonalInfoQuery, updateUser}