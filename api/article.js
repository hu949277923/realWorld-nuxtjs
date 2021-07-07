import { request } from '@/plugins/request.js'
// 文章发表/修改/列表/分页/标签/详情/点赞/取消点赞、个人中心，个人信息更新
// List Articles 文章列表
export const ApiGetArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}
// 获取公共文章列表
export const ApiGetYourFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
    // headers: {
    //   // 添加用户身份，数据格式：Token空格Token数据
    //   Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDgxMTYsInVzZXJuYW1lIjoibHB6OTk5IiwiZXhwIjoxNTk3NzQxNTA4fQ.2yO8Fss4hYnvsIN2UYHsutQ1hmYqSSAA-UrIRnP4DOY`
    // }
  })
}
// Create Article 文章发表
export const ApiCreateArticle = (params) => {
  return request.post('/api/articles', params)
}
// Update Article 修改文章
export const ApiUpdateArticle = ({ slug, params}) => {
  return request.put(`/api/articles/${slug}`, params)
}
// Favorite Article 点赞
export const ApiFavoriteArticle = (slug) => {
  return request.post(`/api/articles/${slug}/favorite`)
}
// Unfavorite Article 取消点赞
export const ApiUnfavoriteArticle = (slug) => {
  return request.delete(`/api/articles/${slug}/favorite`)
}

// Get Article
// export const ApiGetArticle = ({ slug, params}) => {
//   return request.get(`/api/articles/${slug}`, params)
// }
export const ApiGetArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const ApiGetComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}
