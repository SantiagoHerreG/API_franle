process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');

/* Chai for doing the asserts */
chai.should();
chai.use(chaiHttp);

/* When imported the server is started */
let server = require('../app_dynamic');

describe('Test cases for REST API', function() {

  /* Mongoose connection is closed */
  after(function(done) {
    mongoose.disconnect();
    server.close();
    done();
  })

  /* Test1: posts a new user to the mongoDB using the local API server */
  describe('POST /users', function() {
    this.timeout(10000);
    it('It should post a new user', function(done) {
      const newUser = {
        username: 'test',
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

  /* Test2: posts a new user to the mongoDB using the local API server
  and retrieves all users in the mondoDB and then erases the users added */
  describe('POST user and then retrieves all users and then delete new user', function() {
    this.timeout(10000);
    it('It should post a new user and then GET all users', function(done) {
      const newUser2 = {
        username: 'test2',
        password: '1234',
        devices: ['UserMAC'],
        age: 18
      };
      chai.request('http://0.0.0.0:5000')
        .get('/users')
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.body.should.be.a('array');
          length1 = res.body.length;
        
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
                  res.body.length.should.be.eq(length1 + 1);

                  chai.request('http://0.0.0.0:5000')
                    .delete('/users/test')
                    .end((err, res) => {
                      if (err) return done(err);
                      res.should.have.status(200);
                    });
                  chai.request('http://0.0.0.0:5000')
                    .delete('/users/test2')
                    .end((err, res) => {
                      if (err) return done(err);
                      res.should.have.status(200);
                      done();
                    });
                });
            });
        });
    });
  });
});
