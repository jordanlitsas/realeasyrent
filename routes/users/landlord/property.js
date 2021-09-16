var express = require('express');
var router = express.Router();
var Controller = require ("../../../controllers//propertyController");

router.post('/', (req, res) => {
    Controller.createProperty(req, res);
});

router.delete('/', (req, res) => {
    Controller.deleteProperty(req, res);
});

router.put('/', (req, res) => {
    Controller.updateProperty(req, res);
});

router.get('/', (req, res) => {
    Controller.getProperty(req, res);
});

module.exports = router;

 