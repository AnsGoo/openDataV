import { defineStore } from 'pinia'
import { store } from '@/store'
import { cloneDeep } from 'lodash-es'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { SnapData } from '@/types/storeTypes'
import type { ComponentInfo } from '@/types/component'

const useSnapShotStore = defineStore({
  id: 'snapshot',
  state: (): SnapData => ({
    snapshotData: [],
    snapshotMax: 5
  }),
  actions: {
    undo() {
      const basicStore = useBasicStoreWithOut()
      const latestData: Array<ComponentInfo> = this.snapshotData.pop()
      if (latestData) {
        basicStore.setComponentData(latestData)
      }
    },
    recordSnapshot() {
      const basicStore = useBasicStoreWithOut()
      const len = this.snapshotData.length
      if (len >= this.snapshotMax) {
        this.snapshotData.shift()
      }
      this.snapshotData.push(cloneDeep(basicStore.componentData))
    },
    clearSnapshot() {
      this.snapshotData = []
    }
  }
})

// Need to be used outside the setup
export function useSnapShotStoreWithOut() {
  return useSnapShotStore(store)
}
