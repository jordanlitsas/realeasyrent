var database = require('../../database/propertyDocConnection')


const createProperty = async (req) => {
    
    let property = req.body.property;
    propertyId = await database.insertProperty(property);

    return propertyId;

    }
  


const deleteProperty = async (req) => {
    try { 
        let propertyId = req.body.propertyId;
        let flag = await database.deleteProperty(propertyId);      
        return flag;

    }
    catch {
        return false;
    }
}



const getProperty = async (req) => {
    let operator = req.body.operator;
    let query = req.body.query;

    switch(operator){
        case "userId":
            let ownersUserId = query.userId;
            let propertyFromUserId = await database.getPropertyWithUserId(ownersUserId);
            return propertyFromUserId;
        
        case "propertyId":
            let ownersPropertyId = query.propertyId;
            let propertyFromPropertyId = await database.getPropertyWithPropertyId(ownersPropertyId);
            return propertyFromPropertyId

        case "criteria":
            let propertyCriteria = query;
            let propertyFromCriteria = await database.getPropertiesWithCriteria(propertyCriteria);
            return propertyFromCriteria;
        }


}



const updateProperty = async (req) => {
    let propertyUpdate = req.body.property;
    let success = await database.updateProperty(propertyUpdate);
    return success;
}


module.exports = {createProperty, deleteProperty, getProperty, updateProperty}