import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _969ef8aa = () => interopDefault(import('../pages/layouts/default.vue' /* webpackChunkName: "" */))
const _5ef4be07 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _3ee87559 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "" */))
const _6bc0f8e3 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "" */))
const _21cd5999 = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "" */))
const _1d36733a = () => interopDefault(import('../pages/settings.vue' /* webpackChunkName: "" */))
const _6f024095 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _93b2da64 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _969ef8aa,
    children: [{
      path: "",
      component: _5ef4be07,
      name: "home"
    }, {
      path: "/login",
      component: _3ee87559,
      name: "login"
    }, {
      path: "/register",
      component: _6bc0f8e3,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _21cd5999,
      name: "profile"
    }, {
      path: "/settings",
      component: _1d36733a,
      name: "settings"
    }, {
      path: "/editor",
      component: _6f024095,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _93b2da64,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
