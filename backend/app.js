var express = require('express');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var cors = require('cors');

var registerRoutes = require('./util/registerRoutes');

var send = require('./routes/send');
var docs = require('./docs');

var app = express();

require('dotenv').config();

console.log('API_KEY=' + process.env.MAILGUN_API_KEY);
console.log('FROM=' + process.env.MAILGUN_FROM_ACCOUNT);
console.log('MG_DOMAIN=' + process.env.MAILGUN_DOMAIN_NAME);
console.log('MAILGUN_BASE_URL=' + process.env.MAILGUN_BASE_URL);
console.log('LOGS_DIR=' + process.env.LOGS_DIR);

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, process.env.LOGS_DIR, 'http.log'), {flags: 'a'});
app.use(logger('dev'));
app.use(logger('combined', {stream: accessLogStream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// register routes
app.use('/send', registerRoutes(send));
app.use('/docs', docs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // responsd with the error code
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
