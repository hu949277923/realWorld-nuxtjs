<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p v-if="profile.bio">
              {{profile.bio}}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn" @click="goSetting">
              <i class="ion-gear-a"></i>
              &nbsp;
               Edit Profile Settings
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link" :class="{ active: type === 1}" 
                exact
                :to="{
                  name: 'profile',
                  query: {
                    type: 1
                  }
                }"
                >My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" :class="{ active: type === 2}" 
                exact
                :to="{
                  name: 'profile',
                  query: {
                    type: 2
                  }
                }"
                >Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview" v-for="article in articles"
            :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link class="author" :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }">
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button 
               class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited
                }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>


        </div>

      </div>
    </div>

  </div>

</template>

<script>
import { ApiGetArticles } from '@/api/article.js'
import { ApiGetProfile } from '@/api/user.js'
export default {
  components: {},
  watchQuery: ['page', 'type'],
  middleware: ['authenticated'],
  async asyncData ({ params, query }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const p1 = ApiGetProfile(params.username)
    // console.log('----res----', res)
    // const { profile } = res
    // console.log('----profile----', profile)
    // const p2 = ApiGetArticles
    let articleParams = {
      limit,
      offset: (page - 1) * limit
    }
    let type
    if (+query.type === 2) {
      type = 2
      articleParams.favorited = params.username
    } else {
      type = 1
      articleParams.author = params.username
    }
    const p2 = ApiGetArticles(articleParams)
    const [res1, res2] = await Promise.all([ p1, p2 ])
    const { profile } = res1
    const { articles } = res2
    console.log('---profile---', profile)
    console.log('----articles---',articleParams,  articles, res2)
    console.log('type', type)
    return {
      type,
      profile,
      articles
    }
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

  methods: {
    goSetting () {
      this.$router.push('/settings')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
