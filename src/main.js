import Vue from 'vue'

import 'normalize.css/normalize.css' // 一个现代的替代CSS重置

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 权限控制

/**
*如果您不想使用模拟服务器
*你想使用MockJs来模拟api
*你可以执行:mockXHR()
*
*目前MockJs将在生产环境中使用，
*请在上网前删除它!!!
*/
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
