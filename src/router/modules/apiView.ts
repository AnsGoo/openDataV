const basicRoutes = [
  {
    path: '/apis',
    name: 'apis',
    component: () => import('@/pages/OpenApi.vue'),
    meta: {
      title: '接口管理',
      icon: 'api'
    }
  }
]

export default basicRoutes
