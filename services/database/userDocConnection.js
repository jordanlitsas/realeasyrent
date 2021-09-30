var schemas = require('./_schemas');
var mongoose = require('mongoose')
const userModel = mongoose.model('user', schemas.user);


const getUserWithPersonalInfoQuery = async (query) => {
    let user = await userModel.findOne(query);
    return user;
}

const getMultipleUsersWithPersonalInfoQuery = async (query) => {
    let users = await userModel.find(query);
    return users;
}


const getUserWithId = async (userId) => {
    try {
        let user = await userModel.findById(userId);
        return user;
    }
    catch{
        return null;
    }
    
}


const insertUser = async (userData)=>{
    const user = new userModel(userData);
    let savedUser = await user.save();
    return savedUser;
}

const updateUser = async (userUpdate) => {
    let updatedUser = await userModel.findOneAndUpdate({_id: userUpdate._id}, userUpdate, {new: true});
    if (updatedUser) {
        return true;
    } else {
        return false;
    }


}

module.exports = {insertUser, getUserWithId, getUserWithPersonalInfoQuery, getMultipleUsersWithPersonalInfoQuery, updateUser}