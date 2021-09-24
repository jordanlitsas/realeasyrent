// let database = require('./dbConnection');
let database = require('../../database/renterProfileDocConnection');


var dbConnection = require('../../database/dbConnection')


const updateRenterProfile = (req) => {
    let updatedRenterProfileData = req.body.updatedRenterProfileData;
    try {
        let flag = database.updateRenterProfile(updatedRenterProfileData);

        dbConnection.reset();
        return flag;
        
    }

    catch {
        return false;
    }
}



const createRenterProfile = async (renterProfileData) => {

    try { 

        let flag = await database.insertRenterProfile(renterProfileData); 
        return flag;
    }
    catch {
        return false;
    }
    
}

const getRenterProfileWithUserId = async (id) => {
    try { 

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