import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    to: [],
    cc: [],
    bcc: [],
    subject: '',
    text: '',
    pageSequence: {
      to: '/cc',
      cc: '/bcc',
      bcc: '/subject'
    },
    minEntries: {
      to: 1,
      cc: 0,
      bcc: 0
    }
  },
  getters: {
    getRecipientsByField: (state) => (field) => {
      return state[field]
    },
    getMinEntriesByFeild: (state) => (field) => {
      return state.minEntries[field]
    },
    getNextPageByField: (state) => (field) => {
      return state.pageSequence[field]
    }
  },
  mutations: mutations,
  actions: actions
})

export default store
