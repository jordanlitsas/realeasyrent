// let database = require('./dbConnection');
let Services = require('../../../services/users/renter');

const getApplication = (req) => {

    let userProfile = Services.getUser(req);
    console.log(userProfile);
    return userProfile;
    
}




module.exports = {getApplication};