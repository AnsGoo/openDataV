import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { snapshotDb } from '../../db'
import useSnapshotState from '../snapshot'

describe('按页面快照管理', () => {
  let snapshotState: ReturnType<typeof useSnapshotState>

  beforeEach(async () => {
    snapshotState = useSnapshotState()
    // 清空数据库
    await snapshotDb.snapshot.clear()
  })

  afterEach(async () => {
    // 清空数据库
    await snapshotDb.snapshot.clear()
  })

  it('saveSnapshot 应该保存到当前页面的快照库', async () => {
    snapshotState.setCurrentPageId('synthetic-page')
    snapshotState.saveSnapshot(
      [],
      { width: 800, height: 600, background: { backgroundColor: '#fff' } },
      []
    )

    await new Promise((resolve) => setTimeout(resolve, 350))

    const snapshot = await snapshotState.latestRecord()
    expect(snapshot?.pageId).toBe('synthetic-page')
    expect(snapshot?.canvasStyle.width).toBe(800)
  })

  it('应该能够为不同页面创建独立的快照', async () => {
    // 设置页面1
    snapshotState.setCurrentPageId('page1')
    
    // 创建页面1的快照
    snapshotState.recordSnapshot(
      [],
      { width: 1920, height: 1080, background: { backgroundColor: '#fff' } },
      []
    )

    // 等待快照保存完成
    await new Promise(resolve => setTimeout(resolve, 100))

    // 设置页面2
    snapshotState.setCurrentPageId('page2')
    
    // 创建页面2的快照
    snapshotState.recordSnapshot(
      [],
      { width: 1366, height: 768, background: { backgroundColor: '#000' } },
      []
    )

    // 等待快照保存完成
    await new Promise(resolve => setTimeout(resolve, 100))

    // 验证页面1的快照
    snapshotState.setCurrentPageId('page1')
    const page1Snapshot = await snapshotState.latestRecord()
    expect(page1Snapshot?.pageId).toBe('page1')
    expect(page1Snapshot?.canvasStyle.width).toBe(1920)

    // 验证页面2的快照
    snapshotState.setCurrentPageId('page2')
    const page2Snapshot = await snapshotState.latestRecord()
    expect(page2Snapshot?.pageId).toBe('page2')
    expect(page2Snapshot?.canvasStyle.width).toBe(1366)
  })

  it('应该能够独立清空特定页面的快照', async () => {
    // 创建两个页面的快照
    snapshotState.setCurrentPageId('page1')
    snapshotState.recordSnapshot([], { width: 1920, height: 1080, background: {} }, [])
    
    snapshotState.setCurrentPageId('page2')
    snapshotState.recordSnapshot([], { width: 1366, height: 768, background: {} }, [])

    // 等待快照保存完成
    await new Promise(resolve => setTimeout(resolve, 100))

    // 清空页面1的快照
    await snapshotState.clearSnapshot('page1')

    // 验证页面1的快照已清空
    snapshotState.setCurrentPageId('page1')
    const page1Snapshot = await snapshotState.latestRecord()
    expect(page1Snapshot).toBeUndefined()

    // 验证页面2的快照仍然存在
    snapshotState.setCurrentPageId('page2')
    const page2Snapshot = await snapshotState.latestRecord()
    expect(page2Snapshot?.pageId).toBe('page2')
  })

  it('应该为每个页面维护独立的游标', async () => {
    // 为页面1创建多个快照
    snapshotState.setCurrentPageId('page1')
    snapshotState.recordSnapshot([], { width: 1920, height: 1080, background: {} }, [])
    await new Promise(resolve => setTimeout(resolve, 100))
    snapshotState.recordSnapshot([], { width: 1920, height: 1080, background: {} }, [])
    await new Promise(resolve => setTimeout(resolve, 100))

    // 为页面2创建快照
    snapshotState.setCurrentPageId('page2')
    snapshotState.recordSnapshot([], { width: 1366, height: 768, background: {} }, [])
    await new Promise(resolve => setTimeout(resolve, 100))

    // 在页面1中执行撤销操作
    snapshotState.setCurrentPageId('page1')
    const page1LastSnapshot = await snapshotState.lastRecord()
    expect(page1LastSnapshot?.pageId).toBe('page1')

    // 切换到页面2，游标应该独立
    snapshotState.setCurrentPageId('page2')
    const page2LatestSnapshot = await snapshotState.latestRecord()
    expect(page2LatestSnapshot?.pageId).toBe('page2')
  })
})
