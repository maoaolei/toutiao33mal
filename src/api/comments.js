import request from '@/utils/request'
/**
 *
 * @param {*} type a或c a是对文章的评论 c是对评论的回复
 * @param {*} source 源id 文章id或评论id
 * @returns Promise
 */
export const getCommentsAPI = (type, source) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source
    }
  })
}

export const addCommentAPI = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
