import type { Table } from 'dexie'
import Dexie from 'dexie'

import type { CanvasMetaData } from './state/type'

export interface StoreComponentData {
  id?: number
  canvasData?: CanvasMetaData
  canvasId: string
}

export class SnapShotDexie extends Dexie {
  snapshot!: Table<StoreComponentData>

  constructor() {
    super('snapshot')
    this.version(1).stores({
      snapshot: '++id, canvasData, canvasId' // Primary key and indexed props
    })
  }
}

export const snapshotDb = new SnapShotDexie()
