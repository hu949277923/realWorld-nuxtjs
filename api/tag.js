import { request } from '@/plugins/request.js'

// Get Tags 标签
export const ApiGetTags = () => {
  return request.get('/api/tags')
}
