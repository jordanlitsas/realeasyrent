let Service = require('../../services');

/*
    This page is responsible for managing CRUD operations for the user collection. Each document represents a unique system user.
*/

/*
    Creates a new system user
    request will contain the firstname, lastname, email and postcode of the user
    A request is made to the database with the userData to determine if there is a user that matches this data already.
    Only email is used given a user can have the same names and postcodes.
    If no user is returned from the database, that userData is inserted into the user collection via userService.createUser --> userDocConnection.insertUser
    A string version of the ObjectId is returned (userId) for reference in the UI.
*/
const createUser = async (req, res) => { 
    try {
        let data = req.body;

        //set to false if a user can be retrieved with the given email

        let userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            postcode: data.postcode,
        };

        //validation - make sure all required user information is not empty or null
        for (var key in userData){
            if (userData[key] == null || typeof(userData[key]) == 'undefined' || userData[key].toString().length == 0){
                res.status(400).send(`User was not created - missing user information for ${key}.`)
            }
        }

        //Validate no existing user
        Service.userService.getUserWithPersonalInfoQuery({email: userData.email}).then(existingUser => {
            if (existingUser == null){
                //create the new user
                Service.userService.createUser(userData).then(user => { 

                    //capture the user's id
                    let newId = user._id.toString();
    
                    if (newId == null){
                        res.status(400).send(`User was not created - user document objectId was null.`);
                    } else {
                        //return new user's id for user's logged in instance.
                        res.status(200).send(newId);
                    } 
                 });  
            } else {
                //send existing user can be retrieved with given email
                res.status(400).send(`User was not created - this email is associated with another user.`);
            }            
        });
    }
    catch{
        res.status(400).send(`User was not created - something went wrong, catch block was called.`);
    }
}


const getUser = async (req, res) => {

    let operator = req.body.operator;
    let query = req.body.query;
    switch(operator){
        case "userId":
        //returns a single user with a given userId (equal to that user's document's objectid)
            Service.userService.getUserWithUserId(query).then(user => {
                if (user == null){
                    res.status(400).send(`That userId is not associated with a user document.`);
                } else {
                    res.status(200).send(user)
                }
            })
            
        break;
        
        case "personalInfoQuery":
            Service.userService.getUserWithPersonalInfoQuery(query).then(user => {
                if (user == null){
                    res.status(204).send()
                } else {
                    res.status(200).send(user)
                }
            })
        break;

        case "multipleUsers":
            Service.userService.getMultipleUsersWithPersonalInfoQuery(query).then(userArray => {
                if (userArray.length == 0){
                    res.status(204).send();
                }
                res.status(200).send(userArray);
            })
        break;        
    }
}


    
   


//users can only be deleted with userId.
const deleteUser = (req, res) => { 
    try {
        let userId = req.body.userId;
        Service.userService.deleteUserWithUserId(userId).then(success => {
            if (success){
                res.status(200).send();
            } else {
                res.status(400).send(`User not deleted - incorrect userId`);
            }
        })
    }
    catch{
        res.status(400).send(`Something went wrong - catch block was called.`);
    }
}




const updateUser = (req, res) => { 

    let userUpdate = req.body.userUpdate;
    Service.userService.updateUser(userUpdate).then(updateSuccess => {
        if (updateSuccess){
            res.status(200).send();
        } else {
            res.status(400).send('The user was not updated.');
        }
    });
}

module.exports = {createUser, deleteUser, getUser, updateUser}