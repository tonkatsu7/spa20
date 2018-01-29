var axios = require('axios');
var FormData = require('form-data');
var Buffer = require('buffer').Buffer;

module.exports = {
  bodyData2FormData: function (data) {
    // console.log('DATA=' + JSON.stringify(data));
    var formData = FormData();
    // the from email will always be the same registered to the sandbox mg account
    formData.append('from', process.env.MAILGUN_FROM_ACCOUNT);
    // append 'cc' and 'bcc' if any
    Object.keys(data)
      .filter(function (field) {
        return ['cc', 'bcc'].includes(field);
      })
      .forEach(function (field) {
        data[field].forEach(function (email) {
          formData.append(field, email);
        })
      });
    // append at least one 'to'
    data.to.forEach(function (email) {
      formData.append('to', email);
    });
    // 'subject' line
    formData.append('subject', data.subject);
    // 'text' email body
    formData.append('text', data.text);
    return formData;
  },

  sendEmail: function (data) {
    var sendmail = axios.create({
      baseURL: process.env.MAILGUN_BASE_URL,
      headers: {'Authorization': 'Basic ' + new Buffer('api:' + process.env.MAILGUN_API_KEY).toString('base64')}
    });

    var formData = this.bodyData2FormData(data);

    return sendmail.post('messages', formData, {
      headers: formData.getHeaders()
    })
      .then(function (response) {
        // console.log('Resolve with ' + response.status + ': ' + response.data.message);
        return response.data;
      })
      .catch(function (error) {
        // console.log('Reject with ' + error.response.status + ': ' + error.response.data.message);
        throw error.response;
      });
  }
};