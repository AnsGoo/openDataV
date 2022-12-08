import { onMounted, onUnmounted } from 'vue'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

const useProject = useProjectSettingStoreWithOut()
export const useUnloadAlert = () => {
  const beforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = ''
  }

  onMounted(() => {
    if (useProject.enableCloseAlert) {
      window.addEventListener('beforeunload', beforeUnload)
    }
  })

  onUnmounted(() => {
    removeAlert()
  })

  const removeAlert = () => {
    window.removeEventListener('beforeunload', beforeUnload)
  }
  return removeAlert
}
