process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');

chai.should();
chai.use(chaiHttp);

describe('Test cases for REST API', function() {

before(function(done) {
  let server = require('../app_dynamic');
  done();
})

after(function(done) {
  mongoose.disconnect();
  done();
})

describe('POST /users', function() {
  this.timeout(10000);
  it('It should post a new user', function(done) {
    const newUser = {
      username: 'TestUser',
      password: '1234',
      devices: ['UserMAC'],
      age: 18
    };
    chai.request('http://0.0.0.0:5000')
      .post('/users')
      .set('content-type', 'application/json')
      .send(newUser)
      .end(function(err, res) {
        if (err) return done(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('username');
        done();
      });
  });
});

describe('POST /users and then retrieves all users GET /users', function() {
  this.timeout(10000);
  it('It should post a new user and then GET all users', function(done) {
    const newUser2 = {
      username: 'TestUser2',
      password: '1234',
      devices: ['UserMAC'],
      age: 18
    };
    chai.request('http://0.0.0.0:5000')
      .post('/users')
      .set('content-type', 'application/json')
      .send(newUser2)
      .end((err, res) => {
        if (err) return done(err);
        chai.request('http://0.0.0.0:5000')
          .get('/users')
          .end((err, res) => {
            if (err) return done(err);
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eq(2);
            done();
          });
      });
  });
});

});
