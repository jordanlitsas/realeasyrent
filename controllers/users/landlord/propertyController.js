let Service = require('../../../services/users/landlord/propertyService');

const createProperty = (req, res) => { 
    Service.createProperty(req).then(propertyId => {
        if (propertyId){
            res.status(200).send(propertyId);
        }
        else {
            res.status(400).send();
        } 
    });
}

const getProperty = (req, res) => {
    if (Service.getProperty(req)){
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }   
}

const deleteProperty = (req, res) => {
    if (Service.deleteProperty(req)){
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }   
}




const updateProperty = (req, res) => {
    if (Service.updateProperty(req)){
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }  
}
module.exports = {createProperty, deleteProperty, getProperty, updateProperty}