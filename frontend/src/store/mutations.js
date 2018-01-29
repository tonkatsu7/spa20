export default {
  appendRecipient: (state, {email, field}) => {
    state[field].push(email)
  },
  removeRecipient: (state, {email, field}) => {
    state[field].splice(state[field].indexOf(email))
  },
  assignSubject: (state, subject) => {
    state.subject = subject
  },
  assignMessage: (state, message) => {
    state.text = message
  },
  resetAllData: (state) => {
    state.to = []
    state.cc = []
    state.bcc = []
    state.subject = ''
    state.text = ''
  }
}
