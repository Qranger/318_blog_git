import { createRouter, createWebHistory } from 'vue-router'


const routePath = [
  {
    path: '/',
    name: 'index',
    component: LoginAndRegister
  },
]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routePath
})

export default router
