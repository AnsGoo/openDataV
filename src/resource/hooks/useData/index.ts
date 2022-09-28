import { BaseComponent, DataType } from '@/resource/models'
import { onMounted, onUnmounted } from 'vue'

export const useData = (component: BaseComponent, callbackData?: (data: any) => void) => {
  if (callbackData) {
    component.changeDataCallback(callbackData)
    let timer: IntervalHandle
    onMounted(async () => {
      const result = await component.requestConfig.getRespData()
      callbackData(result)
    })

    if (component.requestConfig.type === DataType.REST) {
      if (timer) {
        clearInterval(timer)
      }

      async function pullData() {
        const result = await component.requestConfig.getRespData()
        callbackData?(result)
      }
      const dataConfig = component.dataConfig
      timer = setInterval(pullData, dataConfig.interval || 300)
    }
    onUnmounted(() => {
      if (timer) {
        clearInterval(timer)
      }
    })
  }
}
