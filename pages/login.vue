<template>
  <LoginRegister></LoginRegister>
</template>

<script>
import LoginRegister from '@/components/LoginRegister.vue'
export default {
  middleware: ['unauthenticated'],
  components: {
    LoginRegister
  },

  props: {},

  data() {
    return {

    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
