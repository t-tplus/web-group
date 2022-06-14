import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/',
        name: 'dash',
        component: () => import('../views/DashView.vue')
      },
      {
        path: '/auth',
        name: 'auth',
        component: () => import('../views/AuthView.vue')
      },
      {
        path: '/score',
        name: 'score',
        component: () => import('../views/ScoreView.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router