<template>
  <div class="container">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h2>{{ $route.name.toUpperCase() }} recpients</h2>
      </div>

      <div class="panel-body">
        <form v-on:submit.prevent="appendEmail">
          <b-form-group id="emailFieldset"
                        label="Enter an email and press enter to append recipient"
                        label-for="emailField"
                        :invalid-feedback="invalidFeedback"
                        :state="validateState">
            <b-form-input id="emailField"
                          ref="emailField"
                          :state="validateState"
                          v-model.trim="form.email"
                          :placeholder="placeholder" autofocus></b-form-input>
          </b-form-group>
        </form>

        <div>
          <p v-if="!recipients.length"><strong>No recipients yet</strong></p>
          <p v-else><i>The email will be sent to:</i></p>
        </div>

        <div v-for="(email, idx) in recipients" :key="email" class="container">
            <div v-on:click="singleOrDoubleClick(email)" v-b-tooltip.hover :title="tooltip(idx)">
              <strong>{{ email }}</strong>
            </div>
        </div>
      </div>

      <div class="panel-footer">
        <div class="container">
          <div class="row">
            <div class="col-sm-8">
              <b-modal ref="modal" ok-only title="Validation">
                <p class="my-4">{{ status }}</p>
              </b-modal>
            </div>

            <div class="col-sm-4">
              <button type="button" class="btn btn-default" v-on:click="back" tabindex="-1">Back</button>
              <button type="button" class="btn btn-primary" v-on:click="next">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'recipients',
  data () {
    return {
      form: {
        email: ''
      },
      status: '',
      delay: 500,
      clicks: 0,
      timer: null
    }
  },
  mounted: function () {
    this.$nextTick(() => this.$refs.emailField.focus())
  },
  watch: {
    '$route' (from, to) {
      this.form.email = ''
      this.$refs.emailField.$el.focus()
    }
  },
  computed: {
    placeholder () {
      return this.$route.name + '@recipient.com'
    },
    recipients () {
      return this.getRecipientsByField(this.$route.name)
    },
    validateState () {
      return this.form.email.length > 0 ? this.validateEmail(this.form.email) : null
    },
    invalidFeedback () {
      return !this.validateState ? 'Please enter a valid email' : ''
    },
    formRecipient () {
      return {
        email: this.form.email,
        field: this.$route.name
      }
    },
    okay2Next () {
      return this.recipients.length >= this.getMinEntriesByFeild(this.$route.name)
    },
    ...mapGetters([
      'getRecipientsByField',
      'getMinEntriesByFeild',
      'getNextPageByField'
    ])
  },
  methods: {
    validateEmail (email) {
      return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)
    },
    tooltip (index) {
      return index === 0 ? 'Click on a recipient to edit, double click to delete' : ''
    },
    singleOrDoubleClick (email) {
      this.clicks++
      if (this.clicks === 1) {
        this.timer = setTimeout(() => {
          this.editEmail(email)
          this.clicks = 0
        }, this.delay)
      } else {
        clearTimeout(this.timer)
        this.removeEmail(email)
        this.clicks = 0
      }
    },
    showModal (status) {
      this.status = status
      this.$refs.modal.show()
    },
    appendEmail () {
      if (this.validateState) {
        let recipient = this.formRecipient
        if (!this.recipients.includes(recipient.email)) {
          this.appendRecipient(recipient)
          this.form.email = ''
        } else {
          this.showModal('Recipient already exists')
        }
      }
    },
    editEmail (email) {
      this.removeEmail(email)
      this.form.email = email
    },
    removeEmail (email) {
      let recipient = this.formRecipient
      this.removeRecipient(recipient)
    },
    back () {
      this.$router.back()
    },
    next () {
      if (this.okay2Next) {
        this.$router.push(this.getNextPageByField(this.$route.name))
      } else {
        this.showModal('Please check that you have met the requirements')
      }
    },
    ...mapMutations([
      'appendRecipient',
      'removeRecipient'
    ])
  }
}
</script>

<style scoped>

</style>
