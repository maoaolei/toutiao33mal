import request from '@/utils/request'
// import store from '@/store'
/**
 *
 * @param {String} mobile 手机号
 * @param {Number} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 *发送验证码
 * @param {String} mobile
 * @returns Promise
 */
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 *获取用户信息
 * @returns Promise
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    //   // Authorization: 'Bearer ' + store.state.tokenObj.token
    // }
  })
}

/**
 *
 * @param {*} file 裁剪过后的图片的file对象
 * @returns
 */
export const uploadPhotoAPI = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

/**
 *获取用户个人资料
 * @returns Promise
 */
export const getUserProfileAPI = () => {
  return request({ url: '/v1_0/user/profile' })
}

export const getEditUserInfo = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
