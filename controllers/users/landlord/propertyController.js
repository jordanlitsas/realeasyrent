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

    let filter = req.body;
    Service.getProperty(filter).then(property => {
        if (property){
            res.status(200).send(property);
        }
        else {
            res.status(400).send();
        }
    });
   
}

const deleteProperty = (req, res) => {
    Service.deleteProperty(req).then(deletionSuccess => {
        if (deletionSuccess){
            res.status(200).send();
        }
        else {
            res.status(400).send();
        }   
    })
   
}




const updateProperty = (req, res) => {
    Service.updateProperty(req).then(updateSuccess => {
        if (updateSuccess){
            res.status(200).send();
        }
        else {
            res.status(400).send();
        }  
    })
   
}
module.exports = {createProperty, deleteProperty, getProperty, updateProperty}