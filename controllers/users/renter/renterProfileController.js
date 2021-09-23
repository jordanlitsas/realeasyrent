let Services = require('../../../services/users/renter/renterProfileService');

const createRenterProfile = (req, res) => { 
    Services.createRenterProfile(req).then(newRenterProfile => {
        if (newRenterProfile.userId){
            res.status(200).send(newRenterProfile.userId);
        }
        else {
            res.status(400).send();
        } 
    })
}

const getRenterProfile = (req, res) => {
    if (req.body.userId){
        Services.getRenterProfileWithUserId(req).then(renterProfile => {
            if (renterProfile){
                res.status(200).send(renterProfile);
            }
            else {
                res.status(400).send();
            } 
        })
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




module.exports = {createRenterProfile, deleteRenterProfile, getRenterProfile}