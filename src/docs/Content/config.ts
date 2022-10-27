const tutorialConfig = [
  {
    label: '快速开始',
    icon: 'data',
    key: 'QuickStart',
    children: [
      { label: '介绍', key: 'intro', compoenet: () => import('@/docs/quick-start/index.vue') },
      { label: '设计', key: 'design', compoenet: () => import('@/docs/quick-start/design.vue') },
      { label: '发布', key: 'public', compoenet: () => import('@/docs/quick-start/public.vue') }
    ]
  },
  {
    label: '设计器',
    icon: 'designer',
    key: 'Designer',
    children: [
      {
        label: '组合/拆分',
        key: 'group',
        compoenet: () => import('@/docs/manage/assign.vue')
      },
      {
        label: '拉伸/拖拽/旋转',
        key: 'action',
        compoenet: () => import('@/docs/manage/index.vue')
      },
      {
        label: '复制/粘贴/导入',
        key: 'action',
        compoenet: () => import('@/docs/manage/create.vue')
      },
      { label: '选中', key: 'selected', compoenet: () => import('@/docs/manage/create.vue') },
      { label: '属性', key: 'attr', compoenet: () => import('@/docs/manage/edit.vue') },
      { label: '样式', key: 'style', compoenet: () => import('@/docs/manage/other.vue') },
      { label: '图层', key: 'layer', compoenet: () => import('@/docs/manage/create.vue') }
    ]
  }
]

export { tutorialConfig }
