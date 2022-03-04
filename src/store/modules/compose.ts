import { defineStore } from 'pinia'
import { store } from '@/store'
import type { AreaData, Postion } from '@/types/storeTypes'
import type { ComponentInfo, ComponentStyle } from '@/types/component'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { decomposeComponent, createGroupStyle, calcComponentsRect } from '@/utils/utils'
import { eventBus } from '@/bus/useEventBus'

const useComposeStore = defineStore({
  id: 'compose',
  state: (): AreaData => ({
    style: {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    },
    components: []
  }),
  getters: {
    canCompose(): boolean {
      return this.components.length === 0
    },
    canDecompose(): boolean {
      const basicStore = useBasicStoreWithOut()
      // 当前组件没有锁定，并且是分组组件，就可以拆分
      if (
        basicStore.curComponent &&
        !basicStore.curComponent.isLock &&
        basicStore.curComponent.component === 'Group'
      ) {
        return false
      }
      return true
    }
  },
  actions: {
    isActived(component: ComponentInfo): boolean {
      return this.components.findIndex((el: ComponentInfo) => el.id === component.id) !== -1
    },
    setAreaData(style: Postion, components: Array<ComponentInfo>) {
      this.style = style || {}
      this.components = components || []
    },

    /**
     * 向store 中增加组件
     * @param component 组件
     */
    appendComponent(component: ComponentInfo): void {
      if (this.components.findIndex((ele) => ele.id === component.id) === -1) {
        this.components.push(component)
      }
    },
    /**
     * 组件间组合
     * @returns
     */
    compose() {
      const components: Array<ComponentInfo> = []
      const basicStore = useBasicStoreWithOut()

      if (!basicStore.editor) {
        return
      }

      if (this.style.width === 0) {
        this.style = calcComponentsRect(this.components)
      }
      this.components.forEach((component) => {
        components.push(component)
      })
      const groupComponent: ComponentInfo = {
        component: 'Group',
        id: '',
        icon: '',
        style: {
          rotate: 0,
          ...this.style
        },
        subComponents: components,
        label: ''
      }
      createGroupStyle(groupComponent)
      basicStore.addComponent(groupComponent)
      this.batchDeleteComponent(this.components)

      const index = basicStore.componentData.length - 1
      basicStore.setCurComponent(basicStore.componentData[index], index)

      // 隐藏区域
      eventBus.emit('hideArea')

      this.components = []
    },
    /**
     * 将已经放到 Group 组件数据删除，也就是在 componentData 中删除，因为它们已经放到 Group 组件中了
     * @param deleteData
     */
    batchDeleteComponent(deleteData: ComponentInfo[]) {
      const basicStore = useBasicStoreWithOut()
      deleteData.forEach((component) => {
        for (let i = 0, len = basicStore.componentData.length; i < len; i++) {
          if (component.id === basicStore.componentData[i].id) {
            basicStore.componentData.splice(i, 1)
            break
          }
        }
      })
    },
    /**
     * 取消组件间的组合
     * @returns
     */
    decompose() {
      const basicStore = useBasicStoreWithOut()
      if (!basicStore.editor) {
        return
      }

      const parentStyle: ComponentStyle = basicStore.curComponent!.style
      const components: Array<ComponentInfo> = basicStore.curComponent?.subComponents || []
      // const editorRect: DOMRect = basicStore.editor.getBoundingClientRect()
      if (components.length > 0) {
        basicStore.deleteComponent(basicStore.curComponent!.id)
        components.forEach((component) => {
          decomposeComponent(component, parentStyle)
          basicStore.addComponent(component)
        })
      }
    }
  }
})

export const useComposeStoreWithOut = () => {
  return useComposeStore(store)
}
