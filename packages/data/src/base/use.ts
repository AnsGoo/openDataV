import type { DataInstance } from '@open-data-v/base'
import type { Ref } from 'vue'
import { onMounted } from 'vue'

export function useDataFill<T>(dataInstance: DataInstance, dataOptionRef: Ref<T>) {
  onMounted(async () => {
    getOriginData()
  })

  const getOriginData = () => {
    const { options } = dataInstance.toJSON()
    if (!options) {
      return
    }

    const keys = Object.keys(dataOptionRef.value || {})
    keys.forEach((key) => {
      dataOptionRef.value[key] = options[key]
    })
  }
  const changeOptions = () => {
    dataInstance.updateOption({ options: dataOptionRef.value })
  }
  return {
    changeOptions
  }
}
