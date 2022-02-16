import type { AppRouteRecordRaw } from '@/router/interface'

const routes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
    meta: {
      title: '登陆',
      ignoreAuth: true
    }
  }
]

export default routes
