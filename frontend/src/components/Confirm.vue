<template>
  <div class="container">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h2>Subject</h2>
      </div>

      <div class="panel-body">
        <p v-if="toRecipients.length"><strong>To</strong></p>
        <p v-for="email in toRecipients" :key="email">{{ email }}</p>

        <p v-if="ccRecipients.length"><strong>Cc</strong></p>
        <p v-for="email in ccRecipients" :key="email">{{ email }}</p>

        <p v-if="bccRecipients.length"><strong>Bcc</strong></p>
        <p v-for="email in bccRecipients" :key="email">{{ email }}</p>

        <p v-if="subject.length"><strong>Subject line</strong></p>
        <p>{{ subject }}</p>

        <p v-if="message.length"><strong>Message body</strong></p>
        <p>{{ message }}</p>
      </div>

      <div class="panel-footer">
        <div class="container">
          <div class="row">
            <div class="col-sm-8">
              <b-modal ref="modal" ok-only title="Validation" @hidden="onHidden">
                <p class="my-4">{{ status }}</p>
              </b-modal>
            </div>

            <div class="col-sm-4">
              <button type="button" class="btn btn-default" v-on:click="back" tabindex="-1">Back</button>
              <button type="button" class="btn btn-primary" v-on:click="complete">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'confirm',
  data () {
    return {
      loading: false,
      status: '',
      sendSuccess: false
    }
  },
  computed: {
    ...mapState({
      toRecipients (state) {
        return state.to
      },
      ccRecipients (state) {
        return state.cc
      },
      bccRecipients (state) {
        return state.bcc
      },
      subject (state) {
        return state.subject
      },
      message (state) {
        return state.text
      }
    })
  },
  methods: {
    showModal (status) {
      this.status = status
      this.$refs.modal.show()
    },
    onHidden () {
      if (this.sendSuccess) {
        this.$router.push('/')
      }
    },
    back () {
      this.$router.back()
    },
    complete () {
      this.loading = true
      this.sendEmail()
        .then(({success, message}) => {
          this.loading = false

          if (success) {
            this.sendSuccess = true
            this.showModal(message)
          } else {
            this.sendSuccess = false
            this.showModal(message)
          }
        })
    },
    ...mapActions(['sendEmail'])
  }
}
</script>

<style scoped>

</style>
