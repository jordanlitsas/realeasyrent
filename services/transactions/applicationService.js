var database = require('../database/applicationDocConnection')




const createApplication = async (application) => {

    let flag = await database.insertInitialApplication(application);
    return flag; 
}

const getApplications = async (propertyId) => {
 
    let applications = await database.getApplications(propertyId);
    return applications;
    
}


const removeApplicant = async (userId, propertyId) => {
    let flag = await database.removeApplicant(userId, propertyId);
    return flag;
}

const removeProperty = async (propertyId) => {
    let flag = await database.removeProperty(propertyId);
    return flag;
    
}

const updateApplication = async (appUpdate) => {
    let flag = await database.updateApplication(appUpdate);
    return flag;
}


 module.exports = {createApplication, removeApplicant, getApplications, removeProperty, updateApplication}
