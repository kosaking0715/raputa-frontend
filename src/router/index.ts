import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import DashboardLayout from '@/components/DashboardLayout.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: 'home',
        name: 'DashboardHome',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'model',
        name: 'DashboardModel',
        component: () => import('@/views/Model.vue'),
      },
      {
        path: 'patient',
        name: 'DashboardPatient',
        component: () => import('@/views/Patient.vue'),
      },
      {
        path: 'data',
        name: 'DashboardData',
        component: () => import('@/views/Data.vue'),
      },
      {
        path: 'monitor',
        name: 'DashboardMonitor',
        component: () => import('@/views/Monitor.vue'),
      },
      { path: '', redirect: 'home' },
    ],
  },
  { path: '/', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
