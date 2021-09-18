const { response } = require('express');
let Service = require('../../services/users/userService');

const createUser = (req, res) => { 

    if (Service.createUser(req)){
        
        res.status(200).send();
    }
    else {
        res.status(400).send();
    } 
}

const deleteUser = (req, res) => { 
    if (Service.deleteUser(req)){
        res.status(200).send()
    }
    else {
        res.status(400).send();
    }
}


const getUser = (req, res) => {
    let user = Service.getUser(req);

    if (user == null){
        res.status(400).send();
    } else {
        res.status(200).send(user);
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