var sinon = require('sinon');
var proxyquire = require('proxyquire');

var PROMISE_ACTION = 'resolve';
var PROMISE_VALUE = {};
var sendRoutes = proxyquire('../routes/send', {
  '../lib/mgLib': {
    sendEmail: function (obj) {
      return Promise[PROMISE_ACTION](PROMISE_VALUE);
    }
  }
});

var getRoute = function (r) {
  return sendRoutes.filter(function (x) {
    return x.route === r;
  })[0]; // referencing the 'route' property/object key
};

describe('send routes', function () {
  var simpleEmailFix = {
    to: [
      'si@sipham.pw'
    ],
    subject: 'Testing simple',
    text: 'Unit testing is cool'
  };

  var simpleUnauthorisedEmailFix = {
    to: [
      'si@sipham.UNAUTHORISED'
    ],
    subject: 'Testing unauthorised',
    text: 'Testing is cool'
  };

  before(function () {
    process.env.MAILGUN_API_KEY = 'key-adummykeyyyyyyyyyyyyyyyyyyyyyyyy';
    process.env.MAILGUN_FROM_ACCOUNT = 'from@recipient.com';
    process.env.MAILGUN_BASE_URL = 'https://some.url.com/api/'
  });

  describe('index', function () {
    it('queues an email', function (done) {
      // Given
      PROMISE_ACTION = 'resolve';
      PROMISE_VALUE = {
        status: '888',
        statusText: 'Triple 8',
        data: {
          message: 'Get lucky'
        }
      };
      var resolve = sinon.spy();
      var reject = sinon.spy();
      var reqFix = {
        body: simpleEmailFix
      };
      var resFix = {
        json: resolve,
        status: reject
      };

      // When
      getRoute('/')
        .post(reqFix, resFix)
        .then(function () {
          // Then
          sinon.assert.calledOnce(resolve);
          sinon.assert.notCalled(reject);
          done();
        })
    });

    it('rejects an email', function (done) {
      // Given
      PROMISE_ACTION = 'reject';
      PROMISE_VALUE = {
        status: '666',
        statusText: 'Diaval',
        data: {
          message: 'Testastretta'
        }
      };
      var rejectStatus = sinon.spy();
      var rejectJson = sinon.spy();
      var reqFix = {
        body: simpleUnauthorisedEmailFix
      };
      var resFix = {
        json: rejectStatus,
        status: rejectJson
      };

      // When
      getRoute('/')
        .post(reqFix, resFix)
        .then(function() {
          // Then
          sinon.assert.calledOnce(rejectStatus);
          sinon.assert.calledOnce(rejectJson);
          done();
        })
    });
  })
});