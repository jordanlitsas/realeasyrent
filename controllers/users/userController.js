const { response } = require('express');
ObjectId = require('mongodb').ObjectID;
let Service = require('../../services/users/userService');

const createUser = async (req, res) => { 

    let userId;
    Service.createUser(req).then(newId => { 
        userId = newId;

        if (typeof(userId) == 'undefined' || userId == false){
            res.status(400).send();
        }
        else {
            res.status(200).send(userId);
    
        } 

     });   
}


const getUser = async (req, res) => {


    
    Service.getUser(req).then(user => {
        res.status(200).send(user);
    })
    // Service.getUser(req).then(returnedUser => { 
    //     user = returnedUser;

    //     console.log(user)

    //  });   

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
    if (Service.updateUser(req)){
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }
}

module.exports = {createUser, deleteUser, getUser, updateUser}