import { cloneDeep } from 'lodash-es'
import { reactive } from 'vue'

import type { SnapshotData } from '../db'
import { snapshotDb } from '../db'
import type { CanvasMetaData, SnapData } from './type'

export class SnapshotState {
  public state = reactive<SnapData>({
    latestSnapshot: undefined,
    snapshotMax: 10,
    timeHandler: undefined,
    cursor: 0
  })
  private canvasId = ''
  constructor(canvasId: string) {
    this.canvasId = canvasId
  }

  get latestSnapshot(): SnapshotData | undefined {
    return this.state.latestSnapshot
  }
  set latestSnapshot(snapshot: SnapshotData | undefined) {
    this.state.latestSnapshot = snapshot
  }

  get timeHandler(): TimeoutHandle | undefined {
    return this.state.timeHandler
  }
  set timeHandler(timeHandler: TimeoutHandle | undefined) {
    this.state.timeHandler = timeHandler
  }

  get snapshotMax(): number {
    return this.state.snapshotMax
  }
  set snapshotMax(snapshotMax: number) {
    this.state.snapshotMax = snapshotMax
  }
  get cursor(): number {
    return this.state.cursor
  }
  set cursor(cursor: number) {
    this.state.cursor = cursor
  }
  async latestRecord() {
    const query = snapshotDb.snapshot.where('canvasId').equals(this.canvasId)
    const snapshots = await query.sortBy('id')
    return snapshots.at(-1)
  }
  /**
   * 上一次记录
   * @returns 快照
   */
  async lastRecord() {
    let snapshot: SnapshotData | undefined
    const query = snapshotDb.snapshot.where('canvasId').equals(this.canvasId)
    const snapshots = await query.sortBy('id')
    const index = snapshots.findIndex((snapshot) => {
      snapshot.id === this.cursor
    })
    if (index === -1) {
      return
    }

    if (index === 0) {
      snapshot = snapshots.at(0)
    } else if (index === snapshots.length) {
      snapshot = snapshots.at(index - 1)
    }

    if (snapshot) {
      this.cursor = snapshot.id!
      this.latestSnapshot = cloneDeep(snapshot)
      return snapshot
    }
  }
  /**
   * 下一次快照
   * @returns 快照
   */
  async nextRecord() {
    let snapshot: SnapshotData | undefined
    const query = snapshotDb.snapshot.where('canvasId').equals(this.canvasId)
    const snapshots = await query.sortBy('id')
    const index = snapshots.findIndex((snapshot) => {
      snapshot.id === this.cursor
    })
    if (index === -1) {
      return
    }

    if (index === snapshots.length - 1) {
      snapshot = snapshots.at(-1)
    } else if (index === snapshots.length) {
      snapshot = snapshots.at(index + 1)
    }
    if (snapshot) {
      this.cursor = snapshot.id!
      this.latestSnapshot = cloneDeep(snapshot)
      return snapshot
    }
  }
  /**
   * 记录快照
   * @param canvasData 组件数据
   * @param canvasStyle 画布样式
   */
  recordSnapshot(canvasData: CanvasMetaData) {
    // 改变值
    this.latestSnapshot = {
      canvasData: cloneDeep(canvasData),
      canvasId: this.canvasId
    }
    snapshotDb.snapshot.add(cloneDeep(this.latestSnapshot)).then(async (_) => {
      const query = snapshotDb.snapshot.where('canvasId').equals(this.canvasId)
      const snapshots = await query.sortBy('id')
      if (snapshots.length > this.snapshotMax) {
        await snapshotDb.snapshot.delete(snapshots[0].id!)
      }
      if (snapshots && snapshots.length > 0) {
        this.cursor = snapshots[snapshots.length - 1].id!
      }
      this.timeHandler = undefined
    })
  }
  /**
   * 清空快照
   */
  async clearSnapshot() {
    await snapshotDb.snapshot.clear()
    this.latestSnapshot = undefined
  }
  /**
   * 保存记录
   * @param canvasData 组件数据
   * @param canvasStyle 组件样式
   * @param dataSlotters  数据插槽
   */
  saveSnapshot(canvasData: CanvasMetaData, canvasId: string) {
    if (this.timeHandler) {
      clearTimeout(this.timeHandler)
    }

    const data = JSON.parse(JSON.stringify({ canvasData }))
    this.timeHandler = setTimeout(this.recordSnapshot, 300, data, canvasId)
  }
}
