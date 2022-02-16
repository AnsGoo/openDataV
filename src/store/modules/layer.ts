import { defineStore } from 'pinia'
import { store } from '@/store'
import { swap } from '@/utils/utils'
import { Message } from '@/utils/message'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { ComponentInfo } from '@/types/component'

const useLayerStore = defineStore({
  id: 'layer',
  actions: {
    upComponent() {
      const basicStore = useBasicStoreWithOut()
      const index: number = basicStore.curComponentIndex as number
      // 上移图层 index，表示元素在数组中越往后
      if (index < basicStore.componentData.length - 1) {
        swap(basicStore.componentData, index, index + 1)
      } else {
        Message('已经到顶了')
      }
    },

    downComponent() {
      const basicStore = useBasicStoreWithOut()
      // 下移图层 index，表示元素在数组中越往前
      const index: number = basicStore.curComponentIndex as number
      if (index > 0) {
        swap(basicStore.componentData, index, index - 1)
      } else {
        Message('已经到底了')
      }
    },

    bottomComponent() {
      const basicStore = useBasicStoreWithOut()
      const componentData: ComponentInfo[] = basicStore.componentData
      const index: number = basicStore.curComponentIndex as number
      if (index > 0) {
        const myComponments: ComponentInfo[] = componentData.splice(index, 1)
        componentData.unshift(myComponments[0])
      } else {
        Message('已经到底了')
      }
    },

    topComponent() {
      const basicStore = useBasicStoreWithOut()
      const componentData: ComponentInfo[] = basicStore.componentData
      const index: number = basicStore.curComponentIndex as number
      // 置底
      if (index < componentData.length - 1) {
        const myComponments: ComponentInfo[] = componentData.splice(index, 1)
        componentData.push(myComponments[0])
      } else {
        Message('已经到顶了')
      }
    }
  }
})

// Need to be used outside the setup
export function useLayerStoreWithOut() {
  return useLayerStore(store)
}
