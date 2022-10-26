import { defineStore } from 'pinia'
import store from '@/store'
import type { AreaData } from '@/types/storeTypes'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { createGroupStyle, calcComponentsRect, getComponentRealRect } from '@/utils/utils'
import type { BaseComponent } from '@/resource/models'
import { componentList } from '@/designer/load'
import type { Position } from '@/types/common'
import { getSelectComponents } from '../utils/utils'

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
    components: [],
    ids: new Set()
  }),
  getters: {
    canCompose(): boolean {
      return this.components.length > 1
    },
    hidden(): boolean {
      return this.style.width > 0
    }
  },
  actions: {
    isActived(component: BaseComponent): boolean {
      return this.components.findIndex((el: BaseComponent) => el.id === component.id) !== -1
    },

    setSelectComponents(style: Position) {
      const res = getSelectComponents(style, basicStore.componentData)
      if (res) {
        const { components, rect } = res
        this.style.left = rect.left
        this.style.top = rect.top
        this.style.width = rect.right - rect.left
        this.style.height = rect.bottom - rect.top
        this.components = components || []
        this.ids.clear()
        this.components.forEach((item) => this.ids.add(item.id))
      } else {
        this.setHidden()
      }
    },

    /**
     * 向store 中增加组件
     * @param component 组件
     */
    appendComponent(component: Optional<BaseComponent>): void {
      if (!component) {
        return
      }

      if (!this.ids.has(component.id)) {
        this.components.push(component)
        this.ids.add(component.id)
        if (this.components.length > 1) {
          this.style = { ...this.style, ...calcComponentsRect(this.components) }
        }
      }
    },
    setHidden() {
      this.style = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
      this.components = []
      this.ids.clear()
    },
    setPostion(position: Partial<Position>) {
      if (position.left) {
        this.style.left = position.left
      }

      if (position.top) {
        this.style.top = position.top
      }

      if (position.width) {
        this.style.width = position.width
      }

      if (position.height) {
        this.style.height = position.height
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
      this.ids.clear()
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
