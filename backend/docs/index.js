var swaggerJSDoc = require('swagger-jsdoc');
var express = require('express');
var os = require('os');

var router = express.Router();

// Swagger definition aka OpenAPI v2.0
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md

var options = {
  swaggerDefinition: {
    info: {
      title: 'Backend',
      version: '1.0.0',
      description: 'Backend API for SPA Web App Challenge 2',
      contact: {
        email: "si@sipham.pw"
      },
      license: {
        name: "Unlicense",
        url: "https://unlicense.org/"
      }
    },
    host: os.hostname(),
    basePath: '/',
    schemes: [
      "http"
    ]
  },
  apis: [
    './routes/send.js'
  ]
};

var swaggerSpec = swaggerJSDoc(options);

router.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/', express.static(__dirname));

module.exports = router;
