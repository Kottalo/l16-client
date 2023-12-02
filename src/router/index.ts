// Composables
import { supabase } from '@/services/supabase'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const user = (await supabase.auth.getUser()).data?.user

  if (!user && to.name !== 'Login') {
    return '/login'
  }
  else if (user && to.name === 'Login') {
    return '/home'
  }
})

export default router
