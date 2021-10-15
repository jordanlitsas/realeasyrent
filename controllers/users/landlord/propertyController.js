let Service = require('../../../services');


/*
Creates a new property listing by storing it in the property collection.
- Each propety must be assigned to a user so the first step is to query whether that user exists or not.
- There cannot be another property in the collection with the same address number, address name and postcode. We must query the collection with these
    arguments.

*/
const createProperty = async (req, res) => { 
    let errorMessage = "Property was not created\n";
    let flag = true;
    let propertyData = req.body.property;

  
    if (typeof(propertyData) == 'undefined'){
        errorMessage += 'Incorrect query structure.\n';
        flag = false;
    }

    if (flag){
        //Validate user's existence
        await Service.userService.getUserWithUserId(propertyData.userId).then(existingUser => {

            if (existingUser == null){
                errorMessage += 'userId was not associated with any user document.\n';
                flag = false;
            }

        });


        //Validate no existing property has that number, name, postcode combo.
        await Service.propertyService.getPropertiesWithCriteria({
            addressNumber: { $eq: propertyData.addressNumber }, 
            addressName: { $eq: propertyData.addressName }, 
            postcode: { $eq: propertyData.postcode }})
        .then(existingProperty => {
            if (existingProperty.length != 0){
                errorMessage += 'An existing property has this address number, name and postcode combination.\n';
                flag = false;
            }
        });



        if (flag){
            Service.propertyService.createProperty(propertyData).then(propertyId => {
                // console.log(propertyId);
                if (propertyId){
                    res.status(200).send(propertyId);
                }
                else {
                    res.status(400).send('Property was not created - propertyId could not be captured.');
                } 
            });
        } else {
            res.status(400).send(errorMessage);
        }
    } else {
        res.status(400).send(errorMessage);
    }
    
        
    

   
    
}


//operator determines whether a single property is returned (propertyId), or multiple (userId and criteria).
const getProperty = (req, res) => {

    let operator = req.body.operator;
    let query = req.body.query;

    switch(operator){
        case "userId":
            Service.propertyService.getPropertiesWithUserId(query.userId).then(properties => {
                if (properties > 0){
                    res.status(200).send(properties);
                } else {
                    res.status(204).send();
                }
            })
        break;
        
        case "propertyId":
            Service.propertyService.getPropertyWithPropertyId(query.propertyId).then(property => {
                if (property != null){
                    res.status(200).send(property);
                } else {
                    res.status(204).send();
                }
            })    
        break;

        case "criteria":
            Service.propertyService.getPropertiesWithCriteria(query).then(propertyList => {
                if (propertyList.length > 0){
                    res.status(200).send(propertyList);
                } else {
                    res.status(204).send();
                }
            })
            break;
        }
   
    }


//Using propertyId is the only way to delete a property document.
const deleteProperty = (req, res) => {
    let propertyId = req.body.propertyId;
    let flag = false;
    Service.propertyService.deleteProperty(propertyId).then(deletionSuccess => {
        if (deletionSuccess){
            flag = true;
            res.status(200).send();
        }
        else {
            res.status(404).send();
        }   
    })
   
    if (flag){
        Service.applicationService.removeProperty(propertyId).then(appListingDeletionSuccess => {
            if (appListingDeletionSuccess){
            res.status(200).send();
            }
            else {
                res.status(404).send();
            }   
        })
    }
}


//propertyUpdate is a subsection of the property document schema and will replace its stored mirror-key. It must hold propertyId to identify the doc.
const updateProperty = (req, res) => {
    let propertyUpdate = req.body.propertyUpdate;
    Service.propertyService.updateProperty(propertyUpdate).then(updateSuccess => {
        if (updateSuccess){
            res.status(200).send();
        }
        else {
            res.status(404).send();
        }  
    })
   
}
module.exports = {createProperty, deleteProperty, getProperty, updateProperty}