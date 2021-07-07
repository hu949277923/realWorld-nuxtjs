import { request } from '@/plugins/request.js'
// login
export const ApiLogin = params => {
  return request.post('/api/users/login', params)
}

// register
export const ApiRegister = params => {
  return request.post('/api/users', params)
}

// Get Current User
export const ApiGetCurrentUser= params => {
  return request.get('/api/user', params)
}

// Update User
export const ApiUpdateUser= params => {
  return request.put('/api/user', params)
}
// Get Profile
export const ApiGetProfile = username => {
  return request.get(`/api/profiles/${username}`, )
}