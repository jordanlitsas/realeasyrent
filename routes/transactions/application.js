var express = require('express');
var router = express.Router();
var Controller = require ('../../controllers/transactions/applicationController');

router.post('/', (req, res) => {
    Controller.createApplication(req, res);
});

router.delete('/', (req, res) => {
    Controller.deleteApplication(req, res);
});


router.get('/', (req, res) => {
    Controller.getApplications(req, res);
});

router.put('/', (req, res) => {
    Controller.updateApplication(req, res);
});

module.exports = router;

 