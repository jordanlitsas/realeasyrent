let Service = require('../../services/transactions/applicationService');

const createApplication = (req, res) => { 
    let userId = req.body.userId;
    let propertyId = req.body.propertyId;
    Service.createApplication(userId, propertyId).then(insertionSuccess => {
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
        Service.removeProperty(req).then(deletionSuccess => {
            if (deletionSuccess){
                res.status(200).send();
            }
            else {
                res.status(400).send();
            }  
        });
    } 
    else if (req.body.operator == "applicant"){
        Service.removeApplicant(req).then(deletionSuccess => {
            if (deletionSuccess){
                res.status(200).send();
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