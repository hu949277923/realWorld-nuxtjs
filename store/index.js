
const cookieParser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  user: null
})
export const mutations = {
  setUser (state, data) {
    // console.log('--mutations---', data, state.user)
    // console.log('Cookie', Cookie)
    process.client && Cookie.set('user', data)
    state.user = data || {}
  },
  removeUser (state) {
    process.client && Cookie.remove('user')
    state.user = null
  }
}
export const actions = {
  nuxtServerInit ({ store, commit }, { req }) {
    // console.log('---store----', store)
    // console.log('---commit--', commit)
    // console.log('---req--',process.server,  req.headers.cookie)
    if (req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie)
      parsed.user && commit('setUser', JSON.parse(parsed.user))
    }
  }
}
export const getters = {
  token (state) {
    return state.user && state.user.token
  }
}
