// let database = require('./dbConnection');
let database = require('../../database/renterProfileDocConnection');




const updateRenterProfile = (req) => {
    let updatedRenterProfileData = req.body.updatedRenterProfileData;
    try {
        let flag = database.updateRenterProfile(updatedRenterProfileData);
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

const getRenterProfilesMatchingCriteria = async (req) => {
    try { 
        let query = req.body.renterProfilesMatchingCriteria;

        let renterProfiles = await database.getRenterProfilesMatchingCriteria(query); 
        return renterProfiles;
    }
    catch {
        return null;
    }
}

module.exports = {createRenterProfile, updateRenterProfile, getRenterProfileWithUserId, getRenterProfilesMatchingCriteria};