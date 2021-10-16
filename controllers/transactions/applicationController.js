const { application } = require('express');
const { applicationRequirementSortingService, applicationService } = require('../../services');
const Services = require('../../services');
const appReqSorterController  = require("./applicationRequirementSorterController");


// let notification = require('../../util/notificationSocket');


const createApplication = async (req, res) => { 
    let userId = req.body.userId;
    let propertyId = req.body.propertyId;

    let flag = true;
    let errorMessage = "Application was not created\n";

    //Validate that property does not have existing applications 
    //this method is to create the initial applications. Properties aren't stored in this doc until they have 1 application
    await Services.applicationService.getApplications(propertyId).then(applications => {
        if (applications != null){
            errorMessage += "There are current applications for that property - update active_applications instead.\n";
            flag = false;
        }
    })
    //Validate the userId 
    await Services.userService.getUserWithUserId(userId).then(existingUser => {
        if (existingUser == null){
            errorMessage += "userId is not associated with a user\n";
            flag = false;
        }
    })

    await Services.renterProfileService.getRenterProfileWithUserId(userId).then(usersRenterProfile => {

        if (usersRenterProfile == null){
            errorMessage += "userId is not associated with a renter profile\n";
            flag = false;
        }
    })

    //validate the propertyId
    await Services.propertyService.getPropertyWithPropertyId(propertyId).then(existingProperty => {
        if (existingProperty == null){
            errorMessage += "propertyId is not associated with a property";
            flag = false;
        }
    })

    

    

    if (flag){

        let application = {
            propertyId: propertyId,
            applicants: [{
                userId: userId,
                dateApplicationMade: new Date(),
                status: "processing"
            }]
        };


        Services.applicationService.createApplication(application).then(activeApplicationList => {
            if (activeApplicationList){
                initiateApplicationProcessing(userId, propertyId, activeApplicationList);
                res.status(200).send();
            }
            else {
                res.status(400).send(errorMessage);
            }   
        })
    } else {
        res.status(400).send(errorMessage);
    }
    
}

const deleteApplication = async (req, res) => {
    let operator = req.body.operator;
    let query = req.body.query;
    let propertyId = req.body.propertyId;
    let errorMessage = "Could not delete application\n";
    let flag = true;

    let activeApplications;
    //Confirm the property has been listed
    await Services.applicationService.getApplications(propertyId).then(existingApplications => {
        activeApplications = existingApplications;
        if (existingApplications == null){
            errorMessage += "There are is current active application for this property.\n";
            flag = false;
        }


        //Validate the user has applied for this property
        if (operator == "applicant"){
            let existingApplication = false;
            activeApplications.applicants.forEach(applicant => {
                
                if (applicant.userId == query){
                    existingApplication = true;
                }
                
            })

            if (!existingApplication && flag){
                errorMessage += "This user has not applied for this application before.\n"
                flag = false;
            } 
        }

    });

    

    


    if (flag){
        if (operator == "applicant"){

            //Confirm the user has applied for this application
            
            await Services.applicationService.removeApplicant(query, propertyId).then(async deletionSuccess => {

                //No documents are allowed without an active application
                if (deletionSuccess.applicants.length == 0){
                   await Services.applicationService.removeProperty(propertyId);
                }

                if (deletionSuccess){
                    res.status(200).send();
                }
                else {
                    res.status(400).send(errorMessage);
                }  
            });
        } else if (operator == "property"){
           await Services.applicationService.removeProperty(propertyId).then(deletionSuccess => {
                if (deletionSuccess){
                    res.status(200).send();
                } else {
                    res.status(400).send(errorMessage);
                }
            })
        }
    } 
    
    else {
        res.status(400).send(errorMessage);
    }
   
   
}

const getApplications = (req, res) => {
    let propertyId = req.body.propertyId;
    Services.applicationService.getApplications(propertyId).then(applicationList => {
        if (applicationList != null){
            res.status(200).send(applicationList);
        } else {
            res.status(204).send();
        }   
    });
}

const updateApplication = async (req, res) => {
    let userId = req.body.userId;
    let propertyId = req.body.propertyId;
    let appUpdate = req.body.appUpdate;

    let flag = true;
    let errorMessage = "Application was not created\n";


     //Validate the userId 
     await Services.userService.getUserWithUserId(userId).then(existingUser => {
        if (existingUser == null){
            errorMessage += "userId is not associated with a user\n";
            flag = false;
        }
    })

    //validate the propertyId
    await Services.propertyService.getPropertyWithPropertyId(propertyId).then(existingProperty => {
        if (existingProperty == null){
            errorMessage += "propertyId is not associated with a property";
            flag = false;
        }
    })

    let activeApplicationList = await Services.applicationService.getApplications(propertyId);
    if (activeApplicationList == null){
        errorMessage += 'propertyId was not associated with an active_application document. POST instead.'
        flag = false;
    }

    if (flag){


        //Validate the user hasn't already applied.
        activeApplicationList.applicants.forEach(existingApplicant => {
            if (existingApplicant.userId == userId){
                errorMessage += "This userId is already associated with an active application.";
                flag = false;
            }
        })

        //create new applicant data
        if (flag){
            appUpdate = {
                userId: userId,
                dateApplicationMade: new Date(),
                status: "processing"
            };

            //add new applicant data to active_application document state
            activeApplicationList.applicants.push(appUpdate);

            //update new doc
            activeApplicationList = await Services.applicationService.updateApplication(activeApplicationList);


            //initiate process for nonFlexible requirements to deny inelligible applicants, and nonFlexible requirement sorting to rank shortlisted applicants
            await initiateApplicationProcessing(userId, propertyId, activeApplicationList);
        
            res.status(200).send();
            
        } else {
            res.status(400).send(errorMessage);
        }
      
        
    } else {
        res.status(400).send(errorMessage);
    }
}

/*
1. outcome: true if no nonFlexibleViolations were recorded, false if any were
*/
const initiateApplicationProcessing = async (userId, propertyId, activeApplicationList) => {
    if (activeApplicationList){

        //request body to call screenRenterProfile in applicationRequirementSorterController
        let applicationScreeningRequest = {
            body:{
                "userId": userId,
                "propertyId": propertyId,
                "applicationCriteriaType": "nonFlexible"
            }
        }


        let outcome = await appReqSorterController.screenRenterProfile(applicationScreeningRequest)
        


        


        activeApplicationList.applicants.forEach( async application => {
            if (application.userId == userId){

                //Set the outcome of the requirement screening to the nonFlexibleViolations value
                //!outcome as we want it to say true if there was violations
                application.report.nonFlexibleViolations = !outcome;

                if (!outcome){
                    application.status = "denied";

                }

                let updatedApplication = await Services.applicationService.updateApplication(activeApplicationList);

                //add return for else
                if (outcome){
                    applicationScreeningRequest = {
                        body:{
                            "userId": userId,
                            "propertyId": propertyId,
                            "applicationCriteriaType": "flexible"
                        }
                    }

                    let flexibleScreening = await appReqSorterController.screenRenterProfile(applicationScreeningRequest);

                    updatedApplication.applicants.forEach(applicant => {
                        if (applicant.userId == userId){
                            applicant.report.flexibleViolations = flexibleScreening;
                        }
                    });
                    
                    rankApplications(updatedApplication);

                    
                }
            }
        })
    }
}
const rankApplications = async (updatedApplication) => {

    let shortList = [];


    updatedApplication.applicants.forEach(applicant => {
        if (applicant.status == "processing"){
            shortList.push(applicant);
        }
    })

    updatedApplication.shortList.forEach(shortListedApplicant => {
        shortList.push(shortListedApplicant);

    })
       
    

    let sortedApplicants = shortList.sort(function(a, b){
       
        return a.report.flexibleViolations - b.report.flexibleViolations;
    })

    updatedApplication.shortList = [];
    let i = 0;

    sortedApplicants.forEach(application => {
        updatedApplication.shortList.push(application);

        for (i; i <= updatedApplication.applicants.length; i++){
            try{ 
                if (application.userId == updatedApplication.applicants[i].userId){
                updatedApplication.applicants.splice(i, 1);
                }
            }
            catch{}
           
        }

    });

    await Services.applicationService.updateApplication(updatedApplication);


}


   


       
    
   




module.exports = {createApplication, deleteApplication, getApplications, updateApplication}



                   
                