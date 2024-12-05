import { onUnmounted } from 'vue'

import type { CustomComponent } from '../../component'

export const useData = (
  component: CustomComponent,
  options?: {
    callback: (data: any, type?: string) => void
  }
) => {
  const { callback } = options || {}
  if (callback) {
    component.setDataChangeCallback(callback)
  }
  onUnmounted(() => {
    if (component.dataConfig?.dataInstance.close) {
      component.dataConfig?.dataInstance.close()
    }
  })
}
