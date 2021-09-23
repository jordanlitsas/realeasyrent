let mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new mongoose.Schema({
    firstName: String,
    lastName: String,
    postcode: Number, 
    email: String
}); 

const renterProfile = new mongoose.Schema({
    userId: String,
    employment: {
        employer: String,
        lengthOfEmployment: String,
        position: String, 
        monthlyIncome: Number
    },
    personalReferences: [
        {
            name: String,
            contactNumber: Number,
            email: String,
            relationship: String
        }
    ],
    professionalReferences: [
        {
            name: String,
            contactNumber: Number,
            email: String,
            relationship: String
        }
    ],
    pets: [
        {
            species: String,
            breed: String,
            size: String,
            age: Number
        }
    ], 
    children: [ ],
    rentalHistory: [
        {
            address: String,
            landlordName: String,
            landlordEmail: String,
            landlordContactNumber: Number,
            lengthOfTenancy: Number,
            bondConditions: {bondReturned: Boolean, reasonBondWitheld: String, amountWitheld: Number},
            evicted: Boolean,
            rentalAgreementBroken: Boolean
        }
    ],
    smoker: Boolean,
    preferredMoveInDate: String,
    committedOfCrime: Boolean
})

const activeApplication = new mongoose.Schema({
    propertyId: String,
    applicants: [String]
})
module.exports = {user, renterProfile, activeApplication}