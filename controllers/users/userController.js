const { response } = require('express');
const { isNull } = require('util');
ObjectId = require('mongodb').ObjectID;
let Service = require('../../services/index');

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
        let newUser = true;

        let userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            postcode: data.postcode,
        };

        //Validate no existing user
        Service.userService.getUserWithPersonalInfoQuery(userData.email).then(existingUser => {
            if (existingUser != null){
                newUser = false;
            }
        })


        if (newUser){
            
            //create a new user with the inputted information
            Service.userService.createUser(userData).then(newId => { 

               
                if (newId == null){
                    res.status(400).send();
                }
                else {

                    //return new user's id for user's logged in instance.
                    res.status(200).send(newId);
                } 
             });  
        } else {
            res.status(400).send();
        }

    }
    catch{
        res.status(400).send();
    }
}


const getUser = async (req, res) => {


    
    Service.getUser(req).then(user => {
        res.status(200).send(user);
    })
}

const deleteUser = (req, res) => { 
    if (Service.deleteUser(req)){
        res.status(200).send()
    }
    else {
        res.status(400).send();
    }
}




const updateUser = (req, res) => { 
    Service.updateUser(req).then(updateSuccess => {
        if (updateSuccess){
            res.status(200).send();
        } else {
            res.status(400).send();
        }
    });
}

module.exports = {createUser, deleteUser, getUser, updateUser}