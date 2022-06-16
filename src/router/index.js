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
        path: '/auth/add',
        name: 'authAdd',
        component: () => import('../views/AuthAdd.vue')
      },
      {
        path: '/auth/edit/:id',
        name: 'authEdit',
        component: () => import('../views/AuthEdit.vue')
      },
      {
        path: '/score',
        name: 'score',
        component: () => import('../views/ScoreView.vue')
      },
      {
        path: '/score/add',
        name: 'scoreAdd',
        component: () => import('../views/ScoreAdd.vue')
      }
    ]
  },
  
  {
    path: '/user',
    name: 'home',
    component: () => import('../views/User/HomeView.vue'),
    children: [
      {
        path: '/',
        name: 'dash',
        component: () => import('../views/User/DashView.vue')
      },
      {
        path: '/user/score',
        name: 'score',
        component: () => import('../views/User/ScoreView.vue')
      },
      {
        path: '/user/score/old',
        name: 'DashView',
        component: () => import('../views/User/DashView.vue')
      },
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
