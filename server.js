//Server template credit to Alessio Bonti - found at: https://github.com/alexbonti/deakin-crowds/blob/master/server.js
var dbConnection = require('./services/database/dbConnection')
var express = require("express");
var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let http = require('http').createServer(app);
let io = require('socket.io')(http);

var sockets = require('./util/sockets');
sockets.connect(io);




var port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(__dirname + '/public'));


let userRoute = require('./routes/users/user');
let propertyRoute = require('./routes/users/landlord/property');
let renterProfileRoute = require('./routes/users/renter/renterProfile');
let applicationRoute = require('./routes/transactions/application');
let applicationRequirementSorter = require ('./routes/transactions/applicationRequirementSorter');


app.use('/user', userRoute);
app.use('/property', propertyRoute);
app.use('/renter_profile', renterProfileRoute);
app.use('/application', applicationRoute)
app.use('/filter/application_requirements', applicationRequirementSorter);


let Service = require('./services')
let Controller = require('./controllers')
let db = require('./services/database')

const test = () => {
    try {
      Service.userService.getMultipleUsersWithPersonalInfoQuery({}).then( async users => {
        users.forEach (async user => {
            let id = user._id.toString();          
            await Service.userService.deleteUserWithUserId(id);
        })
      })
   } 
  catch{}

  try{
    Service.renterProfileService.getRenterProfilesMatchingCriteria({}).then( async rps => {
      rps.forEach(async rp => {
        let id = rp._id.toString();
        await db.renterProfileDocConnection.deleteRenterProfileWithId(id);
      })
    })
  
  }
  catch{}

  try{
    Service.propertyService.getPropertiesWithCriteria({}).then( async properties => {
      properties.forEach(async prop => {
        let id = prop._id.toString();
        await db.propertyDocConnection.deleteProperty(id);
      })
    })
  
  }
  catch{}
    
  return true;

}

app.post('/test/:api', async (req, res) => {
    let api = req.params.api;
    let tempUserId = "";
    switch(api){

      case "cleanDB":
        await test();
        res.send('Complete');
      break;

      case 'user1':
          req.body = {
            firstName: "",
            lastName: "Simpson",
            email: "eatmy@shorts.com",
            postcode: 3000
          };
          
          Controller.userController.createUser(req, res);
        break;
  
      case 'user2':
        req.body = {
          firstName: "Bart",
          lastName: "",
          email: "eatmy@shorts.com",
          postcode: 3000
        };

        Controller.userController.createUser(req, res);
      break;

      case 'user3':
        req.body = {
          firstName: "Bart",
          lastName: "Simpson",
          email: "eatmy@shorts.com",
          postcode: ""
        };

        Controller.userController.createUser(req, res);
      break;
      
      case 'user4':
        req.body = {
          firstName: "Bart",
          lastName: "Simpson",
          email: "",
          postcode: 3000
        };

        Controller.userController.createUser(req, res);
      break;

      case 'user5':
        req.body = {
          firstName: "Bart",
          lastName: "Simpson",
          email: "eatmy@shorts.com",
          postcode: 3000
        };
        Controller.userController.createUser(req, res);
      break;

      case 'user6':
        req.body = {
          firstName: "Bart",
          lastName: "Simpson",
          email: "eatmy@shorts.com",
          postcode: 3000
        };

        Controller.userController.createUser(req, res);
      break;

      case 'rp1':
        req.body = {
          "renterProfileData": {
            "userId": "a bad user id",
            "employment": {
                "employer": "self-employed",
                "lengthOfEmployment": "2 months",
                "position": "", 
                "monthlyIncome": 1000
            },
            "personalReferences": [
                {
                    "name": "Alma Forsyth",
                    "contactNumber": 10000000,
                    "email": "y@hoo.com",
                    "relationship": "Cocaine Dealer"
                }
            ],
            "professionalReferences": [
                {
                    "name": "Pablo Escobar",
                    "contactNumber": 1800000000,
                    "email": "stickylover@live.com.au",
                    "relationship": "Confidant"
                }
            ],
            "pets": [
                {
                    "species": "dog",
                    "breed": "spoodle",
                    "size": "medium",
                    "age": 8
                },
                {
                    "species": "dog",
                    "breed": "pound special",
                    "size": "medium",
                    "age": 10
                }
            ], 
            "children": 2,
            "rentalHistory": [
                {
                    "address": "90 the avenue, parkville 3052",
                    "landlordName": "Jessica Alba",
                    "landlordEmail": "Parasite420@gmail.com",
                    "landlordContactNumber": 666,
                    "lengthOfTenancy": 1,
                    "bondConditions": {"bondReturned": true, "reasonBondWitheld": "", "amountWitheld": 0},
                    "evicted": false,
                    "rentalAgreementBroken": false
                }
            ],
            "smoker": false,
            "preferredMoveInDate": "2022.02.02",
            "committedOfCrime": false}
        }

        Controller.renterProfileController.createRenterProfile(req, res)


      break;

      case 'rp2':
        userId = await Service.userService.getUserWithPersonalInfoQuery({email: "evilbart@live.com"});
        userId = userId._id.toString();
        req.body = {
          "renterProfileData": {
            "userId": userId,
            "employment": {
                "employer": "self-employed",
                "lengthOfEmployment": "2 months",
                "position": "", 
                "monthlyIncome": 1000
            },
            "personalReferences": [
                {
                    "name": "Alma Forsyth",
                    "contactNumber": 10000000,
                    "email": "y@hoo.com",
                    "relationship": "Cocaine Dealer"
                }
            ],
            "professionalReferences": [
                {
                    "name": "Pablo Escobar",
                    "contactNumber": 1800000000,
                    "email": "stickylover@live.com.au",
                    "relationship": "Confidant"
                }
            ],
            "pets": [
                {
                    "species": "dog",
                    "breed": "spoodle",
                    "size": "medium",
                    "age": 8
                },
                {
                    "species": "dog",
                    "breed": "pound special",
                    "size": "medium",
                    "age": 10
                }
            ], 
            "children": 2,
            "rentalHistory": [
                {
                    "address": "90 the avenue, parkville 3052",
                    "landlordName": "Jessica Alba",
                    "landlordEmail": "Parasite420@gmail.com",
                    "landlordContactNumber": 666,
                    "lengthOfTenancy": 1,
                    "bondConditions": {"bondReturned": true, "reasonBondWitheld": "", "amountWitheld": 0},
                    "evicted": false,
                    "rentalAgreementBroken": false
                }
            ],
            "smoker": false,
            "preferredMoveInDate": "2022.02.02",
            "committedOfCrime": false}
        }
        Controller.renterProfileController.createRenterProfile(req, res);
      break;

      case 'rp3':
        userId = await Service.userService.getUserWithPersonalInfoQuery({email: "evilbart@live.com"});
        userId = userId._id;
        req.body = {
          "wrong query key": { "userId": userId }
        };
        Controller.renterProfileController.createRenterProfile(req, res)
      break;
    
      case 'property1':
        Controller.propertyController.createProperty(req, res);
      break;

      case 'property2':
        req.body = {property: {userId: 'a bad userId'}};
        Controller.propertyController.createProperty(req, res);
      break;

      case 'property3':
        tempUserId = await Service.userService.getUserWithPersonalInfoQuery({email: "lisa@live.com"});
        tempUserId = tempUserId._id.toString();

       
        req.body = {
          "property": {
             "userId": tempUserId,
             "applicantCriteria": 
                 [
                     {"nonFlexible": {}},
                     {"flexible": {}}
     
                 ],
             "availabledate": "2022.01.01", 
             "bathrooms": 3,
             "bedrooms": 4,
             "commuteProfile": {
                 "drive": 7,
                 "publicTransport": 7,
                 "walk": 3
             },
             "demographics": "Cis white toxic racist homophobic possum hating men",
             "energyLevels": 6,
             "hvac": "Internal heating and 3 airconditioners",
             "housingType": "apartment",
             "indoorFeatures": "hardwood floors",
             "keywords": "luxury",
             "location": "Melbourne",
             "marketValue": 670000,
             "nbn": "FTTP",
             "outdoorFeatures": "balcony",
             "parking": "underground",
             "petsAllowed": false,
             "streetNumberAndName": "1/250 Nicholson Street",
             "postcode": 4810,
             "stateOrTerritory": "Vic",
             "rentAmount": 710,
             "rentFrequency": "week"
          }
     };

     Controller.propertyController.createProperty(req, res);
    break;
    
    }
});
  
  
app.get('/test/:api', async (req, res) => {
  let api = req.params.api;
  let tempUserId = "", tempPropertyId = "";
  switch(api){
    
    case 'user1':
      req.body = {
        operator: "",
        query:""
      };

      Controller.userController.getUser(req, res);
    break;

    case 'user2':
      req.body = {
        operator: "userId",
        query:"false id"
      };

      Controller.userController.getUser(req, res);
    break;

    case 'user3':
      userId = await Service.userService.createUser({firstName: "Lisa", lastName: "Simpson", postcode: 1000, email: "lisa@live.com"});
      
      req.body = {
        operator: "userId",
        query: userId
      };

      Controller.userController.getUser(req, res);
    break;

    case 'user4':  
      req.body = {
        operator: "userId",
        query: "a bad userId"
      };

      Controller.userController.getUser(req, res);
    break;

    case 'user5':  
      req.body = {
        operator: "personalInfoQuery",
        query: {firstName: "Lisa"}
      };

      Controller.userController.getUser(req, res);
    break;

    case 'user6':  
      req.body = {
        operator: "personalInfoQuery",
        query: {firstName: "Moe"}
      };

      Controller.userController.getUser(req, res);
    break;

    case 'user7':  
      req.body = {
        operator: "multipleUsers",
        query: {firstName: "Moe"}
      };

      Controller.userController.getUser(req, res);
    break;

    case 'user8':  
      req.body = {
        operator: "multipleUsers",
        query: {}
      };

      Controller.userController.getUser(req, res);
    break;

    case 'rp1':
      req.body = {
        operator: "wrong operator",
        query: "wrong query"
      };
      
      Controller.renterProfileController.getRenterProfile(req, res);
      break;

    case 'rp2':
      req.body = {
        operator: 'userId',
        query: 'a bad userId'
      };

      Controller.renterProfileController.getRenterProfile(req, res);
      break;
      
    case 'rp3':
      req.body = {
        operator: 'criteria',
        query: {children: -1000}
      };

      Controller.renterProfileController.getRenterProfile(req, res);
      break;

    case 'rp4':
        req.body = {
          operator: 'criteria',
          query: {children: 2}
        };

        Controller.renterProfileController.getRenterProfile(req, res);
      break;
    
    case 'rp5':
      userId = await Service.userService.getUserWithPersonalInfoQuery({email: "evilbart@live.com"});
      userId = userId._id.toString();
      req.body = {
        operator: 'userId',
        query: userId
      };

      Controller.renterProfileController.getRenterProfile(req, res);
    break;   
    
    case 'property1':
      req.body = {operator: 'bad operator', query: 400};
      Controller.propertyController.getProperty(req, res);
    break;

    case 'property2':
      req.body = {operator: 'userId', query: 'a bad userId'};
      Controller.propertyController.getProperty(req, res);
    break;

    case 'property3':
      tempUserId = await Service.userService.getUserWithPersonalInfoQuery({email: 'lisa@live.com'});
      tempUserId = tempUserId._id.toString();
      req.body = {operator: 'userId', query: tempUserId};
      Controller.propertyController.getProperty(req, res);
    break;

    case 'property4':
      req.body = {operator: 'propertyId', query: 'a property userId'};
      Controller.propertyController.getProperty(req, res);
    break;

    case 'property5':
      tempPropertyId = await Service.propertyService.getPropertiesWithCriteria({});
      tempPropertyId = tempPropertyId[0]._id.toString();
      req.body = {operator: 'propertyId', query: tempPropertyId};
      Controller.propertyController.getProperty(req, res);
    break;

    case 'property6':
      req.body = {operator: 'criteria', query: 'a bad criteria query'};
      Controller.propertyController.getProperty(req, res);
    break;

    case 'property7':
      req.body = {operator: 'criteria', query: {energyLevels: -50}};
      Controller.propertyController.getProperty(req, res);
    break; 
    
    case 'property8':
      req.body = {operator: 'criteria', query: {energyLevels: 6}};
      Controller.propertyController.getProperty(req, res);
    break;


    }
});

app.delete('/test/:api', async (req, res) => {
  let api = req.params.api;
  let tempPropertyId = ""; 
  let tempUserId = ""; 
  let application = "";
  let temp = "";

  switch(api){
    case "user1":
      req.body = {userId: 'a bad id'};
      Controller.userController.deleteUser(req, res);
    break;

    case "user2":
      temp = await db.userDocConnection.insertUser({
        firstName: "Moe",
        lastName: "Sizlak",
        postcode: 3150,
        email: "moest@vaern.com"
      });
      req.body = {userId: temp._id};
      Controller.userController.deleteUser(req, res);
    break;

    case "user3": 
      Controller.userController.deleteUser(req, res);
    break;
  
    case "property1":
      
      tempPropertyId = await Service.propertyService.getPropertiesWithCriteria({});
      tempPropertyId = tempPropertyId[0]._id.toString();
      req.body = {propertyId: tempPropertyId};
      Controller.propertyController.deleteProperty(req, res);
    break;   

    case "property2":
      tempUserId = await Service.userService.getUserWithPersonalInfoQuery({email: "lisa@live.com"});
      tempUserId = tempUserId._id.toString();

     
      temp = {
        "property": {
           "userId": tempUserId,
           "applicantCriteria": 
               [
                   {"nonFlexible": {}},
                   {"flexible": {}}
   
               ],
           "availabledate": "2022.01.01", 
           "bathrooms": 3,
           "bedrooms": 4,
           "commuteProfile": {
               "drive": 7,
               "publicTransport": 7,
               "walk": 3
           },
           "demographics": "Cis white toxic racist homophobic possum hating men",
           "energyLevels": 6,
           "hvac": "Internal heating and 3 airconditioners",
           "housingType": "apartment",
           "indoorFeatures": "hardwood floors",
           "keywords": "luxury",
           "location": "Melbourne",
           "marketValue": 670000,
           "nbn": "FTTP",
           "outdoorFeatures": "balcony",
           "parking": "underground",
           "petsAllowed": false,
           "streetNumberAndName": "1/250 Nicholson Street",
           "postcode": 4810,
           "stateOrTerritory": "Vic",
           "rentAmount": 710,
           "rentFrequency": "week"
        }
   };

    await Service.propertyService.createProperty(temp);


    tempPropertyId = await Service.propertyService.getPropertiesWithCriteria({});
    tempPropertyId = tempPropertyId[0]._id.toString();


    temp = {
      firstName: "renter",
      lastName: "renter",
      postcode: 0101,
      email: "renter@live.com"
    };



    tempUserId = await Service.userService.createUser(temp);
    tempUserId = tempUserId._id.toString();

    temp = {userId: tempUserId, propertyId: tempPropertyId};

    await Service.applicationService.createApplication(temp);

    req.body = {propertyId: tempPropertyId};
    Controller.propertyController.deleteProperty(req, res);
  break;

    case "property3":
      req.body = {propertyId: "a bad id"}
      Controller.propertyController.deleteProperty(req, res);
  }

});

app.put('/test/:api', async (req, res) => {
  let api = req.params.api;
  let tempUserId = "";
  switch(api){
    case "user1":
      req.body = {
        userUpdated: {
        _id: "a bad id",
        firstName: "Homer"
        }
      };
      Controller.userController.updateUser(req, res);
    break;

    case "user2":

      let bartsUserId = await Service.userService.getUserWithPersonalInfoQuery({firstName: "Bart", lastName: "Simpson"});
      bartsUserId = bartsUserId._id.toString();

      req.body = {
        userUpdate: {
        _id: bartsUserId,
        firstName: "Evil Bart",
        email: "evilbart@live.com"

        }
      };
      Controller.userController.updateUser(req, res);
    break;
  
    case 'rp1': 
      req.body = {incorrectQueryStructure: {}};
      Controller.renterProfileController.updateRenterProfile(req, res);
    break;

    case 'rp2':
      req.body = {
          updatedRenterProfileData: {
            userId: 'a bad userId',
            monthlyIncome: 0
          }
      };
      Controller.renterProfileController.updateRenterProfile(req, res);
    break;

    case 'rp3':
      userId = await Service.userService.getUserWithPersonalInfoQuery({email: "evilbart@live.com"});
      tempUserId = userId._id.toString();
      req.body = {
          updatedRenterProfileData: {
            userId: tempUserId,
            employment: {monthlyIncome: 1000000}
          }
      };
      Controller.renterProfileController.updateRenterProfile(req, res);
    break;
  }
})

http.listen(port,()=>{
  console.log("Listening on port ", port);
});