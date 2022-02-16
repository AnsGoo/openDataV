import { defineStore } from 'pinia'
import { store } from '@/store'
import { noticeAlert } from '@/utils/utils'
import { AlarmLevel } from '@/enum'
import { findIndex } from 'lodash-es'
import type { WSAlertDataType, WSData } from '@/types/wsTypes'

const useWsDataStore = defineStore({
  id: 'wsdata',
  state: (): WSData => ({
    alertData: [],
    actualData: []
  }),
  getters: {
    alertList(): WSAlertDataType[] {
      return this.alertData
    }
  },
  actions: {
    addData(key: string, data: WSAlertDataType) {
      if (key === 'alert') {
        this.setAlertData(data)
      }
    },
    setAlertData(payload: WSAlertDataType) {
      if (
        findIndex(
          this.alertData,
          (item) =>
            item &&
            item.TagName === payload.TagName &&
            item.AlarmType === payload.AlarmType &&
            item.Level == payload.Level
        ) === -1
      ) {
        // 如果报警数量超过10条，则删除最早的一条
        if (this.alertData.length >= 10) {
          this.alertData.shift()
        }
        this.alertData.push(payload)

        // 严重级别，执行报警
        if (payload.Level === AlarmLevel.VeryUrgent) {
          noticeAlert(payload)
        }
      }
    }
  }
})

export const useWsDataStoreWithOut = () => {
  return useWsDataStore(store)
}
