const basicRoutes = [
  {
    path: '/apis',
    name: 'apis',
    component: () => import('@/pages/OpenApi.vue'),
    meta: {
      title: '接口管理',
      icon: 'page'
    }
  }
]

export default basicRoutes
