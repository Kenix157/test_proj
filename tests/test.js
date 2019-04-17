
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../start.js');
var should = chai.should();

chai.use(chaiHttp);

it('test /task/:id', function(done) {
  chai.request(server)
    .get('/task/1')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});