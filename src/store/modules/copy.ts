import { defineStore } from 'pinia'
import { store } from '@/store'
import { cloneDeep } from 'lodash-es'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { Message } from '@/utils/message'
import type { CopyItem } from '@/types/storeTypes'

const useCopyStore = defineStore({
  id: 'copy',
  state: (): CopyItem => ({
    copyData: undefined,
    isCut: false
  }),
  actions: {
    copy() {
      const basicStore = useBasicStoreWithOut()
      const curComponent = basicStore.curComponent || basicStore.layerComponent
      if (!curComponent) {
        return
      }
      this.copyData = cloneDeep(curComponent)
    },

    paste(isMouse: boolean, x?: number, y?: number): void {
      if (!this.copyData) {
        Message('请选择组件')
        return
      }

      const basicStore = useBasicStoreWithOut()

      if (isMouse) {
        this.copyData.style.top = y
        this.copyData.style.left = x
      } else {
        this.copyData.style.top += 10
        this.copyData.style.left += 10
      }

      basicStore.copyComponent(cloneDeep(this.copyData))
      this.copyData = undefined
    }
  }
})

// Need to be used outside the setup
export function useCopyStoreWithOut() {
  return useCopyStore(store)
}
