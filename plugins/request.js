import axios from 'axios'
// 创建请求对象
const service = axios.create({
  baseURL: 'http://realworld.api.fed.lagounews.com',
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})
export default ({ store }) => {
  service.interceptors.request.use(config => {
    const { token } = store.getters
    config.headers.Authorization = `Token ${token}`
    return config
  })
  service.interceptors.response.use(response => {
    // console.log('-------response-------', response)
  
    return Promise.resolve(response.data)
  },error => {
    // console.log('---------error------', error.response)
    return Promise.reject(error && error.response && error.response.data)
  })
}
export const request = service