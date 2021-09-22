const { profile } = require("console");
let schemas = require('./_schemas');
console.log(schemas.renterProfile.obj)
let renferProfileSchema = schemas.renterProfile.obj;

const insertRenterProfile = (renterProfileData, res) => {
    let renterProfile = new renferProfileSchema({renterProfileData});
       

    res.send(renterProfile)
    // save profileApp in the database
    renterProfile.save(profile).then(data => {
        if (data == null){
            return false
        }
    })
        .catch(err =>{
           if (err){
               return false;
           }
        });

    return true;
}

const deleteRenterProfile = (userId) => {
    return true;
}

const getRenterProfile = (userId) => {
    return true;
}

const updateRenterProfile = (app) => {

    return true;
}

module.exports = {insertRenterProfile, deleteRenterProfile, getRenterProfile, updateRenterProfile} 