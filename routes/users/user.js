var express = require('express');
var router = express.Router();
var Controller = require ("../../controllers/users/userController");



router.post('/', (req, res) => {
    Controller.createUser(req, res);
});

router.delete('/', (req, res) => {
    Controller.deleteUser(req, res);
});

router.put('/', (req, res) => {
    Controller.updateUser(req, res);
});

router.get('/', (req, res) => {
    Controller.getUser(req, res);

});

module.exports = router;