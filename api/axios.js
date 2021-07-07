import axios from 'axios'
// 创建请求对象
const service = axios.create({
  baseURL: 'http://realworld.api.fed.lagounews.com',
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})
service.interceptors.request.use(config => {
  console.log('config', config.headers)
  return config
})
service.interceptors.response.use(response => {
  // console.log('-------response-------', response)

  return Promise.resolve(response.data)
},error => {
  // console.log('---------error------', error.response)
  return Promise.reject(error && error.response && error.response.data)
})
export const request = service