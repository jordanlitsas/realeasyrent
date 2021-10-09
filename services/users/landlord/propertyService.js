var database = require('../../database/propertyDocConnection')

const getPropertiesWithUserId = async (ownersUserId) => {
    try{
        let properties = await database.getPropertiesWithUserId(ownersUserId);
        return properties;
    }
    catch{
        return null;
    }
    
}


const getPropertyWithPropertyId = async (propertyId) => {
    try{
        let property = await database.getPropertyWithPropertyId(propertyId);
        return property;
    }
    catch{
        return null;
    }
    
}

const createProperty = async (propertyData) => {
    let propertyId = await database.insertProperty(propertyData);
    return propertyId;
}
  


const deleteProperty = async (propertyId) => {
    try { 
        let flag = await database.deleteProperty(propertyId);      
        return flag;

    }
    catch {
        return false;
    }
}



const getPropertiesWithCriteria = async (propertyCriteria) => {
    let property = await database.getPropertiesWithCriteria(propertyCriteria);
    return property;

}



const updateProperty = async (propertyUpdate) => {
    try {
        let success = await database.updateProperty(propertyUpdate);
        return success;
    }
    catch{
        return false;
    }
    
}


module.exports = {createProperty, deleteProperty, getPropertiesWithCriteria, updateProperty, getPropertiesWithUserId, getPropertyWithPropertyId}