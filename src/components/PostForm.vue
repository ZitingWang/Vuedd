<template>
  <form @submit.prevent="submit">
    <div class="form-group" :class="{ 'form-group--error': $v.writer.$error }">
      <label class="form__label">Writer</label>
      <input class="form__input" placeholder="enter your name here" v-model.trim="$v.writer.$model"/>
    </div>
    <div class="form-group" :class="{ 'form-group--error': $v.content.$error }">
      <label class="form__label">Content</label>
      <input class="form__input" placeholder="enter some content here" v-model.trim="$v.content.$model"/>
    </div>
    <div class="error" v-if="!$v.content.required">Content is Required</div>
    <div class="error" v-if="!$v.content.minLength">Content must have at least {{$v.content.$params.minLength.min}} letters.</div>
    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{ postBtnTitle }}</button>
    </p>
    <p>
      <a href="/Posts" class="btn btn-primary btn1" role="button">Manage Posts</a>
    </p>
    <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your Post!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">Posting...</p>
  </form>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import {required, minLength} from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)

export default {
  name: 'FormData',
  props: ['postBtnTitle', 'post'],
  data () {
    return {
      messagetitle: ' Post ',
      content: this.post.content,
      writer: this.post.writer,
      likenumber: 0,
      submitStatus: null
    }
  },
  validations: {
    writer: {
      required
    },
    content: {
      required,
      minLength: minLength(5)
    }
  },
  methods: {
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var post = {
            writer: this.writer,
            likenumber: this.likenumber,
            content: this.content
          }
          this.p = post
          console.log('Submitting in PostForm : ' +
            JSON.stringify(this.p, null, 5))
          this.$emit('post-is-created-updated', this.p)
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .post-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
