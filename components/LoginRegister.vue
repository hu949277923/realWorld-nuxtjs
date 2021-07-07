<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up'}}</h1>
        <p class="text-xs-center">
          <nuxt-link to="/register" v-if="isLogin">Need an account?</nuxt-link>
          <nuxt-link to="/login" v-else>Have an account?</nuxt-link>
        </p>

        <ul class="error-messages">
          <li
            v-for="(messages, field) in errors"
            :key="field"
          >{{ field }} {{ messages }}</li>
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset class="form-group" v-if="!isLogin">
            <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{ isLogin ? 'Sign in' : 'Sign up'}}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>

</template>
<script>
import { ApiLogin, ApiRegister } from '@/api/user.js'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginRegister',
  data () {
    return {
      user: {
        username: '',
        email: 'jake@jake.jake',
        password: 'jakejake'
      },
      errors: {}
    }
  },
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    onSubmit () {
      const response = this.isLogin ? ApiLogin({
        user: this.user
      }) : ApiRegister({
        user: this.user
      })
      response.then(res => {
        console.log('-----response----', res)
        this.setUser(res.user)
        this.$router.push('/')
      }).catch((err) => {
        console.log('err', err)
        this.errors = err.errors || {}
      })
    }
  }
}
</script>
