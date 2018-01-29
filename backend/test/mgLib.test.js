var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var nock = require('nock');

var mgHelper = require('../lib/mgLib');

describe('Mailgun helper', function () {

  var simpleEmailFix = {
    to: [
      'si@sipham.pw'
    ],
    subject: 'Testing simple',
    text: 'Testing is cool'
  };

  var simpleUnauthorisedEmailFix = {
    to: [
      'si@sipham.UNAUTHORISED'
    ],
    subject: 'Testing unauthorised',
    text: 'Testing is cool'
  };

  var complexEmailFix = {
    to: [
      'to1@domain.com'
    ],
    cc: [
      'cc1@domain.com',
      'cc2@domain.com'
    ],
    bcc: [
      'bcc1@domain.com',
      'bcc2@domain.com',
      'bcc3@domain.com'
    ],
    subject: 'Testing complex',
    text: 'Testing is cool'
  };

  var mgResponse200Fix = require('./data/mgSuccess200.response');

  var mgResponseUnauthorised400Fix = require('./data/mgUnauthorised400.response');

  before(function () {
    process.env.MAILGUN_API_KEY = 'key-adummykeyyyyyyyyyyyyyyyyyyyyyyyy';
    process.env.MAILGUN_FROM_ACCOUNT = 'from@recipient.com';
    process.env.MAILGUN_BASE_URL = 'https://some.url.com/api/'
  });

  describe('convert reponse body to form data', function () {
    it('1 to recipient', function () {
      // Given

      // When
      var actual = mgHelper.bodyData2FormData(simpleEmailFix);

      // Then
      expect(actual._streams.length).to.equal(12);
    });

    it('1 to, 2 cc, 3 bcc recipients', function () {
      // Given

      // When
      var actual = mgHelper.bodyData2FormData(complexEmailFix);

      // Then
      expect(actual._streams.length).to.equal(27);
    })
  });

  describe('queue email', function () {
    afterEach(function () {
      nock.cleanAll();
    });

    it('queue an email successfully with nock', function () {
      // Given
      var mg = nock(process.env.MAILGUN_BASE_URL)
        .post(/messages/)
        .reply(200, mgResponse200Fix);

      // When
      var mgPromise = mgHelper.sendEmail(simpleEmailFix);

      // Then
      return expect(mgPromise).to.eventually.be.fulfilled.and.to.have.property('message', 'Queued. Thank you.');
    });

    it('fail on unauthorised with nock', function (done) {
      // Given
      var mg = nock(process.env.MAILGUN_BASE_URL)
        .post(/messages/)
        .reply(400, mgResponseUnauthorised400Fix);

      // When
      var mgPromise = mgHelper.sendEmail(simpleUnauthorisedEmailFix);

      // Then
      mgPromise.then(function (resolved) {
        done(resolved);
      }).catch(function (rejected) {
        expect(rejected).to.have.property('status', 400);
        expect(rejected).to.have.property('statusText');
        expect(rejected).to.have.nested.property('data.message', "Sandbox subdomains are for test purposes only. Please add your own domain or add the address to authorized recipients in Account Settings.");
        done();
      })
    });
  })
});