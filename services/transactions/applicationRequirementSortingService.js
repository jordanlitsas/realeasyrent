const { application } = require('express');
const comparer = require('./renterProfileRequirementComparer')



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

const evaluateReport = (report, applicationCriteriaType) => {

    
    if (applicationCriteriaType == "nonFlexible"){
        let flag = true;
    

        report.forEach(criterion => {
            
            if (!criterion){
                flag = false;
            }
        })

        return flag;
    } 
    
    else if (applicationCriteriaType == "flexible"){
        let criterionViolated = 0;
        report.forEach(criterion => {
            if (!criterion){
                criterionViolated++;
            }
        })
        return criterionViolated;
    }
    
}


module.exports = {extractCriterionValuesFromRenterProfile, evaluateReport}