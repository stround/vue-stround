import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // 当跨域时发送cookie，跨域安全策略
  timeout: 5000 // 请求超时
})

// 请求拦截
service.interceptors.request.use(
  config => {
    // 发送请求前的处理

    if (store.getters.token) {
      // 让每个请求携带token
      // ['X-Token']是一个自定义的headers键
      // 请根据实际情况修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  /**
   * 如果想获取http信息，例如头或状态
   * return  response => response
  */

  /**
   * 通过自定义代码确定请求状态
   * 通过HTTP状态代码来判断状态
   */
  response => {
    const res = response.data

    // 如果状态码不是20000, 判定为请求错误
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: 非法 token; 50012: 已在其他客户端登录; 50014: Token 过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        // You have been logged out, you can cancel to stay on this page, or log in again
        MessageBox.confirm('登录失效, 请重新登录', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
