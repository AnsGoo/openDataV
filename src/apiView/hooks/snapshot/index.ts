import { cloneDeep } from 'lodash-es'
import type { Table } from 'dexie'
import Dexie from 'dexie'

class DataSnapShotDexie extends Dexie {
  public data!: Table<{
    id?: number
    type: string
    data: any
  }>

  constructor() {
    super('data')
    this.version(2).stores({
      data: '++id, type, data' // Primary key and indexed props
    })
  }
}

class DataSnapShot {
  [x: string]: any
  public db: DataSnapShotDexie | undefined
  public key: string | undefined
  public snapshotMax = 10

  constructor(key: string, _?: boolean) {
    this.key = key
    this.db = new DataSnapShotDexie()
  }
  /**
   * save
   */
  public async save(data: any) {
    await this.db!.data.add({ type: this.key!, data: cloneDeep(data) })
    const count: number | undefined = await this.db?.data.where('type').equals(this.key!).count()
    if (count && count > this.snapshotMax) {
      const record = await this.db?.data.orderBy('id').first()
      await this.db?.data.delete(record!.id!)
    }
  }

  /**
   * 加载快照记录
   * @returns 数据快照记录
   */
  public async list(): Promise<any> {
    return this.db?.data.where('type').equals(this.key!).reverse().toArray()
  }
  /**
   * 清除快照记录
   */
  public async clear(): Promise<void> {
    await this.db?.data.where('type').equals(this.key!).delete()
  }
}

export default function useDataSnapShot(key: string, isDebug?: boolean) {
  return new DataSnapShot(key, isDebug)
}
