process.env.NODE_ENV = 'test';

// Importing necessary modules
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

// Import root
const server = require('../src/server/index');

chai.use(chaiHttp);

describe('routes : index', () => {
  describe('GET /', () => {
    it('should return json', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.eql('success');
        res.body.message.should.eql('hello, world!');
        done();
      });
    });
  });
});