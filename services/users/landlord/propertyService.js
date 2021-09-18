const { response } = require('express');
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
    // try { 
        let flag = false;
        let property = req.body.property;

        flag = propertyDocConnection.insertProperty(property);
        if (!flag){ return flag; }

        return flag;

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