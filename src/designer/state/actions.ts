import { reactive } from 'vue'

import { componentList } from '@/designer/load'
import type { CustomComponent } from '@/models'
import type { Position } from '@/types/common'
import type { AreaData } from '@/types/storeTypes'
import { calcComponentsRect, createGroupStyle, getComponentRealRect } from '@/utils/utils'

import { getSelectComponents } from '../utils'
import useCanvasState from './canvas'

const canvasState = useCanvasState()

class ActionState {
  public state = reactive<AreaData>({
    style: {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    },
    components: [],
    ids: new Set()
  })

  get style(): Position {
    return this.state.style
  }
  set style(style: Position) {
    this.state.style = style
  }

  get ids(): Set<string> {
    return this.state.ids
  }
  set ids(ids: Set<string>) {
    this.state.ids = ids
  }

  get components(): Array<CustomComponent> {
    return this.state.components
  }
  set components(components: Array<CustomComponent>) {
    this.state.components = components
  }
  get canCompose(): boolean {
    return this.components.length > 1
  }
  get hidden(): boolean {
    return this.style.width > 0
  }
  /**
   * 判断组件是否在选取的组件内
   * @param component
   */
  isActived(component: CustomComponent): boolean {
    return this.components.findIndex((el: CustomComponent) => el.id === component.id) !== -1
  }

  /**
   * 给定区域获取该区域的组件
   * @param style
   */
  setSelectComponents(position: Position) {
    const { components, rect } = getSelectComponents(position, canvasState.componentData) || {}
    if (components && rect) {
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
  }

  /**
   * 向store 中增加组件
   * @param component 组件
   */
  appendComponent(component: Optional<CustomComponent>): void {
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
  }

  /**
   * 隐藏选定区域
   */
  setHidden() {
    this.style = {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }
    this.components = []
    this.ids.clear()
  }

  /**
   * 设置已选择的矩形位置
   * @param position 位置
   */
  setPostion(position: Partial<Position>) {
    if (position.left) {
      this.style.left = Math.round(position.left)
    }

    if (position.top) {
      this.style.top = Math.round(position.top)
    }

    if (position.width) {
      this.style.width = Math.round(position.width)
    }

    if (position.height) {
      this.style.height = Math.round(position.height)
    }
  }
  /**
   * 组件间组合
   * @returns
   */
  compose() {
    if (this.style.width === 0) {
      this.style = { ...this.style, ...calcComponentsRect(this.components) }
    }
    const GroupClass = componentList['Group']
    const groupComponent: CustomComponent = new GroupClass()
    for (const prop in this.style) {
      groupComponent.change(['position', prop], this.style[prop], 'style')
    }
    groupComponent.addComponent(this.components, true)
    createGroupStyle(groupComponent)
    this.batchDeleteComponent(this.components)
    canvasState.appendComponent(groupComponent)

    const index = canvasState.componentData.length - 1
    canvasState.setCurComponent(canvasState.componentData[index], index.toString())
    this.components = []
  }
  /**
   * 将已经放到 Group 组件数据删除，也就是在 componentData 中删除，因为它们已经放到 Group 组件中了
   * @param deleteData
   */
  batchDeleteComponent(deleteData: CustomComponent[]) {
    deleteData.forEach((component) => {
      for (let i = 0, len = canvasState.componentData.length; i < len; i++) {
        if (component.id === canvasState.componentData[i].id) {
          canvasState.componentData.splice(i, 1)
          break
        }
      }
    })
    this.ids.clear()
  }
  /**
   * 右对齐
   */
  flushRight() {
    const { right, items } = getComponentRealRect(this.components)
    items.forEach((el) => {
      const distance = right - el.right
      el.component.change(['position', 'left'], el.component.positionStyle.left + distance, 'style')
    })
    canvasState.saveComponentData()
  }
  /**
   * 左对齐
   */
  flushLeft() {
    const { left, items } = getComponentRealRect(this.components)
    items.forEach((el) => {
      const distance = el.left - left
      el.component.change(['position', 'left'], el.component.positionStyle.left - distance, 'style')
    })
    canvasState.saveComponentData()
  }
  /**
   * 顶端对齐
   */
  flushTop() {
    const { top, items } = getComponentRealRect(this.components)
    items.forEach((el) => {
      const distance = el.top - top
      el.component.change(['position', 'top'], el.component.positionStyle.top - distance, 'style')
    })
    canvasState.saveComponentData()
  }
  /**
   * 底部对齐
   */
  flushBottom() {
    const { bottom, items } = getComponentRealRect(this.components)
    items.forEach((el) => {
      const distance = bottom - el.bottom
      el.component.change(['position', 'top'], el.component.positionStyle.top + distance, 'style')
    })
    canvasState.saveComponentData()
  }
  /**
   * 行对齐
   */
  flushRow() {
    const { top, bottom, items } = getComponentRealRect(this.components)
    items.forEach((el) => {
      const distanceY = (bottom + top) / 2 - el.center.y
      el.component.change(['position', 'top'], el.component.positionStyle.top + distanceY, 'style')
    })
    canvasState.saveComponentData()
  }
  /**
   * 列对齐
   */
  flushColumn() {
    const { left, right, items } = getComponentRealRect(this.components)
    items.forEach((el) => {
      const distanceX = (left + right) / 2 - el.center.x
      el.component.change(
        ['position', 'left'],
        el.component.positionStyle.left + distanceX,
        'style'
      )
    })
    canvasState.saveComponentData()
  }
}
const actionState = new ActionState()

export default function useActionState() {
  return actionState
}
