let Service = require('../../../services/users/landlord/propertyService');

const createProperty = (req, res) => { 
    if (Service.createProperty(req)){
        res.status(200).send();
    }
    else {
        res.status(400).send();
    } 
}

const deleteProperty = (req, res) => {
    if (Service.propertyService.deleteProperty(req)){
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }   
}

const getProperty = (req, res) => {
    if (Service.propertyService.getProperty(req)){
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }   
}


const updateProperty = (req, res) => {
    if (Service.propertyService.updateProperty(req)){
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }  
}
module.exports = {createProperty, deleteProperty, getProperty, updateProperty}