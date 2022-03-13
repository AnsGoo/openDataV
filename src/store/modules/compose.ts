import { defineStore } from 'pinia'
import { store } from '@/store'
import type { AreaData } from '@/types/storeTypes'
import type { ComponentInfo, ComponentStyle, DOMRectStyle } from '@/types/component'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import {
  decomposeComponent,
  createGroupStyle,
  calcComponentsRect,
  uuid,
  getComponentRealRect
} from '@/utils/utils'
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
      return this.components.length > 1
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
        if (this.components.length > 1) {
          this.style = { ...this.style, ...calcComponentsRect(this.components) }
        }
        console.log(this.style)
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
        display: true,
        icon: '',
        style: this.style,
        subComponents: cloneDeep(this.components),
        label: ''
      }
      createGroupStyle(groupComponent)
      this.batchDeleteComponent(this.components)
      basicStore.appendComponent(groupComponent)

      const index = basicStore.componentData.length - 1
      basicStore.setCurComponent(basicStore.componentData[index])
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
    },
    /**
     * 右对齐
     */
    flushRight() {
      const { right, items } = getComponentRealRect(this.components)
      items.forEach((el) => {
        const distance = right - el.right
        el.component.style.left = el.component.style.left + distance
      })
      basicStore.saveComponentData()
    },
    /**
     * 左对齐
     */
    flushLeft() {
      const { left, items } = getComponentRealRect(this.components)
      items.forEach((el) => {
        const distance = el.left - left
        el.component.style.left = el.component.style.left - distance
      })
      basicStore.saveComponentData()
    },
    /**
     * 顶端对齐
     */
    flushTop() {
      const { top, items } = getComponentRealRect(this.components)
      items.forEach((el) => {
        const distance = el.top - top
        el.component.style.top = el.component.style.top - distance
      })
      basicStore.saveComponentData()
    },
    /**
     * 底部对齐
     */
    flushBottom() {
      const { bottom, items } = getComponentRealRect(this.components)
      items.forEach((el) => {
        const distance = bottom - el.bottom
        el.component.style.top = el.component.style.top + distance
      })
      basicStore.saveComponentData()
    },
    /**
     * 行对齐
     */
    flushRow() {
      const { top, bottom, items } = getComponentRealRect(this.components)
      items.forEach((el) => {
        const distanceY = (bottom + top) / 2 - el.center.y
        el.component.style.top = el.component.style.top + distanceY
      })
      basicStore.saveComponentData()
    },
    /**
     * 列对齐
     */
    flushColumn() {
      const { left, right, items } = getComponentRealRect(this.components)
      items.forEach((el) => {
        const distanceX = (left + right) / 2 - el.center.x
        el.component.style.left = el.component.style.left + distanceX
      })
      basicStore.saveComponentData()
    }
  }
})

export const useComposeStoreWithOut = () => {
  return useComposeStore(store)
}
