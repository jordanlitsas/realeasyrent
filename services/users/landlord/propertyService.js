const { response } = require('express');
let propertyDocConnection = require('../../../services/database/propertyDocConnection');
let userDocConnection = require('../../../services/database/userDocConnection');



const createProperty = async (req) => {
    
    let property = req.body.property;
    propertyId = await propertyDocConnection.insertProperty(property);

    return propertyId;

    }
  


const deleteProperty = (req) => {
    try { 
        
        let propertyId = req.body.propertyId;
        let flag = propertyDocConnection.deleteProperty(propertyId);
                
        return flag;

    }
    catch {
        return false;
    }
}



const getProperty = (req) => {
  
    let query = {address: req.body.address, postcode: req.body.postcode};
    let property = database.getProperty(query);

    return property;
}



const updateProperty = (req) => {
    return true;
}


module.exports = {createProperty, deleteProperty, getProperty, updateProperty}