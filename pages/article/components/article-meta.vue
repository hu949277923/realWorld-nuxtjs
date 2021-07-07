<template>
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
      <span class="date">{{ article.createdAt | date('yyyy-MM-dd') }}</span>
    </div>
    <button
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following
      }"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow Eric Simons <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited
      }"
    >
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">(29)</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  filters: {
    date (date, format) {
      console.log('date', date)
      if (!date) {
        return
      }
      // if (typeof date === 'string') {
      //   date = date.replace(/-/g, '/')
      // }
      let t = new Date(date)
      let o = {
        y: t.getFullYear(), // 年
        M: t.getMonth() + 1, // 月
        d: t.getDate(), // 日
        h: t.getHours(), // 小时
        m: t.getMinutes(), // 分钟
        s: t.getSeconds(), // 秒
        S: t.getMilliseconds(), // 毫秒
        q: Math.floor((t.getMonth() + 3) / 3), // 季度
        W: '日一二三四五六'.charAt(t.getDay()) // 星期
      }
      return format.replace(/([yMdhmsqWS])\1*/g, function (w, k) {
        let v = o[k]
        return (k === 'W' ? v : new Array(w.length).join('0') + v).slice(-w.length)
      })
    },
  }
}
</script>

<style>

</style>
