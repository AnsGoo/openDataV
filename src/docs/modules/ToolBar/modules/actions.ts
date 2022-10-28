import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

// 状态管理
const projectStore = useProjectSettingStoreWithOut()

const toggleTheme = () => {
  projectStore.setNavTheme(!projectStore.darkTheme ? 'light' : 'dark')
  projectStore.setDarkTheme(!projectStore.darkTheme)
}

export { toggleTheme }
