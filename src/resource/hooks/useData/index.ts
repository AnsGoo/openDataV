import { BaseComponent, DataType } from '@/resource/models'
import { onMounted, onUnmounted } from 'vue'

export const useData = (component: BaseComponent, callbackData?: (data: any) => void) => {
  component.changeDataCallback(callbackData!)
  if (callbackData && component.dataConfig) {
    component.changeDataCallback(callbackData)
    let timer: IntervalHandle = 0
    const pullData = async () => {
      const result = await component.dataConfig?.requestConfig.getRespData()
      callbackData(result)
    }
    onMounted(async () => {
      await pullData()
    })

    if (component.dataConfig?.type === DataType.REST && component.dataConfig.otherConfig.isRepeat) {
      if (timer) {
        clearInterval(timer)
      }

      const dataConfig = component.dataConfig
      timer = setInterval(pullData, dataConfig.otherConfig.interval || 300)
      onUnmounted(() => {
        if (timer) {
          clearInterval(timer)
        }
      })
    }
  }
}
