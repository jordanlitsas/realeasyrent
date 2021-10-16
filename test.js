const { executionAsyncId } = require('async_hooks');

var chai = require('chai'), chaiHttp = require('chai-http'), expect = chai.expect;
chai.use(chaiHttp);
let Service = require('./services');




// //USER
// describe('POST /user', () => {
    
//     it('returns a 400 status and specific error message when firstName is empty', function(done) { 
//         chai.request('localhost:3000/test/user1')
//         .post('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(400);
//             expect(res.error.text).to.equal('User was not created - missing user information for firstName.')
//             done();                               
//         });
//     });

//     it('returns a 400 status and specific error message when lastName is empty', function(done) { 
//         chai.request('localhost:3000/test/user2')
//         .post('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(400);
//             expect(res.error.text).to.equal('User was not created - missing user information for lastName.')
//             done();                               
//         });
//     });
    
//     it('returns a 400 status and specific error message when postcode is empty', function(done) { 
//         chai.request('localhost:3000/test/user3')
//         .post('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(400);
//             expect(res.error.text).to.equal('User was not created - missing user information for postcode.')
//             done();                               
//         });
//     });
    
//     it('returns a 400 status and specific error message when email is empty', function(done) { 
//         chai.request('localhost:3000/test/user4')
//         .post('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(400);
//             expect(res.error.text).to.equal('User was not created - missing user information for email.')
//             done();                               
//         });
//     }); 
    
//     it('returns a 200 status and string response text when input values are not empty', function(done) { 
//         chai.request('localhost:3000/test/user5')
//         .post('/')
//         .end(function(err, res) {
//             expect(typeof(res.text)).to.equal("string");
//             expect(res).to.have.status(200);
//             done();                               
//         });
//     });
    
//     it('returns a 400 status and specific error message when email is in another user doc', function(done) { 
//         chai.request('localhost:3000/test/user6')
//         .post('/')
//         .end(function(err, res) {
//             expect(res.text).to.equal('User was not created - this email is associated with another user.');
//             expect(res).to.have.status(400);
//             done();                               
//         });
//     });
// });

// describe('GET /user', () => {

//     it('returns a 400 status and specific error message when the wrong operator string is used in the request body', function(done) { 
//         chai.request('localhost:3000/test/user1')
//         .get('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(400);
//             expect(res.error.text).to.equal('User query was not called - improper operator string.')
//             done();                               
//         });
//     });

//     it('returns a 204 status when the userId matches no user doc', function(done) { 
//         chai.request('localhost:3000/test/user2')
//         .get('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(204);
//             done();                               
//         });
//     });

//     it('returns a 200 status and user when called with userId',  function(done) { 
//         chai.request(`localhost:3000/test/user3`)
//         .get('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(200);
//             let doc = JSON.parse(res.text);
//             expect(doc.firstName).to.equal("Lisa");
//             expect(doc.lastName).to.equal("Simpson");
//             expect(doc.email).to.equal("lisa@live.com");
//             expect(doc.postcode).to.equal(1000);
//             done();                               
//         });
//     });
//     it('returns a 200 status and request user when queried with firstName (Lisa)',  function(done) { 
//         chai.request(`localhost:3000/test/user5`)
//         .get('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(200);
//             let doc = {
//                 firstName: 'Lisa',
//                 lastName: 'Simpson',
//                 postcode: 1000,
//                 email: "lisa@live.com",
//                 __v: 0
//               };

//             let comparisonDoc = JSON.parse(res.text);
//               for (var key in doc){
//                 expect(doc[key]).to.equal(comparisonDoc[key]);
//             }
    
//             done();                               
//         });
//     });

//     it('returns a 204 status when querying with a value not stored in any user doc',  function(done) { 
//         chai.request(`localhost:3000/test/user6`)
//         .get('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(204);  
//             done();                               
//         });
//     });

//     it('Returns a 204 status for searching all user docs for a non-existant value',  function(done) { 
//         chai.request(`localhost:3000/test/user7`)
//         .get('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(204);
//             done();                               
//         });
//     });
    
//     it('Returns a 200 status and array of users for empty multiple user query',  function(done) { 
//         chai.request(`localhost:3000/test/user8`)
//         .get('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(200);
//             expect(JSON.parse(res.text).length).to.gt(0);
//             done();                               
//         });
//     });
// });

// describe('DELETE /user', () => {

//     it('Returns a 400 status and specific error message when an incorrect userId is passed',  function(done) { 
//         chai.request(`localhost:3000/test/user1`)
//         .delete('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(400);
//             expect(res.text).to.equal('User not deleted - incorrect userId');
//             done();                               
//         });
//     });

//     it('Returns a 200 status when a correct userId is used to delete a user',  function(done) { 
//         chai.request(`localhost:3000/test/user2`)
//         .delete('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(200);
//             done();                               
//         });
//     });

//     it('Returns a 400 status when a bad userId is used to delete a user',  function(done) { 
//         chai.request(`localhost:3000/test/user3`)
//         .delete('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(400);
//             done();                               
//         });
//     });
// });

// describe('PUT /user', () => {
//     it('Returns a 400 status and specific message when an update fails', function(done) {
//         chai.request('localhost:3000/test/user1')
//         .put('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(400);
//             expect(res.error.text).to.equal('The user could not be updated.\n');
//             done();
//         })
//     })

//     it('Returns a 200 status when an update is successful',  function(done) {
//         chai.request('localhost:3000/test/user2')
//         .put('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(200);
//             done();
//         })
//     })
// })



// //RENTER PROFILE
// describe('POST /renter_profile', () => {
    
//     it ('Returns a 400 status and specific error message when a bad userId is used to reference a user', function(done){
//         chai.request('localhost:3000/test/rp1')
//         .post('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(400);
//             expect(res.error.text).to.equal('Could not create renter profile\nuserId is not associated with a user document.\n');
//             done()
//         })
//     })

//     it ('Returns a 200 status when successfuly inserting a new renterProfile', function(done){
//         chai.request('localhost:3000/test/rp2')
//         .post('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(200);
//             done()
//         })
//     })

//     it ('Returns a 400 status and specific error message when attempting to create a renterProfile with a userId already associated with a renterProfile', function(done){
//         chai.request('localhost:3000/test/rp2')
//         .post('/')
//         .end(function(err, res) {
//             expect(res.text).to.equal('Could not create renter profile\nuserId is associated with a renter profile.\n');
//             expect(res).to.have.status(400);
//             done()
//         })
//     })

//     it ('Returns a 400 status and specific error message when attempting to create a renterProfile with an incorrectly structured query', function(done){
//         chai.request('localhost:3000/test/rp3')
//         .post('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(400);
//             done()
//         })
//     })
// })

// describe('GET /renter_profile', () => {
//     it ('Returns a 400 status and specific error message when making an incorrectly structured query.', function(done){
//         chai.request('localhost:3000/test/rp1')
//         .get('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(400);
//             expect(JSON.parse(res.error.text).error).to.equal('Incorrect query structure.');
//             done()
//         })
//     });

//     it ('Returns a 400 status and specific error message when querying with a bad userId.', function(done){
//         chai.request('localhost:3000/test/rp2')
//         .get('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(400);
//             expect(res.error.text).to.equal('usedId not associated with a renter profile.');
//             done()
//         })
//     });
    
//     it ('Returns a 204 status when querying with criteria that matches no renter profile document.', function(done){
//         chai.request('localhost:3000/test/rp3')
//         .get('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(204);
//             done()
//         })
//     });

//     it ('Returns a 200 status and array of renter profile(s) when using a correct criteria query.', function(done){
//         chai.request('localhost:3000/test/rp4')
//         .get('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(200);
//             let result = JSON.parse(res.text);
//             expect(result.length).to.be.greaterThan(0);
//             expect(result instanceof Array).to.equal(true);
//             done()
//         })
//     });


//     it ('Returns a 200 status and single renter profile object when querying with correct userId.', function(done){
//         chai.request('localhost:3000/test/rp5')
//         .get('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(200);
//             let result = JSON.parse(res.text);
//             expect(Object.keys(result).length).to.be.greaterThan(0);
//             expect(typeof(result)).to.equal('object');
//             done()
//         })
//     });
// })

// describe('PUT /renter_profile', () => {
//     it ('Returns a 400 status and a specific error message when using an incorrect query structure', function(done){
//         chai.request('localhost:3000/test/rp1')
//         .put('/')
//         .end(function(err, res){
//             expect(res.status).to.equal(400);
//             expect(res.text).to.equal('Incorrect query structure.');
//             done();
//         })
//     })

//     it ('Returns a 400 status and a specific error message when the query querying with a bad userId', function(done){
//         chai.request('localhost:3000/test/rp2')
//         .put('/')
//         .end(function(err, res){
//             expect(res.status).to.equal(400);
//             expect(res.text).to.equal('userId not associated with a renter profile.');
//             done();
//         })
//     })

//     it ('Returns a 200 status when the update is successful', function(done){
//         chai.request('localhost:3000/test/rp3')
//         .put('/')
//         .end(function(err, res){
//             expect(res.status).to.equal(200);
//             done();
//         })
//     })
// })


// //PROPERTY
// describe('POST /property', () => {
//     it ('Returns a 400 status and specific error message when making an incorrectly structured query', function(done){
//         chai.request('localhost:3000/test/property1')
//         .post('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(400);
//             expect(res.error.text).to.equal('Property was not created\nIncorrect query structure.\n');
//             done()
//         })
//     })

//     it ('Returns a 400 status and specific error message when querying with a bad userId', function(done){
//         chai.request('localhost:3000/test/property2')
//         .post('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(400);
//             expect(res.error.text).to.equal('Property was not created\nuserId was not associated with any user document.\n');
//             done();
//         })
//     })

//     it ('Returns a 200 status and propertyId when successfully creating a property', function(done){
//         chai.request('localhost:3000/test/property3')
//         .post('/')
//         .end(function(err, res) {
//             expect(res.text.length).to.equal(24);
//             expect(res).to.have.status(200);
//             done();
//         })
//     })
    
//     it ('Returns a 400 status and specific error message when property has existing addressNumber, addressName, and postcode combination', function(done){
//         chai.request('localhost:3000/test/property3')
//         .post('/')
//         .end(function(err, res) {
//             expect(res.error.text).to.equal('Property was not created\nAn existing property has this address number, name and postcode combination.\n');
//             expect(res).to.have.status(400);
//             done();
//         })
//     })
// })

// describe('GET /property', () => {

//     it('Returns a 400 status and specific error message when making an incorrectly structured query', function(done){
//         chai.request('localhost:3000/test/property1')
//         .get('/')
//         .end(function(err, res) {
//             expect(res.status).to.equal(400);
//             expect(res.text).to.equal('Incorrectly structured query.')
//             done();                               
//         });
//     })

//     it('Returns a 204 status when querying with a bad userId', function(done){
//         chai.request('localhost:3000/test/property2')
//         .get('/')
//         .end(function(err, res) {
//             expect(res.status).to.equal(204);
//             done();                               
//         });
//     })

//     it('Returns a 200 status and array of properties when querying with userId', function(done){
//         chai.request('localhost:3000/test/property3')
//         .get('/')
//         .end(function(err, res) {
//             let result = JSON.parse(res.text);
//             expect(result instanceof Array).to.equal(true);
//             expect(res.status).to.equal(200);
//             done();                               
//         });
//     })

//     it('Returns a 204 status when querying with a bad propertyId', function(done){
//         chai.request('localhost:3000/test/property4')
//         .get('/')
//         .end(function(err, res) {
//             expect(res.status).to.equal(204);
//             done();                               
//         });
//     })

//     it('Returns a 200 status and property object when querying with propertyId', function(done){
//         chai.request('localhost:3000/test/property5')
//         .get('/')
//         .end(function(err, res) {
//             expect(typeof(JSON.parse(res.text))).to.equal('object');
//             expect(res.status).to.equal(200);
//             done();                               
//         });
//     })

//     it('Returns a 400 status and specific error message when querying with a non-object argument', function(done){
//         chai.request('localhost:3000/test/property6')
//         .get('/')
//         .end(function(err, res) {
//             expect(res.status).to.equal(400);
//             expect(res.error.text).to.equal('Search by criteria must pass an object query.');
//             done();                               
//         });
//     })

//     it('Returns a 204 status when no properties are associated with a criteria query', function(done){
//         chai.request('localhost:3000/test/property7')
//         .get('/')
//         .end(function(err, res) {
//             expect(res.status).to.equal(204);
//             done();                               
//         });
//     })

    
//     it('Returns a 200 status and array of properties with a criteria query', function(done){
//         chai.request('localhost:3000/test/property8')
//         .get('/')
//         .end(function(err, res) {
//             let result = JSON.parse(res.text);
//             expect(result instanceof Array).to.equal(true);
//             expect(res.status).to.equal(200);            
//             done();                               
//         });
//     })
// })

// describe('DELETE /property', () => {
//     it('Returns a 200 status if property only is deleted and returns {propertyDeleted: true, applicationDeleted: false}',  function(done) { 
//         chai.request(`localhost:3000/test/property1`)
//         .delete('/')
//         .end(function(err, res) {
//             let result = JSON.parse(res.text);
//             expect(res).to.have.status(200);
//             expect(result.propertyDeleted).to.equal(true);
//             expect(result.applicationDeleted).to.equal(false);
//             done();                               
//         });
//     });

    

//     it('Returns a 200 status if property and application is deleted and returns {propertyDeleted: true, applicationDeleted: true}',  function(done) { 
//         chai.request(`localhost:3000/test/property2`)
//         .delete('/')
//         .end(function(err, res) {
//             let result = JSON.parse(res.text);
//             expect(res).to.have.status(200);
//             expect(result.propertyDeleted).to.equal(true);
//             expect(result.applicationDeleted).to.equal(true);
//             done();                               
//         });
//     });

//     it('Returns a 400 status if attempting to delete property with bad propertyId and returns {propertyDeleted: false, applicationDeleted: false}', function(done) { 
//         chai.request(`localhost:3000/test/property3`)
//         .delete('/')
//         .end(function(err, res) {
//             let result = JSON.parse(res.text);

//             expect(res).to.have.status(400);
//             expect(result.propertyDeleted).to.equal(false);
//             expect(result.applicationDeleted).to.equal(false);
//             done();                               
//         });
//     });

// })

// describe('PUT /property', () => {
//     it ('Returns a 400 status and a specific error message when using an incorrect query structure', function(done){
//         chai.request('localhost:3000/test/property1')
//         .put('/')
//         .end(function(err, res){
//             expect(res.status).to.equal(400);
//             expect(res.text).to.equal('Incorrect query structure');
//             done();
//         })
//     })

//     it ('Returns a 200 status when successfuly updating property', function(done){
//         chai.request('localhost:3000/test/property2')
//         .put('/')
//         .end(function(err, res){
//             expect(res.status).to.equal(200);
//             done();
//         })
//     })
// })


//APPLICATION SETUP
describe('Database Cleaning', () => {

    it('Cleans the database for the next round of testing', function(done){
        chai.request('localhost:3000/test/cleanDB')
        .post('/')
        .end(function(err, res) {
            expect(res.text).to.equal('Complete')
            done();                               
        });
    })
});


describe('Setup database for application testing', () => {
    it('Creates docs to allow for applications (requires active property (1) and user (2: landlord and renter)) ', function(done){
        chai.request('localhost:3000/test/setupForApp')
        .post('/')
        .end(function(err, res) {
            expect(res.text).to.equal('Complete')
            done();                               
        });
    })
})




//APPLICATION

describe('POST /active_application', () => {
    
    it ('Returns a 400 status and specific error message when a bad userId and propertyId is given', function(done){
        chai.request('localhost:3000/test/app1')
        .post('/')
        .end(function(err, res) {
            expect(res.text).to.equal('Application was not created\nuserId is not associated with a user\nuserId is not associated with a renter profile\npropertyId is not associated with a property');
            expect(res.status).to.equal(400);
            done();
        })
    })

    it ('Returns a 400 status and specific error message when a bad userId is given', function(done){
        chai.request('localhost:3000/test/app2')
        .post('/')
        .end(function(err, res) {
            expect(res.text).to.equal('Application was not created\nuserId is not associated with a user\nuserId is not associated with a renter profile\n');
            expect(res.status).to.equal(400);
            done();
        })
    })


    it ('Returns a 400 status and specific error message when a bad propertyId is given', function(done){
        chai.request('localhost:3000/test/app3')
        .post('/')
        .end(function(err, res) {
            expect(res.text).to.equal('Application was not created\npropertyId is not associated with a property');
            expect(res.status).to.equal(400);
            done();
        })
    })
    it ('Returns a 200 status when successfuly creating an application with good userId and propertyId', function(done){
        chai.request('localhost:3000/test/app4')
        .post('/')
        .end(function(err, res) {
            expect(res.status).to.equal(200);
            done();
        })
    })

    it ('Returns a 400 status and specific error message when creating an application that is already listed (use updated instead)', function(done){
        chai.request('localhost:3000/test/app4')
        .post('/')
        .end(function(err, res) {
            expect(res.text).to.equal('Application was not created\nThere are current applications for that property - update active_applications instead.\n');
            expect(res.status).to.equal(400);
            done();
        })
    })
});


// describe('GET /active_application', () => {
//     it ('Returns a 204 status and specific error message when querying with a bad propertyId', function(done){
//         chai.request('localhost:3000/test/app1')
//         .get('/')
//         .end(function(err, res) {
//             expect(res.status).to.equal(204);
//             done();
//         })
//     })

//     it ('Returns a 202 status and s', function(done){
//         chai.request('localhost:3000/test/app2')
//         .get('/')
//         .end(function(err, res) {
//             let result = JSON.parse(res.text);
//             console.log(result);
//             expect(res.status).to.equal(200);
//             done();
//         })
//     })
// })

























// describe('Database Cleaning', () => {

//     it('Cleans the database for the next round of testing', function(done){
//         chai.request('localhost:3000/test/cleanDB')
//         .post('/')
//         .end(function(err, res) {
//             expect(res.text).to.equal('Complete')
//             done();                               
//         });
//     })
// });