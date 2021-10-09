let database = require('../database/userDocConnection');


//Receives form data, creates object mirroring database schema, 
const createUser = async (userData) => {
    try {
        let user = await database.insertUser(userData);        
        return user;
        
    }
    catch{
        return null;
    }
}


const getUserWithPersonalInfoQuery = async (userData) => {
    let user = await database.getUserWithPersonalInfoQuery(userData);
    return user;
}

const getMultipleUsersWithPersonalInfoQuery = async (userData) => {
    let user = await database.getMultipleUsersWithPersonalInfoQuery(userData);
    return user;
}


const getUserWithUserId = async (userId) => {
  
    try {
        let user = await database.getUserWithId(userId);
        return user;
    }
    catch{
        return null;
    }
  
}

const deleteUserWithUserId = async (userId) => {
    try {
        let flag = await database.deleteUserWithUserId(userId);
        return flag;
    }
    catch{
        return null;
    }
} 


const updateUser = async (userUpdate) => {
    try {
        let flag = await database.updateUser(userUpdate);
        return flag;
    }
    catch {
        return false;
    }
}


module.exports = {deleteUserWithUserId, createUser, getUserWithUserId, updateUser, getUserWithPersonalInfoQuery, getMultipleUsersWithPersonalInfoQuery}