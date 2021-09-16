// let database = require('./dbConnection');
let database = require('../../../services/database/userDocConnection');




const deleteApplication = (userId) => {
    try {
        let userDoc = database.getUser(userId);

        let i = 0;
        for (i; i < userDoc.profile[i]; i++){
            if (typeof(userDoc.profile[i].rentalApplication) != 'undefined'){
                userDoc.profile.splice(i, 1);
            }
        }

        let flag = database.updateUser(userDoc);
        return flag;
    }

    catch {
        return false;
    }
}


/*
    Capture users' id
    Get the user's document from db with their id
    push their new rentalApplication into their profile array
    update their document with the new rentalApplication : appData element as rental application stored in user
    return false if there was an issue with db update.
*/
const createApplication = (appData) => {

    try { 
        let userId = appData.userId;

        let userDoc = database.getUser(userId);

        userDoc.profile.push({rentalApplication: appData});

        let flag = database.updateUser(userDoc); //rental app cannot be made before user

        return flag;
    }
    catch {
        return false;
    }
    
}

/*
--- 16/09/21: Current schema for rental application

--- Current req.query structure:
    {
        userId , 
        employment: {employer, lengthOfEmployment, position, income},
        personalreferences: [ {name, contactNumber, email, relationship } ]
        professionalReferences: [ {name: contactNumber, email, relationship}  } ]  
        pets: [ {species, breed, size, age} ],
        children: [<age>],
        rentalHistory: [ 
                            {
                                address, landlord/propertyManagerName, landlord/propertyManagerEmail, landlord/propertyManagerContactNumber, lengthOfTenancy, reasonLeaving,
                                bondConditions: {bondReturned : <boolean>, reasonForBondWithheld : <string>, amountWitheld : <integer>},
                                evicted : <boolean>, rentalAgreementBroken : <boolean>
                            } 
                        ],
        smoker : <boolean>,
        preferredMoveInDate : <date OR immediate>,
        commitedOfCrime : <boolean>
    }
 */


module.exports = {createApplication, deleteApplication};