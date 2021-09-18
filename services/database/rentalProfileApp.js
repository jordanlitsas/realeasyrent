const { profile } = require("console");

const insertProfileApplication = (app) => {
    const profileApplication = new profileApplication({app});
       

    // save profileApp in the database
    profileApplication.save(profile).then(data => {
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

const deletProfileApplication = (userId) => {
    return true;
}

const getProfileApplication = (userId) => {
    return true;
}

const updateProfileApplication = (app) => {

    return true;
}

module.exports = {insertProfileApplication, deletProfileApplication, getProfileApplication, updateProfileApplication} 