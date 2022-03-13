import { defineStore } from 'pinia'
import { store } from '@/store'
import { cloneDeep } from 'lodash-es'
import type { SnapData } from '@/types/storeTypes'
import { snapshotDb, StoreComponentData } from '@/utils/db'
import { ComponentInfo } from '@/types/component'

const useSnapShotStore = defineStore({
  id: 'snapshot',
  state: (): SnapData => ({
    latestSnapshot: undefined,
    snapshotMax: 5
  }),
  actions: {
    async undo() {
      const snapshot: StoreComponentData | undefined = await snapshotDb.snapshot
        .orderBy('id')
        .last()
      if (snapshot) {
        this.latestSnapshot = cloneDeep(snapshot)
        return snapshot
      }
    },
    async recordSnapshot(canvasData:Array<ComponentInfo>,canvasStyle:CanvasStyleData) {
      this.latestSnapshot = {
        canvasData: cloneDeep(componentData),
        canvasStyle: cloneDeep(canvasStyleData)
      }
      await snapshotDb.snapshot.add(cloneDeep(this.latestSnapshot))
      const count: number = await snapshotDb.snapshot.count()
      if (count > this.snapshotMax) {
        const snapshot: StoreComponentData = (await snapshotDb.snapshot
          .orderBy('id')
          .first()) as StoreComponentData
        await snapshotDb.snapshot.delete(snapshot!.id!)
      }
    },
    async clearSnapshot() {
      await snapshotDb.snapshot.clear()
      this.latestSnapshot = undefined
    }
  }
})

// Need to be used outside the setup
export function useSnapShotStoreWithOut() {
  return useSnapShotStore(store)
}
