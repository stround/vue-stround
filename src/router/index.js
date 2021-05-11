import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 注意:子菜单只在子路由长度>= 1时出现
 *
 * hidden: true                   如果设置为true，则item将不会显示在侧边栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果没有设置alwaysShow，当item有多个子route时，
 *                                它将变成嵌套模式，否则不会显示根菜单
 * redirect: noRedirect           如果设置noRedirect将不会在面包屑中重定向
 * name:'router-name'             <keep-alive>(必须设置!!)使用该名称。
 * meta : {
    roles: ['admin','editor']    控制页面角色(您可以设置多个角色)
    title: 'title'               名称显示在侧边栏和面包屑(推荐集)
    icon: 'svg-name'/'el-icon-x' 图标显示在侧边栏
    breadcrumb: false            如果设置为false，该项目将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'  如果设置路径，工具条将突出显示您设置的路径
  }
 */

/**
  * constantRoutes
  * 没有权限要求的基本页面
  * 可以访问所有角色
  */
export const constantRoutes = [
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 内容
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '表单', icon: 'form' }
      }
    ]
  },

  // 404页面必须放在最后!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // 需要服务端支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置 router
}

export default router
