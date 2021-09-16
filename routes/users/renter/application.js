var express = require('express');
var router = express.Router();
var Controller = require ('../../../controllers/users/renter/applicationController.js');



router.post('/', (req, res) => {
    Controller.createApplication(req, res);
});

router.delete('/', (req, res) => {
    Controller.deleteApplication(req, res)
})


module.exports = router;

