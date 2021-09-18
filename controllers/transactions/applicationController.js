let Service = require('../../services/transactions/applicationService');

const createApplication = (req, res) => { 
    if (Service.createApplication(req)){
        res.status(200).send();
    }
    else {
        res.status(400).send();
    } 
}

const deleteApplication = (req, res) => {
    if (Service.deleteApplication(req)){
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }   
}

const getApplications = (req, res) => {
    if (Service.getApplications(req)){
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }   
}



module.exports = {createApplication, deleteApplication, getApplications}