let Services = require('../../services');

const createApplication = async (req, res) => { 
    let userId = req.body.userId;
    let propertyId = req.body.propertyId;

    let flag = true;
    let errorMessage = "Application was not created\n";

    //Validate that property does not have existing applications 
    //this method is to create the initial applications. Properties aren't stored in this doc until they have 1 application
    await Services.applicationService.getApplications(propertyId).then(applications => {
        if (applications.length > 0){
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


        Services.applicationService.createApplication(application).then(insertionSuccess => {
            if (insertionSuccess){
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
    let errorMessage = "Could not delete application\n";
    let flag = true;

    //Confirm the property has been listed
    await Services.applicationService.getApplications(query.propertyId).then(existingApplications => {
        if (existingApplications.length == 0){
            errorMessage += "There are no current applications for this property.\n";
            flag = false;
        }


        //Validate the user has applied for this property
        if (operator == "applicant"){
            let existingApplication = false;
            existingApplications[0].applicants.forEach(applicant => {
                if (applicant.userId == query.userId){
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
            
            await Services.applicationService.removeApplicant(query).then(deletionSuccess => {

                //No documents are allowed without an active application
                if (deletionSuccess.applicants.length == 0){
                    Services.applicationService.removeProperty(query.propertyId);
                }

                if (deletionSuccess){
                    res.status(200).send();
                }
                else {
                    res.status(400).send(errorMessage);
                }  
            });
        } else if (operator == "property"){
            Services.applicationService.removeProperty(query.propertyId).then(deletionSuccess => {
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
        if (applicationList.length > 0){
            res.status(200).send(applicationList[0].applicants);
        }
        else {
            res.status(400).send("There are no applications associated with this propertyId.");
        }   
    })
}



module.exports = {createApplication, deleteApplication, getApplications}