import type { CustomComponent } from '@open-data-v/base'
import { cloneDeep } from 'lodash-es'
import { reactive } from 'vue'

import type { StoreComponentData } from '../db'
import { snapshotDb } from '../db'
import type { ComponentDataType } from '../type'
import type { CanvasStyleData, SnapData } from './type'
import { singleton } from './utils'

class SnapshotState {
  public state = reactive<SnapData>({
    latestSnapshot: undefined,
    snapshotMax: 10,
    timeHandler: undefined,
    cursor: 0
  })

  // 当前页面ID
  private currentPageId: string = 'unsaved'
  // 每个页面的游标
  private pageCursors: Map<string, number> = new Map()

  get latestSnapshot(): StoreComponentData | undefined {
    return this.state.latestSnapshot
  }
  set latestSnapshot(snapshot: StoreComponentData | undefined) {
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
    return this.pageCursors.get(this.currentPageId) || 0
  }
  set cursor(cursor: number) {
    this.pageCursors.set(this.currentPageId, cursor)
    this.state.cursor = cursor
  }

  /**
   * 设置当前页面ID
   * @param pageId 页面ID
   */
  setCurrentPageId(pageId: string) {
    this.currentPageId = pageId || 'unsaved'
  }

  /**
   * 获取当前页面ID
   */
  getCurrentPageId(): string {
    return this.currentPageId
  }
  async latestRecord() {
    return snapshotDb.snapshot
      .where('pageId')
      .equals(this.currentPageId)
      .last()
  }
  /**
   * 上一次记录
   * @returns 快照
   */
  async lastRecord() {
    let snapshot: StoreComponentData | undefined
    if (this.cursor) {
      // 查找当前页面的上一个快照
      const snapshots = await snapshotDb.snapshot
        .where('pageId')
        .equals(this.currentPageId)
        .and(item => item.id! < this.cursor)
        .reverse()
        .limit(1)
        .toArray()
      snapshot = snapshots[0]
    } else {
      // 获取当前页面的最新快照
      snapshot = await snapshotDb.snapshot
        .where('pageId')
        .equals(this.currentPageId)
        .last()
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
    let snapshot: StoreComponentData | undefined
    if (this.cursor) {
      // 查找当前页面的下一个快照
      const snapshots = await snapshotDb.snapshot
        .where('pageId')
        .equals(this.currentPageId)
        .and(item => item.id! > this.cursor)
        .limit(1)
        .toArray()
      snapshot = snapshots[0]
    } else {
      // 获取当前页面的最新快照
      snapshot = await snapshotDb.snapshot
        .where('pageId')
        .equals(this.currentPageId)
        .last()
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
   * @param dataSlotters 数据插槽
   */
  recordSnapshot(
    canvasData: Array<CustomComponent>,
    canvasStyle: CanvasStyleData,
    dataSlotters: Array<{ type: string; config: any }>
  ) {
    // 改变值
    this.latestSnapshot = {
      canvasData: cloneDeep(canvasData),
      canvasStyle: cloneDeep(canvasStyle),
      dataSlotters: cloneDeep(dataSlotters),
      pageId: this.currentPageId // 添加页面ID
    }
    snapshotDb.snapshot.add(cloneDeep(this.latestSnapshot)).then(async (_) => {
      // 检查当前页面的快照数量
      const count: number = await snapshotDb.snapshot
        .where('pageId')
        .equals(this.currentPageId)
        .count()

      if (count > this.snapshotMax) {
        // 删除当前页面最旧的快照
        const snapshot: StoreComponentData = (await snapshotDb.snapshot
          .where('pageId')
          .equals(this.currentPageId)
          .first()) as StoreComponentData
        await snapshotDb.snapshot.delete(snapshot!.id!)
      }

      // 获取当前页面的最新快照
      const snapshot = await snapshotDb.snapshot
        .where('pageId')
        .equals(this.currentPageId)
        .last()
      if (snapshot) {
        this.cursor = snapshot.id!
      }
      this.timeHandler = undefined
    })
  }
  /**
   * 清空快照
   * @param pageId 可选的页面ID，如果不提供则清空当前页面的快照
   */
  async clearSnapshot(pageId?: string) {
    const targetPageId = pageId || this.currentPageId
    if (targetPageId === 'all') {
      // 清空所有快照
      await snapshotDb.snapshot.clear()
      this.pageCursors.clear()
    } else {
      // 清空指定页面的快照
      await snapshotDb.snapshot
        .where('pageId')
        .equals(targetPageId)
        .delete()
      this.pageCursors.delete(targetPageId)
    }

    if (targetPageId === this.currentPageId || targetPageId === 'all') {
      this.latestSnapshot = undefined
    }
  }
  /**
   * 保存记录
   * @param canvasData 组件数据
   * @param canvasStyle 组件样式
   * @param dataSlotters  数据插槽
   */
  saveSnapshot(
    canvasData: ComponentDataType[],
    canvasStyle: CanvasStyleData,
    dataSlotters: Array<{ type: string; config: any }>
  ) {
    if (this.timeHandler) {
      clearTimeout(this.timeHandler)
    }
    this.timeHandler = setTimeout(
      this.recordSnapshot.bind(this),
      300,
      canvasData,
      canvasStyle,
      dataSlotters
    )
  }
}

const State = singleton(SnapshotState)
export default function useSnapshotState() {
  return new State() as SnapshotState
}
