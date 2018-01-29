var Joi = require('joi');

var mgHelper = require('../lib/mgLib');

// JSDoc definition
// http://usejsdoc.org/

/**
 * @swagger
 * tags:
 * - name: send
 *   description: Send/queue emails
 */
var sendRoutes = [
  {
    route: '/',
    params: {
      body: {
        to: Joi.array().items(Joi.string().email()).min(1).required(),
        cc: Joi.array().items(Joi.string().email()).required(),
        bcc: Joi.array().items(Joi.string().email()).required(),
        subject: Joi.string().required(),
        text: Joi.string().required()
      }
    },
    /**
     * @swagger
     * /send:
     *   post:
     *     summary: Queue an email to be sent
     *     description: Queue an email to be sent
     *     tags: [send]
     *     parameters:
     *       - in: body
     *         name: to
     *         type: array
     *         required: true
     *         description: List of recipient email adresses
     *       - in: body
     *         name: cc
     *         type: array
     *         required: true
     *         description: List of cc email adresses
     *       - in: body
     *         name: bcc
     *         type: array
     *         required: true
     *         description: List of bcc email adresses
     *       - in: body
     *         name: subject
     *         type: string
     *         required: true
     *         description: Email subject line
     *       - in: body
     *         name: text
     *         type: string
     *         required: true
     *         description: Email body text
     *     responses:
     *       '200':
     *         description: email successfully queued
     *         schema:
     *           success: success message
     *       '400':
     *         description: email not successfully queued - missing parameters
     *         schema:
     *           status: http status code
     *           statusText: http sttus
     *           error: error message
     *           errors: specific errors if any
     *       '500':
     *         description: email not successfully queued - internal error
     */
    post: function (req, res, next) {
      return mgHelper.sendEmail(req.body)
        .then(function (response) {
          // console.log('RESPOND 200: ' + response.message);
          res.json({success: 'Successfully queued email'});
        })
        .catch(function (error) {
          // TODO catch 401 unauthorised meaning that api key is incorrect
          // TODO just return a 503 for all non 200 codes, and schema is now { message: 'some message' } for both resolve and reject
          //   503 Service Unavailable
          //   The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.[64]

          // console.log('STATUS ' + error.status + ': ' + error.data.message);
          res.status(error.status);
          res.json({
            status: error.status,
            statusText: error.statusText,
            error: error.data.message});
        });
    }
  }
];

module.exports = sendRoutes;