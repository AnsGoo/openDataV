import type { CustomComponent } from 'open-data-v/models'
import { onMounted, onUnmounted } from 'vue'

export const useData = (
  component: CustomComponent,
  callbackData?: (data: any, type?: string) => void
) => {
  onMounted(() => {
    if (callbackData) {
      component.changeDataCallback(callbackData)
    }
  })
  onUnmounted(() => {
    if (component.dataConfig?.dataInstance.close) {
      component.dataConfig?.dataInstance.close()
    }
  })
}
