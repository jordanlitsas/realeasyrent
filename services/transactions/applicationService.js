var database = require('../database/applicationDocConnection')

const createApplication = (req) => {

    
    try {

        let propertyId = req.query.propertyId;
        let userId = req.query.userId;
        let flag;
        let applicationsForProperty = database.getApplications(propertyId);

        if (applicationsForProperty == null){
            applicationsForProperty = {propertyId: [userId]};
            flag = database.insertInitialApplication(applicationsForProperty);

        }
        else {
            applicationsForProperty.propertyId.push(userId);
            flag = database.updateApplications(applicationsForProperty);
        }

        
        return flag;
    
    }
    catch{
        return false;
    }
    
}

const getApplications = (req) => {
    try {
        let propertyId = req.query.propertyId;
        let applicationsForProperty = database.getApplications(propertyId);

        if (applicationsForProperty == null){
            return false;
        }

        return applicationsForProperty;
    }
    catch{
        return false;
    }
}




const deleteApplication = (req) => {
    try {
        let applicantToRemove = req.query.applicantToRemove;
        let flag = database.deleteApplication(applicantToRemove);
        return flag;
    }
    catch{
        return false;
    }
}

 module.exports = {createApplication, deleteApplication, getApplications}
