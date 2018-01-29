import axios from 'axios'
import { BACKEND_BASE_URL } from './config.env'

export default {
  sendEmail: ({commit, state}) => {
    let to = state.to
    let cc = state.cc
    let bcc = state.bcc
    let subject = state.subject
    let text = state.text
    return axios.post(`${BACKEND_BASE_URL}/send`, {
      to: to,
      cc: cc,
      bcc: bcc,
      subject: subject,
      text: text
    })
      .then(response => {
        // console.log('Successfully sent email request: ' + JSON.stringify(response))
        commit('resetAllData')
        return {
          success: true,
          message: response.data.success
        }
      })
      .catch(error => {
        // console.error('Failed to send email request: ' + JSON.stringify(error))
        return {
          success: false,
          message: (error.response.data.error) ? error.response.data.error : error.response.data.errors
        }
      })
  }
}
