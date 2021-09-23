var database = require('../database/applicationDocConnection')

const createApplication = async (req) => {

    let userId = req.body.userId;
    let propertyId = req.body.propertyId;
    try {

        if (req.body.operator == "new"){

            let flag = await database.insertInitialApplication(userId, propertyId);
            return flag;

        } 
        else if (req.body.operator == "add"){

            let flag = await database.addApplication(userId, propertyId);
            return flag;

        }
        
    
    }
    catch{
        return false;
    }
    
}

const getApplications = async (req) => {
    try {
        let propertyId = req.body.propertyId;
        let applicantUserIds = await database.getApplications(propertyId);

        return applicantUserIds;
    }
    catch{
        return false;
    }
}




const removeApplicant = async (req) => {
    try {
        let propertyId = req.body.propertyId;
        let userId = req.body.userId;
        let flag = await database.removeApplicant(userId, propertyId);
        return flag;
    }
    catch{
        return false;
    }
}

const removeProperty = async (req) => {
    try {
        let propertyId = req.body.propertyId;
        let flag = await database.removeProperty(propertyId);
        return flag;
    }
    catch{
        return false;
    }
}

 module.exports = {createApplication, removeApplicant, getApplications, removeProperty}
