import { defineStore } from 'pinia'
import { store } from '@/store'
import type { SystemSetting } from '@/types/storeTypes'
import { getSystemAll } from '@/api/setting'
import type { Setting } from '@/types/apiTypes'

const useSystemSettingStore = defineStore({
  id: 'systemSetting',
  state: (): SystemSetting => ({
    setting: []
  }),
  actions: {
    systemSetting(tag: string): Setting | undefined {
      for (const item of this.setting) {
        if (item.tag === tag) {
          return item
        }
      }
    },

    getSystemSetting() {
      getSystemAll().then((res) => {
        this.setting = res
      })
    }
  }
})

export const useSystemSettingWithOut = () => {
  return useSystemSettingStore(store)
}
