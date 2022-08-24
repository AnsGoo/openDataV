import { defineStore } from 'pinia'
import store from '@/store'

interface DesignSettingState {
  //深色主题
  darkTheme: boolean
  //系统风格
  appTheme: string
  //系统内置风格
  appThemeList: string[]
}

const useDesignSettingStore = defineStore({
  id: 'app-design-setting',
  state: (): DesignSettingState => ({
    darkTheme: false,
    appTheme: '#2d8cf0',
    appThemeList: [
      '#2d8cf0',
      '#0960bd',
      '#0084f4',
      '#009688',
      '#536dfe',
      '#ff5c93',
      '#ee4f12',
      '#0096c7',
      '#9c27b0',
      '#ff9800',
      '#FF3D68',
      '#00C1D4',
      '#71EFA3',
      '#171010',
      '#78DEC7',
      '#1768AC',
      '#FB9300',
      '#FC5404'
    ]
  }),
  getters: {
    getDarkTheme(): boolean {
      return this.darkTheme
    },
    getAppTheme(): string {
      return this.appTheme
    },
    getAppThemeList(): string[] {
      return this.appThemeList
    },
    getIconColor(): string {
      return this.darkTheme ? '#eee' : '#333'
    }
  },
  actions: {}
})

// Need to be used outside the setup
export function useDesignSettingWithOut() {
  return useDesignSettingStore(store)
}
