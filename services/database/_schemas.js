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
    rentalHistory: 
        {            
            property: {
                bondConditions: {bondReturned: Boolean, reasonBondWitheld: String, amountWitheld: Number},

            address: String,
            landlordName: String,
            landlordEmail: String,
            landlordContactNumber: Number,
            lengthOfTenancy: Number,
            evicted: Boolean,
            rentalAgreementBroken: Boolean
        }
            
        }
    ,
    smoker: Boolean,
    preferredMoveInDate: String,
    committedOfCrime: Boolean
})

const activeApplication = new mongoose.Schema({
    propertyId: String,
    applicants: [{
        userId: String,
        dateApplicationMade: String,
        status: String, /* approved, denied, processing*/
        coApplicantUserId: [String],
        ranking: Number,
        report: {
            flexibleViolations: [String],
            nonFlexibleViolations: Boolean
        }
    }], 
    
})

const property = new mongoose.Schema({
    userId: String,
    applicantCriteria: 
    {  
        nonFlexible: 
        [
            {category: Schema.Types.Mixed, 
                benchmark: Schema.Types.Mixed, 
                classification: String}, 
        ],
        flexible: {}
    },
    availabledate: String, 
    bathrooms: Number,
    bedrooms: Number,
    commuteProfile: {
        drive: Number,
        publicTransport: Number,
        walk: Number
    },
    demographics: String,
    energyLevels: Number,
    hvac: String,
    housingType: String,
    indoorFeatures: String,
    keywords: String,
    location: String,
    marketValue: Number,
    nbn: String,
    outdoorFeatures: String,
    parking: String,
    petsAllowed: Boolean,
    addressNumber: String,
    addressName: String,
    postcode: Number,
    stateOrTerritory: String,
    rentAmount: Number,
    rentFrequency: String

})


module.exports = {user, renterProfile, activeApplication, property}