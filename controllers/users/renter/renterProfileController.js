let Services = require('../../../services/users/renter/renterProfileService');

const createApplication = (req, res) => { 
    let appData = req.query;
    if (Services.createApplication(appData)){
        res.status(200).send();
    }
    else {
        res.status(400).send();
    } 
   
}


const deleteApplication = (req, res) => { 
    let userId = req.query.userId;
    if (Services.deleteApplication(userId)){
        res.status(200).send();
    }
    else {
        res.status(400).send();
    } 
   
}




module.exports = {createApplication, deleteApplication}