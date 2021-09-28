let Service = require('../../services/transactions/nonFlexibleFilterService');

const screenRenterProfile = (req, res) => { 
    let userId = req.body.userId;
    let propertyId = req.body.propertyId;
    
    Service.initiateRenterProfileScreening(userId, propertyId).then(screeningOutcome => {
        res.send(screeningOutcome);
    })
}



module.exports = {screenRenterProfile}