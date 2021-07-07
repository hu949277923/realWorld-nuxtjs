<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>
        <ul class="error-messages">
          <li
            v-for="(messages, field) in errors"
            :key="field"
          >{{ field }} {{ messages }}</li>
        </ul>
        <!-- <form > -->
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" v-model="user.image" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="user.username" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" v-model="user.bio" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="user.email" type="text" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="user.password" type="password" placeholder="Password">
              </fieldset>
              <fieldset class="form-group">
              <button class="btn btn-lg btn-primary pull-xs-right" @click="updateUser">
                Update Settings
              </button>
              </fieldset>
              <hr>
              <button class="btn btn-outline-danger" @click="loginOut">
                Or click here to logout.
              </button>
          </fieldset>
        <!-- </form> -->
      </div>

    </div>
  </div>
  </div>

</template>

<script>
import { ApiUpdateUser, ApiGetCurrentUser } from '@/api/user.js'
import { mapMutations } from 'vuex'
export default {
  components: {},

  props: {},
  async asyncData () {
    const { user: profile } = await ApiGetCurrentUser()
    console.log('profile', profile)
    // {"user":{"email":"hubill@163.com","bio":"2323","image":"23","username":"billhu","password":"www000000"}}
    return {
      user: {
        email: profile.email || '',
        bio: profile.bio || '',
        image: profile.image || '',
        username: profile.username || '',
        password: profile.password || ''
      }
    }
  },
  data() {
    return {
      errors: {}
    }
  },
  middleware: ['authenticated'],
  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    ...mapMutations(['removeUser']),
    updateUser () {
      ApiUpdateUser({
        user: this.user
      }).then(() => {

      }).catch((err) => {
        this.errors = err.errors || {}
      })
    },
    loginOut () {
      this.removeUser()
      this.$router.push('/')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
