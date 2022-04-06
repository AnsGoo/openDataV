import { defineStore } from 'pinia'
import store from '@/store'
import { cloneDeep } from 'lodash-es'
import type { CanvasStyleData, SnapData } from '@/types/storeTypes'
import { snapshotDb, StoreComponentData } from '@/utils/db'
import { ComponentInfo } from '@/types/component'

const useSnapShotStore = defineStore({
  id: 'snapshot',
  state: (): SnapData => ({
    latestSnapshot: undefined,
    snapshotMax: 10,
    timeHandler: undefined
  }),
  actions: {
    async undo(id?: number) {
      let snapshot: StoreComponentData | undefined
      if (id) {
        snapshot = await snapshotDb.snapshot.get(id)
      } else {
        snapshot = await snapshotDb.snapshot.orderBy('id').last()
      }
      if (snapshot) {
        this.latestSnapshot = cloneDeep(snapshot)
        return snapshot
      }
    },
    recordSnapshot(canvasData: Array<ComponentInfo>, canvasStyle: CanvasStyleData) {
      this.latestSnapshot = {
        canvasData: cloneDeep(canvasData),
        canvasStyle: cloneDeep(canvasStyle)
      }
      snapshotDb.snapshot.add(cloneDeep(this.latestSnapshot)).then(async (_) => {
        const count: number = await snapshotDb.snapshot.count()
        if (count > this.snapshotMax) {
          const snapshot: StoreComponentData = (await snapshotDb.snapshot
            .orderBy('id')
            .first()) as StoreComponentData
          await snapshotDb.snapshot.delete(snapshot!.id!)
        }
        this.timeHandler = undefined
      })
    },
    async clearSnapshot() {
      await snapshotDb.snapshot.clear()
      this.latestSnapshot = undefined
    },
    saveSnapshot(canvasData: Array<ComponentInfo>, canvasStyle: CanvasStyleData) {
      if (this.timeHandler) {
        clearTimeout(this.timeHandler)
        this.timeHandler = undefined
      } else {
        this.timeHandler = setTimeout(this.recordSnapshot, 300, canvasData, canvasStyle)
      }
    }
  }
})

// Need to be used outside the setup
export function useSnapShotStoreWithOut() {
  return useSnapShotStore(store)
}
