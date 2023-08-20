import { exportCanvas, importCanvas, recoveryDraft, setShowEm, undo } from 'open-data-v'
import { h } from 'vue'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'

import LogoView from '@/components/LogoView'
import type { ToolBarItemType } from '@/components/ToolBar'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

import showIconCard from './iconList'
import showSaveCard from './save'
import ThemeIcon from './themeSwitch/ThemeIcon.vue'

const projectStore = useProjectSettingStoreWithOut()

const toggleTheme = () => {
  projectStore.setNavTheme(!projectStore.darkTheme ? 'light' : 'dark')
  projectStore.setDarkTheme(!projectStore.darkTheme)
}
export default function useToolBars(
  router: Router,
  route: RouteLocationNormalizedLoaded
): Array<ToolBarItemType> {
  return [
    {
      label: '首页',
      action: async (_e: MouseEvent) => {
        await router.push({
          name: 'Pages'
        })
      },
      icon: () =>
        h(LogoView, {
          width: '40px'
        }),
      divider: true
    },
    {
      label: '保存',
      action: () => showSaveCard(route.params.index as string),
      icon: 'save'
    },
    {
      label: '预览',
      action: (_e: MouseEvent) => {
        const { href } = router.resolve('/preview')
        window.open(href, '_blank')
      },
      icon: 'preview'
    },
    {
      label: '撤销',
      action: undo,
      icon: 'back'
    },
    {
      label: '恢复',
      action: recoveryDraft,
      icon: 'next'
    },
    {
      label: '导出',
      action: () => exportCanvas((route.params.index as string) || ''),
      icon: 'download'
    },
    {
      label: '导入',
      action: importCanvas,
      icon: 'upload'
    },
    {
      label: '全屏',
      action: () => {
        const el: HTMLElement | null = document.querySelector('#editor')
        if (document.fullscreenEnabled && el) {
          el.requestFullscreen()
        }
      },
      icon: 'fullScreen'
    },
    {
      label: '坐标',
      action: setShowEm,
      icon: 'axis'
    },
    {
      label: '图标',
      action: showIconCard,
      icon: 'cube',
      location: 'right'
    },
    {
      label: '主题',
      action: toggleTheme,
      icon: () => h(ThemeIcon),
      location: 'right'
    },
    {
      label: 'GitHub',
      action: () => {
        window.open('https://github.com/AnsGoo/openDataV', '_blank')
      },
      icon: 'github',
      location: 'right'
    }
  ]
}
