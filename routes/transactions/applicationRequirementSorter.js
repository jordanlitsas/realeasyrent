var express = require('express');
var router = express.Router();
var Controller = require ('../../controllers/transactions/applicationRequirementSorterController');

router.post('/', (req, res) => {
    Controller.screenRenterProfile(req, res);
});



module.exports = router;

 