let Service = require('../../../services');

const createApplication = (req, res) => { 
    let data = req.query;    

    res.send(data);

   /*
--- 16/09/21: Current schema for rental application

--- Current req.query structure:
    {
        userID , 
        employment: {employer, lengthOfEmployment, position, income},
        references: [
                        { [ personal: {name, contactNumber, email, relationship} ] },
                        { [ professional: [ {name: contactNumber, email, relationship} ] }   
                    ],
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
}







module.exports = {getApcreateApplicationplication}