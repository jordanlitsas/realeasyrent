let Service = require('../../services/transactions/applicationService');

const createApplication = (req, res) => { 
    Service.createApplication(req).then(insertionSuccess => {
        if (insertionSuccess){
            res.status(200).send();
        }
        else {
            res.status(400).send();
        }   
    })
}

const deleteApplication = (req, res) => {

    if (req.body.operator == "property"){

    } 
    else if (req.body.operator == "applicant"){
        Service.removeApplicant(req).then(deletionSuccess => {
            if (deletionSuccess){
                res.status(200).send(deletionSuccess);
            }
            else {
                res.status(400).send();
            }  
        });
    }
   
}

const getApplications = (req, res) => {
    Service.getApplications(req).then(applicantUserIds => {
        if (applicantUserIds){
            res.status(200).send(applicantUserIds);
        }
        else {
            res.status(400).send();
        }   
    })
}



module.exports = {createApplication, deleteApplication, getApplications}