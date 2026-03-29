import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/edit.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router