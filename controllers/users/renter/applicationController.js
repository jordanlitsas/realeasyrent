let Service = require('../../../services/applicationService');

const getApplication = (req, res) => { 
    let profile = Service.getApplication(req);
        res.status(200);
        res.send(profile)
}

const processApplication = (application) => {
    
}
   


module.exports = {getApplication}