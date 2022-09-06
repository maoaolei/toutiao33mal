import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// SPA 首屏加载慢
// 使用路由懒加载 使用到了页面再去请求他
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
