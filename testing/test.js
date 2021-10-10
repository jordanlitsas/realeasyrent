const { executionAsyncId } = require('async_hooks');

var chai = require('chai'), chaiHttp = require('chai-http'), expect = chai.expect;
chai.use(chaiHttp);
var url = 'http://localhost:3000/test';

//USER
describe('create a new user', () => {

    
    it('returns a 400 status and specific error message when firstName is empty', function(done) { 
        chai.request('localhost:3000/test/user1')
        .post('/')
        .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.error.text).to.equal('User was not created - missing user information for firstName.')
            done();                               
        });
    });

    it('returns a 400 status and specific error message when lastName is empty', function(done) { 
        chai.request('localhost:3000/test/user2')
        .post('/')
        .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.error.text).to.equal('User was not created - missing user information for lastName.')
            done();                               
        });
    });
    
    it('returns a 400 status and specific error message when postcode is empty', function(done) { 
        chai.request('localhost:3000/test/user3')
        .post('/')
        .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.error.text).to.equal('User was not created - missing user information for postcode.')
            done();                               
        });
    });
    
    it('returns a 400 status and specific error message when email is empty', function(done) { 
        chai.request('localhost:3000/test/user4')
        .post('/')
        .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.error.text).to.equal('User was not created - missing user information for email.')
            done();                               
        });
    }); 
    
    it('returns a 200 status and string response text when input values are not empty', function(done) { 
        chai.request('localhost:3000/test/user5')
        .post('/')
        .end(function(err, res) {
            expect(typeof(res.text)).to.equal("string");
            expect(res).to.have.status(200);
            done();                               
        });
    });
    
    it('returns a 400 status and specific error message when email is in another user doc', function(done) { 
        chai.request('localhost:3000/test/user5')
        .post('/')
        .end(function(err, res) {
            expect(res.text).to.equal('User was not created - this email is associated with another user.');
            expect(res).to.have.status(400);
            done();                               
        });
    });
});


describe('get user(s)', () => {

    it('returns a 400 status and specific error message when the wrong operator string is used in the request body', function(done) { 
        chai.request('localhost:3000/test/user1')
        .get('/')
        .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.error.text).to.equal('User query was not called - improper operator string.')
            done();                               
        });
    });

    it('returns a 204 status when the userId matches no user doc', function(done) { 
        chai.request('localhost:3000/test/user2')
        .get('/')
        .end(function(err, res) {
            expect(res).to.have.status(204);
            done();                               
        });
    });

    it('returns a 200 status and user when called with userId',  function(done) { 
        chai.request(`localhost:3000/test/user3`)
        .get('/')
        .end(function(err, res) {
            expect(res).to.have.status(200);
            let doc = JSON.parse(res.text);
            expect(doc.firstName).to.equal("Lisa");
            expect(doc.lastName).to.equal("Simpson");
            expect(doc.email).to.equal("lisa's email");
            expect(doc.postcode).to.equal(1000);
            done();                               
        });
    });
    it('returns a 200 status and request user when queried with firstName (Lisa)',  function(done) { 
        chai.request(`localhost:3000/test/user5`)
        .get('/')
        .end(function(err, res) {
            expect(res).to.have.status(200);
            let doc = {
                firstName: 'Lisa',
                lastName: 'Simpson',
                postcode: 1000,
                email: "lisa's email",
                __v: 0
              };

            let comparisonDoc = JSON.parse(res.text);
              for (var key in doc){
                expect(doc[key]).to.equal(comparisonDoc[key]);
            }
    
            done();                               
        });
    });

    it('returns a 204 status when querying with a value not stored in any user doc',  function(done) { 
        chai.request(`localhost:3000/test/user6`)
        .get('/')
        .end(function(err, res) {
            expect(res).to.have.status(204);  
            done();                               
        });
    });

    it('Returns a 204 status for searching all user docs for a non-existant value',  function(done) { 
        chai.request(`localhost:3000/test/user7`)
        .get('/')
        .end(function(err, res) {
            expect(res).to.have.status(204);
            done();                               
        });
    });
    
    it('Returns a 200 status and array of users for empty multiple user query',  function(done) { 
        chai.request(`localhost:3000/test/user8`)
        .get('/')
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(JSON.parse(res.text).length).to.gt(0);
            done();                               
        });
    });
});

describe('delete user', () => {

    it('Returns a 400 status and specific error message when an incorrect userId is passed',  function(done) { 
        chai.request(`localhost:3000/test/user1`)
        .delete('/')
        .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('User not deleted - incorrect userId');
            done();                               
        });
    });

    it('Returns a 200 status when a correct userId is used to delete a user',  function(done) { 
        chai.request(`localhost:3000/test/user2`)
        .delete('/')
        .end(function(err, res) {
            expect(res).to.have.status(200);
            done();                               
        });
    });

    it('Returns a 400 status when a bad userId is used to delete a user',  function(done) { 
        chai.request(`localhost:3000/test/user3`)
        .delete('/')
        .end(function(err, res) {
            expect(res).to.have.status(400);
            done();                               
        });
    });
});

describe('update user', () => {
    it('Returns a 400 status and specific message when an update fails', function(done) {
        chai.request('localhost:3000/test/user1')
        .put('/')
        .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.error.text).to.equal('The user was not updated.');
            done();
        })
    })

    it('Returns a 200 status when an update is successful', function(done) {
        chai.request('localhost:3000/test/user2')
        .put('/')
        .end(function(err, res) {
            expect(res).to.have.status(200);
            done();
        })
    })
})


