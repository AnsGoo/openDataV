import { defineStore } from 'pinia'
import store from '@/store'

export interface IheaderSetting {
  bgColor: string
  fixed: boolean
  isReload: boolean
}

export interface ImenuSetting {
  minMenuWidth: number
  menuWidth: number
  fixed: boolean
  collapsed: boolean
}

export interface IcrumbsSetting {
  show: boolean
  showIcon: boolean
}

interface ProjectSettingState {
  navTheme: string //导航风格
  headerSetting: IheaderSetting //顶部设置
  showFooter: boolean //页脚
  menuSetting: ImenuSetting //多标签
  crumbsSetting: IcrumbsSetting //面包屑
  isPageAnimate: boolean //是否开启路由动画
  pageAnimateType: string //路由动画类型
}

const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: (): ProjectSettingState => ({
    navTheme: 'dark',
    headerSetting: {
      //背景色
      bgColor: '#fff',
      //固定顶部
      fixed: true,
      //显示重载按钮
      isReload: true
    },
    showFooter: true,
    menuSetting: {
      //最小宽度
      minMenuWidth: 64,
      //菜单宽度
      menuWidth: 200,
      //固定菜单
      fixed: true,
      // 折叠菜单
      collapsed: false
    },
    crumbsSetting: {
      //是否显示
      show: true,
      //显示图标
      showIcon: false
    },
    isPageAnimate: true,
    pageAnimateType: 'zoom-fade'
  }),
  getters: {
    getNavTheme(): string {
      return this.navTheme
    },
    getHeaderSetting(): IheaderSetting {
      return this.headerSetting
    },
    getShowFooter(): boolean {
      return this.showFooter
    },
    getMenuSetting(): ImenuSetting {
      return this.menuSetting
    },
    getIsPageAnimate(): boolean {
      return this.isPageAnimate
    },
    getPageAnimateType(): string {
      return this.pageAnimateType
    },
    getCrumbsSetting(): IcrumbsSetting {
      return this.crumbsSetting
    }
  },
  actions: {
    setNavTheme(value: string): void {
      this.navTheme = value
    }
  }
})

// Need to be used outside the setup
export function useProjectSettingStoreWithOut() {
  return useProjectSettingStore(store)
}
