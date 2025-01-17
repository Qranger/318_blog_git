import { createRouter, createWebHistory } from 'vue-router'


import LoginAndRegister from '@/views/LoginAndRegister.vue'
import BlogEdit from '@/views/BlogEdit.vue'
import BlogPage from '@/views/BlogPage.vue'

import MyHome from '@/views/MyHome.vue'
import BlogSquare from '@/views/BlogSquare.vue'

import experimentTest from '@/components/experimentTest.vue'
const routePath = [
  {
    path: '/',
    redirect: '/hello' // 设置默认路由为 /hello
  },
  {
    path: '/BlogEdit',
    name: 'BlogEdit',
    component: BlogEdit
  },
  {
    path: '/hello',
    name: 'index',
    component: LoginAndRegister
  },
  {
    path: '/BlogPage',
    name: 'BlogPage',
    component: BlogPage
  },
  {
    path: '/MyHome',
    name: 'MyHome',
    component: MyHome
  },
  {
    path: '/Square',
    name: 'Square',
    component: BlogSquare
  },
  {
    path: '/test',
    name: 'test',
    component: experimentTest
  },
]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routePath
})

export default router
