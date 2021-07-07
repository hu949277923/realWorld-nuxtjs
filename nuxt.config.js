module.exports = {
  vendors: ['vuex'],
  router: {
    linkActiveClass: 'active',
    // 自定义路由表规则
    extendRoutes (routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)

      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layouts/default.vue'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login.vue')
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/register.vue')
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile.vue')
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings.vue')
            },
            {
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            }
          ]
        }
      ])
    }
  },

  server: {
    host: '0.0.0.0',
    port: 3000
  },
  plugins:[
    '~/plugins/dayjs.js',
    '~/plugins/request.js'
  ],
  loading: true
}