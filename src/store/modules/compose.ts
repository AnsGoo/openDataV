import { defineStore } from 'pinia'
import { store } from '@/store'
import type { AreaData } from '@/types/storeTypes'
import type { ComponentInfo, ComponentStyle, DOMRectStyle } from '@/types/component'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { decomposeComponent, createGroupStyle, calcComponentsRect, uuid } from '@/utils/utils'
import { eventBus } from '@/bus/useEventBus'
import { cloneDeep } from 'lodash-es'
const basicStore = useBasicStoreWithOut()

const useComposeStore = defineStore({
  id: 'compose',
  state: (): AreaData => ({
    style: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      rotate: 0
    },
    components: []
  }),
  getters: {
    canCompose(): boolean {
      return this.components.length === 0
    },
    canDecompose(): boolean {
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

    setAreaData(style: DOMRectStyle, components: Array<ComponentInfo>) {
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
      if (this.style.width === 0) {
        this.style = { ...this.style, ...calcComponentsRect(this.components) }
      }
      const groupComponent: ComponentInfo = {
        component: 'Group',
        id: uuid(),
        icon: '',
        style: this.style,
        subComponents: cloneDeep(this.components),
        label: ''
      }
      createGroupStyle(groupComponent)
      basicStore.appendComponent(groupComponent)
      this.batchDeleteComponent(this.components)

      const index = basicStore.componentData.length - 1
      basicStore.setCurComponent(basicStore.componentData[index])

      // 隐藏区域
      eventBus.emit('hideArea')

      this.components = []
    },
    /**
     * 将已经放到 Group 组件数据删除，也就是在 componentData 中删除，因为它们已经放到 Group 组件中了
     * @param deleteData
     */
    batchDeleteComponent(deleteData: ComponentInfo[]) {
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
      const parentStyle: ComponentStyle = basicStore.curComponent!.style
      const components: Array<ComponentInfo> = basicStore.curComponent?.subComponents || []
      if (components.length > 0) {
        const index: number = basicStore.getComponentIndexById(basicStore.curComponent!.id)
        basicStore.removeComponent(index.toString())
        components.forEach((component) => {
          decomposeComponent(component, parentStyle)
          basicStore.appendComponent(component)
        })
      }
    }
  }
})

export const useComposeStoreWithOut = () => {
  return useComposeStore(store)
}
