import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// SPA 首屏加载慢
// 使用路由懒加载 使用到了页面再去请求他
// 懒加载的chunk默认名字是模块的路径
// webpack魔法注释 /* webpackChunkName:"新名字" */
const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName:"base" */ '@/views/Video')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName:"base" */ '@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName:"search" */ '@/views/search')
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName:"user" */ '@/views/Users')
  },
  {
    path: '/detail',
    component: () => import(/* webpackChunkName:'detail' */ '@/views/Detail')
  }
]

const router = new VueRouter({
  routes
})

export default router
