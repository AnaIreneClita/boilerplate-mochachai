const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.text, 'hello Guest', 'Response should be "hello Guest"');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=Ana')
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.text, 'hello Ana', 'Response should be "hello Ana"');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put('/travellers')

        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.isObject(res.body, 'Response body should be an object');
          assert.property(res.body, 'message', 'Response body should contain a `message` property');
          assert.equal(res.body.message, 'Surname updated to Colombo', 'Response message should be "Surname updated to Colombo"');

          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      assert.equal(res.status, 200, 'Response status should be 200');
      assert.isObject(res.body, 'Response body should be an object');
      assert.property(res.body, 'message', 'Response body should contain a `message` property');
      assert.equal(res.body.message, 'Surname updated to da Verrazzano', 'Response message should be "Surname updated to da Verrazzano"');
          
      done();
    });
  });
});

const Browser = require('zombie');

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);



  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      assert.equal(browser.text('body'), 'Expected response after submitting "Colombo"');

      done();
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      assert.equal(browser.text('body'), 'Expected response after submitting "Vespucci"');

      done();
    });
  });
});
