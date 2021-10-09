var chai = require('chai'), chaiHttp = require('chai-http'), expect = chai.expect;
chai.use(chaiHttp);
var url = 'http://localhost:3000/test';

//USERS
describe('create a new user', () => {

    

    it('returns a 400 status and specific text message when firstName is empty', function(done) { 
        chai.request('localhost:3000/test/user')
        .post('/')
        .end(function(err, res) {
            
            expect(res).to.have.status(400);
            done();                               
        });
      });
});
