var request = require('supertest')

// Here we get hold of the express application 
// by using the exported 'getApp'-property
var server = require("../app").server

function expectJson( done, endpoint ) {
  request(server)
    .get(endpoint)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done); // note that we're passing the done as parameter to the expect
}

describe('/nrc endpoints', function() {

  it('GET /nrc/dataNotUsedInRankings, 200 and responds with json', function(done) {
    // the request-object is the supertest top level api
    expectJson(done, '/nrc/dataNotUsedInRankings')
  })

  it('GET /nrc/diversity, 200 and responds with json', function(done) {
    // the request-object is the supertest top level api
    expectJson(done, '/nrc/diversity')
  })

  it('GET /nrc/emergingFields, 200 and responds with json', function(done) {
    // the request-object is the supertest top level api
    expectJson(done, '/nrc/emergingFields')
  })

  it('GET /nrc/generalInformation, 200 and responds with json', function(done) {
    // the request-object is the supertest top level api
    expectJson(done, '/nrc/generalInformation')
  })

  it('GET /nrc/otherOverallRankingMeasures, 200 and responds with json', function(done) {
    // the request-object is the supertest top level api
    expectJson(done, '/nrc/otherOverallRankingMeasures')
  })

  it('GET /nrc/rankings, 200 and responds with json', function(done) {
    // the request-object is the supertest top level api
    expectJson(done, '/nrc/rankings')
  })

  it('GET /nrc/researchActivity, 200 and responds with json', function(done) {
    // the request-object is the supertest top level api
    expectJson(done, '/nrc/researchActivity')
  })

  it('GET /nrc/studentActivities, 200 and responds with json', function(done) {
    // the request-object is the supertest top level api
    expectJson(done, '/nrc/studentActivities')
  })

  it('GET /nrc/studentSupportAndOutcomes, 200 and responds with json', function(done) {
    // the request-object is the supertest top level api
    expectJson(done, '/nrc/studentSupportAndOutcomes')
  })

  it('GET /nrc/timeToDegree, 200 and responds with json', function(done) {
    // the request-object is the supertest top level api
    expectJson(done, '/nrc/timeToDegree')
  })

  it('404 everything else: let\'s try /nrc/foobar', function testPath(done) {
    request(server)
      .get('/nrc/foobar')
      .expect(404, done)
  });
});