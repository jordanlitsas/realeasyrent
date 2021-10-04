let database = require('../../database/renterProfileDocConnection');



const updateRenterProfile = async (updatedRenterProfileData) => {
    try {
        let flag = await database.updateRenterProfile(updatedRenterProfileData);
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
        return null;
    }
    
}

const getRenterProfileWithUserId = async (userId) => {
    try { 
        let renterProfile = await database.getRenterProfileWithUserId(userId); 
        return renterProfile;
    }
    catch {
        return null;
    }
}

const getRenterProfilesMatchingCriteria = async (criteria) => {
    try { 
        let renterProfiles = await database.getRenterProfilesMatchingCriteria(criteria); 
        return renterProfiles;
    }
    catch {
        return null;
    }
}

module.exports = {createRenterProfile, updateRenterProfile, getRenterProfileWithUserId, getRenterProfilesMatchingCriteria};