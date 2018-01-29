<template>
  <div class="container">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h2>Subject</h2>
      </div>

      <div class="panel-body">
        <form v-on:submit.prevent="saveAndNext">
          <b-form-group id="subjectFieldset"
                        label="Enter the email subject line and press enter to proceeed"
                        label-for="subjectField"
                        :invalid-feedback="invalidFeedback"
                        :state="validateState">
            <b-form-input id="subjectField"
                          ref="subjectField"
                          :state="validateState"
                          v-model.trim="form.subject"
                          placeholder="Just plain text..." autofocus></b-form-input>
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
  name: 'subject',
  data () {
    return {
      form: {
        subject: ''
      }
    }
  },
  mounted: function () {
    this.$nextTick(() => this.$refs.subjectField.focus())
  },
  computed: {
    validateState () {
      return this.form.subject.length > 0
    },
    invalidFeedback () {
      return !this.validateState ? 'Please enter a subject' : ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    saveAndNext () {
      if (this.validateState) {
        this.assignSubject(this.form.subject)
        this.$router.push('/message')
      }
    },
    ...mapMutations(['assignSubject'])
  }
}
</script>

<style scoped>

</style>
