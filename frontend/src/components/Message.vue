<template>
  <div class="container">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h2>Message</h2>
      </div>

      <div class="panel-body">
        <form v-on:submit.prevent="saveAndNext">
          <b-form-group id="messageFieldset"
                        label="Enter the email message body and press enter to proceeed"
                        label-for="messageField"
                        :invalid-feedback="invalidFeedback"
                        :state="validateState">
            <b-form-textarea id="messageField"
                             ref="messageField"
                             :state="validateState"
                             :rows="10"
                             v-model="form.message"
                             placeholder="Type your message..." autofocus></b-form-textarea>

          </b-form-group>
        </form>
      </div>

      <div class="panel-footer">
        <div class="container">
          <div class="row">
            <div class="col-sm-8"></div>

            <div class="col-sm-4">
              <button type="button" class="btn btn-default" v-on:click="back" tabindex="-1">Back</button>
              <button type="button" class="btn btn-primary" v-on:click="saveAndNext">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'message',
  data () {
    return {
      form: {
        message: ''
      }
    }
  },
  mounted: function () {
    this.$nextTick(() => this.$refs.messageField.focus())
  },
  computed: {
    validateState () {
      return this.form.message.length > 0
    },
    invalidFeedback () {
      return !this.validateState ? 'Please enter a message' : ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    saveAndNext () {
      if (this.validateState) {
        this.$store.commit('assignMessage', this.form.message)
        this.$router.push('/confirm')
      }
    },
    ...mapMutations(['assignMessage'])
  }
}
</script>

<style scoped>

</style>
