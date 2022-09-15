import request from '@/utils/request'
/**
 *
 * @param {*} q 搜索的关键词
 * @returns Promise
 */
export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 *
 * @param {*} page 分页页数 非必填 不填默认1
 * @param {*} per_page 每一页数据的数量
 * @param {*} q 搜索关键词
 * @returns Promise
 */
export const getResultsAPI = (/* eslint-disable-line */ page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
