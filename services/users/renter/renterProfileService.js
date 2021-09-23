// let database = require('./dbConnection');
let database = require('../../database/renterProfileDocConnection');




const deleteRenterProfile = (userId) => {
    try {
        let flag = database.deleteRenterProfile(userId);
        return flag;
    }

    catch {
        return false;
    }
}



const createRenterProfile = async (req) => {

    try { 
        let renterProfileData = req.body.renterProfileData;

        let flag = await database.insertRenterProfile(renterProfileData); 
        return flag;
    }
    catch {
        return false;
    }
    
}

const getRenterProfileWithUserId = async (req) => {
    try { 
        let id = req.body.userId;

        let renterProfile = await database.getRenterProfileWithUserId(id); 
        return renterProfile;
    }
    catch {
        return null;
    }
}


module.exports = {createRenterProfile, deleteRenterProfile, getRenterProfileWithUserId};