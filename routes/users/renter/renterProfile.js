var express = require('express');
var router = express.Router();
var Controller = require ('../../../controllers/users/renter/renterProfileController.js');



router.post('/', (req, res) => {
    Controller.createRenterProfile(req, res);
});

router.get('/', (req, res) => {
    Controller.getRenterProfile(req, res);
});

router.delete('/', (req, res) => {
    Controller.deleteRenterProfile(req, res)
})


module.exports = router;

