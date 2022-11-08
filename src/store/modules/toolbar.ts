import { defineStore } from 'pinia'
import store from '@/store'
import { onUnmounted, ref, watch } from 'vue'

// region 刷新时与编辑后关闭标签时提示
function confirmBeforeunload(e: BeforeUnloadEvent) {
  e.preventDefault()
  e.returnValue = ''
  return ''
}
// endregion

const useToolbar = defineStore('toolbar', () => {
  const isSaved = ref(false)

  function changeSavedState(saved = true) {
    isSaved.value = saved
  }

  watch(isSaved, (saved) => {
    if (saved) {
      window.removeEventListener('beforeunload', confirmBeforeunload)
    } else {
      window.addEventListener('beforeunload', confirmBeforeunload)
    }
  })

  onUnmounted(() => {
    window.removeEventListener('beforeunload', confirmBeforeunload)
  })

  return {
    isSaved,
    changeSavedState
  }
})

// Need to be used outside the setup
export function useToolbarWithOut() {
  return useToolbar(store)
}
