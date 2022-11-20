import { defineStore } from 'pinia'
import projectSetting from '@/setting/projectSetting'

// region 刷新时与编辑后关闭标签时提示
function confirmBeforeunload(e: BeforeUnloadEvent) {
  e.preventDefault()
  e.returnValue = ''
  return ''
}
// endregion

export const useToolbar = defineStore('toolbar', () => {
  // 当值为 true 代表事件已经存在，不需要添加；为 false 代表事件不存在，需要添加
  let eventExist = false
  /**
   * 切换保存状态
   * @param {boolean} need 是否需要保存？
   */
  function needCloseAlert(need = false) {
    if (projectSetting.enableCloseAlert) {
      need ? addConfirm() : removeConfirm()
      eventExist = need
    }
  }

  // 添加确认
  function addConfirm() {
    // 预防重复添加
    if (!eventExist) {
      window.addEventListener('beforeunload', confirmBeforeunload)
    }
  }

  // 移除确认
  function removeConfirm() {
    window.removeEventListener('beforeunload', confirmBeforeunload)
  }

  return {
    needCloseAlert
  }
})
