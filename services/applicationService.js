// let database = require('./dbConnection');
let Services = require("./userService");

const getApplication = (req) => {

    let userProfile = Services.getUser(req);
    console.log(userProfile);
    return userProfile;
    
}




module.exports = {getApplication};