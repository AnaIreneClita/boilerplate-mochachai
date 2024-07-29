const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const Browser = require('zombie');
const server = require('../server');

chai.use(chaiHttp);

const browser = new Browser();

suite('Functional Tests', function () {
  this.timeout(5000);

  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .get('/hello')
        .end(function (err, res) {
          if (err) return done(err);
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.text, 'hello Guest', 'Response should be "hello Guest"');
          done();
        });
    });

    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .get('/hello?name=Ana')
        .end(function (err, res) {
          if (err) return done(err);
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.text, 'hello Ana', 'Response should be "hello Ana"');
          done();
        });
    });

    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({ surname: 'Colombo' })
        .end(function (err, res) {
          if (err) return done(err);
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.isObject(res.body, 'Response body should be an object');
          assert.property(res.body, 'name', 'Response body should contain a `name` property');
          assert.property(res.body, 'surname', 'Response body should contain a `surname` property');
          assert.equal(res.body.name, 'Cristoforo', 'Response body `name` should be "Cristoforo"');
          assert.equal(res.body.surname, 'Colombo', 'Response body `surname` should be "Colombo"');
          done();
        });
    });

    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({ surname: 'da Verrazzano' })
        .end(function (err, res) {
          if (err) return done(err);
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.isObject(res.body, 'Response body should be an object');
          assert.property(res.body, 'message', 'Response body should contain a `message` property');
          assert.equal(res.body.message, 'Surname updated to da Verrazzano', 'Response message should be "Surname updated to da Verrazzano"');
          done();
        });
    });
  });
});

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);

  suite('Headless browser', function () {
    test('should have a working "site" property', function (done) {
      browser.visit('http://localhost:3000')
        .then(function () {
          assert.isNotNull(browser.site);
          done();
        })
        .catch(done);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      browser.visit('http://localhost:3000/form')
        .then(function () {
          return browser.fill('surname', 'Colombo').pressButton('Submit');
        })
        .then(function () {
          assert.include(browser.text('body'), 'Expected response after submitting "Colombo"');
          done();
        })
        .catch(done);
    });

    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      browser.visit('http://localhost:3000/form')
        .then(function () {
          return browser.fill('surname', 'Vespucci').pressButton('Submit');
        })
        .then(function () {
          assert.include(browser.text('body'), 'Expected response after submitting "Vespucci"');
          done();
        })
        .catch(done);
    });
  });
});
