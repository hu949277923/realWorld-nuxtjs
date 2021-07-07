<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <!-- <form @submit.prevent="onSubmit"> -->
            <fieldset>
              <fieldset class="form-group">
                  <input type="text" v-model="article.title" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" v-model="article.description" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                  <textarea class="form-control" v-model="article.body" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" v-model="tag" @keyup.enter="handleTag" class="form-control" placeholder="Enter tags"><div class="tag-list" ><span v-for="(item, index) in article.tagList" :key="item" class="tag-default tag-pill ng-binding ng-scope">
                    <i class="ion-close-round" @click="handleClose(index)"></i>
                    {{ item }}</span></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click.stop="onSubmit">
                  Publish Article
              </button>
            </fieldset>
          <!-- </form> -->
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ApiCreateArticle, ApiGetArticle, ApiUpdateArticle } from '@/api/article.js'
export default {
  components: {},

  middleware: ['authenticated'],
  props: {},
  async asyncData ({ query }) {
    console.log('params', query)
    const slug = query.slug
    let res = {}
    console.log('slug', slug)
    if (slug) res = await ApiGetArticle(slug)
    const article = res.article || {}
    console.log('article', article)
    return {
      article: {
        title: article.title || '',
        description: article.description|| '',
        body: article.description|| '',
        tagList: article.tagList || []
      }
    }
  },
  data() {
    return {
      // article: {
      //   title: "",
      //   description: "",
      //   body: "",
      //   tagList: []
      // },
      tag: '',
    }
  },

  computed: {
    slug() {
      console.log('this.$route.params', this.$route.query)
      return this.$route.query.slug || ''
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {
    onSubmit () {
      const api = this.slug ? ApiUpdateArticle({
        slug: this.slug,
        params: {
          article: this.article
        }
      }): ApiCreateArticle({
        article: this.article
      })
      api.then(res => {
        console.log('---res---', res)
        this.$router.push(`/article/${res.article.slug}`)
      }).catch((err) => {
        console.log('---err---', err)
      })
    },
    handleTag () {
      this.article.tagList.unshift(this.tag)
      this.tag = ''
    },
    handleClose (index) {
      this.article.tagList.splice(index, 1)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
