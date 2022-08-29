import { defineStore } from 'pinia'
import store from '@/store'
import type { AreaData } from '@/types/storeTypes'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { createGroupStyle, calcComponentsRect, getComponentRealRect } from '@/utils/utils'
import { BaseComponent } from '@/resource/models'
import { componentList } from '@/designer/load'
import { Position } from '@/types/common'

const basicStore = useBasicStoreWithOut()

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
      return this.components.length > 1
    }
  },
  actions: {
    isActived(component: BaseComponent): boolean {
      return this.components.findIndex((el: BaseComponent) => el.id === component.id) !== -1
    },

    setAreaData(style: Position, components: BaseComponent[]) {
      this.style = style || {}
      this.components = components || []
    },

    /**
     * 向画布中增加组件
     * @param component 组件
     */
    appendComponent(component: BaseComponent): void {
      if (this.components.findIndex((ele) => ele.id === component.id) === -1) {
        this.components.push(component)
        if (this.components.length > 1) {
          this.style = { ...this.style, ...calcComponentsRect(this.components) }
        }
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
      const GroupClass = componentList['Group']
      const groupComponent: BaseComponent = new GroupClass()
      for (const prop in this.style) {
        groupComponent.change(prop, this.style[prop])
      }
      groupComponent.addComponent(this.components, true)
      createGroupStyle(groupComponent)
      this.batchDeleteComponent(this.components)
      basicStore.appendComponent(groupComponent)

      const index = basicStore.componentData.length - 1
      basicStore.setCurComponent(basicStore.componentData[index], index.toString())
      this.components = []
    },
    /**
     * 将已经放到 Group 组件数据删除，也就是在 componentData 中删除，因为它们已经放到 Group 组件中了
     * @param deleteData
     */
    batchDeleteComponent(deleteData: BaseComponent[]) {
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
     * 右对齐
     */
    flushRight() {
      const { right, items } = getComponentRealRect(this.components)
      items.forEach((el) => {
        const distance = right - el.right
        el.component.change('left', el.component.positionStyle.left + distance)
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
        el.component.change('left', el.component.positionStyle.left - distance)
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
        el.component.change('top', el.component.positionStyle.top - distance)
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
        el.component.change('top', el.component.positionStyle.top + distance)
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
        el.component.change('top', el.component.positionStyle.top + distanceY)
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
        el.component.change('left', el.component.positionStyle.left + distanceX)
      })
      basicStore.saveComponentData()
    }
  }
})

export const useComposeStoreWithOut = () => {
  return useComposeStore(store)
}
