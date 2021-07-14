
const cookieParser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  user: null
})
export const mutations = {
  setUser (state, data) {
    // console.log('--mutations---', data, state.user)
    // console.log('Cookie', Cookie)
    console.log('---process.server,  req.headers.client--',process.server,  process.client)
    process.client && Cookie.set('user', data)
    state.user = data || {}
  },
  removeUser (state) {
    console.log('---process.server,  req.headers.client--',process.server,  process.client)
    process.client && Cookie.remove('user')
    state.user = null
  }
}
export const actions = {
  nuxtServerInit ({ store, commit }, { req }) {
    // console.log('---store----', store)
    console.log('---process.server,  req.headers.client--',process.server,  process.client)
    if (req.headers.cookie && process.server) {
      console.log('---req.headers.cookie--', req.headers.cookie)
      const parsed = cookieParser.parse(req.headers.cookie)
      parsed.user && commit('setUser', JSON.parse(parsed.user))
    }
  }
}
export const getters = {
  token (state) {
    console.log('---process.server,  req.headers.client--',process.server,  process.client)
    return state.user && state.user.token
  }
}
