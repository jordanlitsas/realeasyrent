// let database = require('./dbConnection');
let database = require('../../database/renterProfileDocConnection');




const deleteRenterProfile = (userId) => {
    try {
        let flag = database.deleteRenterProfile(userId);
        return flag;
    }

    catch {
        return false;
    }
}



const createRenterProfile = (appData) => {

    try { 
        let flag = database.insertRenterProfile(appData); //rental app cannot be made before user
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


module.exports = {createRenterProfile, deleteRenterProfile};