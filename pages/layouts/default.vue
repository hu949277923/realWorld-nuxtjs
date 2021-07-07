<template>
  <div>
    <cm-header></cm-header>
    <nuxt/>
    <cm-footer></cm-footer>
  </div>
</template>

<script>
import cmHeader from './header.vue'
import cmFooter from './footer.vue'
export default {
  components: {
    cmHeader,
    cmFooter
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
