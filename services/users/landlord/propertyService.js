let propertyDocConnection = require('../../../services/database/propertyDocConnection');
let userDocConnection = require('../../../services/database/userDocConnection');


/*
    collect user's id
    collect rest of req.query which is property form data
    remove userid from property
    insert the property into property collection and stop method if this fails
    collect the propertyId from this newly created property
    get the user's doc that has made this property listing
        if that user already has a portfolio declared in their user doc, push the new property's id to it
        otherwise create that new portfolio array and push it into the profile attribute
    update the new user doc with a reference to their newly listed property
 */
const createProperty = (req) => {
    try { 
        
        let flag = false;
        let userId = req.query.userId;
        let property = req.query;
        delete property.userId;

        flag = propertyDocConnection.insertProperty(property);
        if (!flag){ return flag; }

        let propertyId = propertyDocConnection.getProperty({address: property.address, postcode: property.postcode});
        propertyId = propertyId.propertyId;

        let userDoc = userDocConnection.getUser(userId);
        try {
            userDoc.profile.propertyPortfolio.push(propertyId);
        }
        catch{
            let propertyPortfolio = [propertyId];
            userDoc.profile.push(propertyPortfolio);
        }

        userDocConnection.updateUser(userDoc);
        
        return flag;

    }
    catch {
        return false;
    }
}


const deleteProperty = (req) => {
    try { 
        
        let flag = false;
        let userId = req.query.userId;
        let propertyId = req.query.propertyId;

        flag = propertyDocConnection.deleteProperty(propertyId);
        if (!flag){ return flag; }


        let userDoc = userDocConnection.getUser(userId);
        let i = 0;
        
        for (i; i < userDoc.profile.propertyPortfolio.length; i++){
            if (property == userDoc.profile.propertyPortfolio[i]){
                userDoc.profile.propertyPortfolio.splice(i, 1);
            }
        }

        flag = userDocConnection.updateUser(userDoc);
        
        return flag;

    }
    catch {
        return false;
    }
}


const getProperty = (req) => {
    return true;
}


const updateProperty = (req) => {
    return true;
}


module.exports = {createProperty, deleteProperty, getProperty, updateProperty}