let Services = require('../../../services/users/renter/renterProfileService');

const createRenterProfile = (req, res) => { 
    let appData = req.query;
    if (Services.createRenterProfile(appData)){
        res.status(200).send();
    }
    else {
        res.status(400).send();
    } 
   
}


const deleteRenterProfile = (req, res) => { 
    let userId = req.query.userId;
    if (Services.deleteRenterProfile(userId)){
        res.status(200).send();
    }
    else {
        res.status(400).send();
    } 
   
}




module.exports = {createRenterProfile, deleteRenterProfile}