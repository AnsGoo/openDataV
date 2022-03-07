import { ComponentData } from '@/types/apiTypes'
import Dexie, { Table } from 'dexie'

export interface StoreComponentData extends ComponentData {
  id?: number
}

export class SnapShotDexie extends Dexie {
  snapshot!: Table<StoreComponentData>

  constructor() {
    super('snapshot')
    this.version(1).stores({
      snapshot: '++id, canvasData, canvasStyle' // Primary key and indexed props
    })
  }
}

export const snapshotDb = new SnapShotDexie()
