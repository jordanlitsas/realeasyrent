const Services = require('../../services');
const comparer = require('../../services/transactions/renterProfileRequirementComparer')


/*
Can be used to filter out properties a user will be inelligible (nonFlexible criteria violation) to apply for by their userId with each propertyId
Can be called after an application is made to return whether a user fails any nonFlexbile criteria, or how many flexible criteria are failed.
*/
const screenRenterProfile = async (req, res) => { 

    
    let userId = req.body.userId;
    let propertyId = req.body.propertyId;
    let applicationCriteriaType = req.body.applicationCriteriaType; //either flexible or nonFlexible
    

    //Use renterProfile values to compare to property.applicationCriteria values.
    let renterProfile = await Services.renterProfileService.getRenterProfileWithUserId(userId);
    let property = await Services.propertyService.getPropertyWithPropertyId(propertyId);

    let criteria;


    if (applicationCriteriaType == "nonFlexible"){
        criteria = property.applicantCriteria.nonFlexible;
    } else if (applicationCriteriaType == "flexible"){
        criteria = property.applicantCriteria.flexible;
    } else {
        res.send(400);
    }

  

    //Gets the values from renterProfile for their associated key pair in criteria.
    let renterProfileCriteriaValues = await Services.applicationRequirementSortingService.extractCriterionValuesFromRenterProfile(renterProfile, criteria);

    //Compares the values from renterProfile and criteria
    let report = comparer.compareRenterValuesToBenchmarkValues(renterProfileCriteriaValues);

    //iterates through each boolean in report, and returns a final decision according to whether the criteria type was flexible or nonFlexible
    let outcome = Services.applicationRequirementSortingService.evaluateReport(report, applicationCriteriaType);

    

    res.send({"outcome": outcome});
    
}



module.exports = {screenRenterProfile}