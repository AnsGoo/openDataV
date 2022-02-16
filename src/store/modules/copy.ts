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
      if (!basicStore.curComponent) {
        return
      }

      this.copyData = {
        data: cloneDeep(basicStore.curComponent),
        index: basicStore.curComponentIndex
      }
    },

    paste(isMouse: boolean, x?: number, y?: number): void {
      if (!this.copyData) {
        Message('请选择组件')
        return
      }

      const basicStore = useBasicStoreWithOut()
      const data = this.copyData.data

      if (isMouse) {
        data.style.top = y
        data.style.left = x
      } else {
        data.style.top += 10
        data.style.left += 10
      }

      basicStore.copyComponent(cloneDeep(data))
      if (this.isCut) {
        this.copyData = undefined
      }
    },

    cut() {
      const basicStore = useBasicStoreWithOut()
      if (!basicStore.curComponent) {
        Message('请选择组件')
        return
      }

      if (this.copyData) {
        const data = cloneDeep(this.copyData.data)
        const index = this.copyData.index
        basicStore.addComponent({ component: data, index })
        if (
          index !== undefined &&
          basicStore.curComponentIndex &&
          (basicStore.curComponentIndex as number) >= index
        ) {
          // 如果当前组件索引大于等于插入索引，需要加一，因为当前组件往后移了一位
          basicStore.curComponentIndex++
        }
      }

      this.copy()
      basicStore.deleteComponent(undefined)
      this.isCut = true
    }
  }
})

// Need to be used outside the setup
export function useCopyStoreWithOut() {
  return useCopyStore(store)
}
