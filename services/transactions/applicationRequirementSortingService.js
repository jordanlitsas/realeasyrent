const renterProfileService = require('../users/renter/renterProfileService')
const propertyService = require('../users/landlord/propertyService');
const { renterProfile } = require('../database/_schemas');
const { resourceLimits } = require('worker_threads');
const comparer = require('./renterProfileRequirementComparer')

const initiateRenterProfileScreening = async (userId, propertyId, criteriaFlexibility) => {
    let renterProfile = await renterProfileService.getRenterProfileWithUserId(userId);

    let query = {
        operator: "propertyId",
        query: {"propertyId": propertyId}
    };

    let criteria;
    let property = await propertyService.getProperty(query);

    if (criteriaFlexibility == "nonFlexible"){
        criteria = property.applicantCriteria.nonFlexible;
    } else if (criteriaFlexibility == 'flexible'){
        criteria = property.applicantCriteria.flexible;

    }

    let renterProfileCriteriaValues = extractCriterionValuesFromRenterProfile(renterProfile, criteria);
    let screeningOutcome = comparer.compareRenterValuesToBenchmarkValues(renterProfileCriteriaValues, criteria);
    
    let result = true;
    screeningOutcome.forEach(criterion => {
        if (!criterion.outcome){
            result = false;
        }
    })
    return result;
}


const extractCriterionValuesFromRenterProfile = (renterProfile, criteria) => {

    let report = [];

    criteria.forEach(criterion => {
        
        let category = criterion.category;
        let renterCategoryValue;
        let benchmark = criterion.benchmark;
        

        //atributes deeper than layer 1 (which cannot be accessed by objectLayerReferenceerencing the highest level object) are stored in array 
        if (typeof(category) == 'object'){ 
            renterCategoryValue = comparer.handleMultiLayerObject(category, renterProfile);
            // console.log(renterCategoryValue)

            category = renterCategoryValue.name;
            renterCategoryValue = renterCategoryValue.value;

        }  else {
            renterCategoryValue = renterProfile[`${category}`];
        }


        let result = {rentersValue: renterCategoryValue, category: category, benchmark: benchmark, classification: criterion.classification};
        report.push(result);
    });       
    return report;
}


module.exports = {initiateRenterProfileScreening}