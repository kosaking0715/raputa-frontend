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
        path: 'patient',
        name: 'DashboardPatient',
        component: () => import('@/views/Patient.vue'),
      },
      {
        path: 'model',
        name: 'DashboardModel',
        component: () => import('@/views/Model.vue'),
      },
      {
        path: 'monitor',
        name: 'DashboardMonitor',
        component: () => import('@/views/Monitor.vue'),
      },
      {
        path: 'data',
        name: 'DashboardData',
        component: () => import('@/views/Data.vue'),
      },
      {
        path: 'system',
        name: 'DashboardSystem',
        component: () => import('@/views/System.vue'),
      },
      {
        path: 'stats',
        name: 'DashboardStats',
        component: () => import('@/views/Stats.vue'),
      },
      { path: '', redirect: 'patient' },
    ],
  },
  { path: '/', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
