const { response } = require('express');
let Service = require('../services');

const createUser = (req, res) => { 

    if (Service.userService.insertUser(req)){
        
        res.status(200).send();
    }
    else {
        res.status(400).send();
    } 
}

const deleteUser = (req, res) => { 
    if (Service.userService.deleteUser(req)){
        res.status(200).send()
    }
    else {
        res.status(400).send();
    }
}


const getUser = (req, res) => {
    if (Service.userService.getUser(req)){
        res.status(200).send();
    } 
    else {
        res.status(400).send();
    }
}


const updateUser = (req, res) => { 
    if (Service.userService.updateUser(req)){
        res.stauts(200).send();
    }
    else {
        res.status(400).send();
    }
}

module.exports = {createUser, deleteUser, getUser, updateUser}