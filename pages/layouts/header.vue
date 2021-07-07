<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="index.html">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <nuxt-link class="nav-link" to="/">Home</nuxt-link>
        </li>
        <template v-if="user">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/editor">
              <i class="ion-compose"></i>&nbsp;New Article
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="goProfile">
              {{ user.username }}
            </nuxt-link>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <nuxt-link class="nav-link active" to="/login">Sign in</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link active" to="/register">Sign up</nuxt-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'cmHeader', 
  components: {},

  props: {},
  data() {
    return {

    }
  }, 

  computed: {
    ...mapState(['user']),
    goProfile () {
      return `/profile/${this.user.username}`
    }
  },

  watch: {},

  created() {
  },

  mounted() {},

  methods: {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
