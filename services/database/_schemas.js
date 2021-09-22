let mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new mongoose.Schema({
    firstName: String,
    lastName: String,
    postcode: Number, 
    email: String
}); 

module.exports = {user}