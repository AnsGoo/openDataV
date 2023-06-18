import { onMounted, onUnmounted } from 'vue'

import type { CustomComponent } from '@/models'

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
    if (component.dataConfig?.requestConfig.close) {
      component.dataConfig?.requestConfig.close()
    }
  })
}
