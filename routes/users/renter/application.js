var express = require('express');
var router = express.Router();
var Controller = require ('../../../controllers/users/renter/applicationController.js');

router.get('/', (req, res) => {
    Controller.getApplication(req, res);
});

module.exports = router;

