import type { CustomComponent, Position } from '@open-data-v/base'
import { reactive } from 'vue'

import type { Location } from '../type'
import { getComponentRealRect, getSelectComponents, progressiveCalcRect } from '../utils'
import type { CanvasState } from './canvas'
import type { SelectedRectData } from './type'

export class ActionState {
  public state = reactive<SelectedRectData>({
    rect: {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    },
    components: [],
    ids: new Set()
  })

  private canvasState: CanvasState

  constructor(canvasState: CanvasState) {
    this.canvasState = canvasState
  }

  get rect(): Position {
    return this.state.rect
  }
  set rect(rect: Position) {
    this.state.rect = rect
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
    return this.rect.width > 0
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
   * @param position
   */
  setSelectedComponents(position: Location) {
    const { components, rect } = getSelectComponents(position, this.canvasState.componentData) || {}
    if (components && rect) {
      this.rect.left = rect.left
      this.rect.top = rect.top
      this.rect.width = rect.right - rect.left
      this.rect.height = rect.bottom - rect.top
      this.components = components || []
      this.ids.clear()
      this.components.forEach((item) => this.ids.add(item.id))
    } else {
      this.clearSelected()
    }
  }

  /**
   * 向选中区中增加组件
   * @param component 组件
   */
  appendSelectedComponent(component: Optional<CustomComponent>): void {
    if (!component) {
      return
    }
    if (!this.ids.has(component.id)) {
      this.components.push(component)
      this.ids.add(component.id)
      progressiveCalcRect(component, this.rect)
    }
  }

  /**
   * 清空选定区域
   */
  clearSelected() {
    this.rect = {
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
  setSelectedArea(position: Partial<Position>) {
    if (position.left) {
      this.rect.left = Math.round(position.left)
    }

    if (position.top) {
      this.rect.top = Math.round(position.top)
    }

    if (position.width) {
      this.rect.width = Math.round(position.width)
    }

    if (position.height) {
      this.rect.height = Math.round(position.height)
    }
  }
  /**
   * 组合选中组件
   * @returns
   */
  composeSelectedComponent() {
    this.canvasState.compose(this.components)
    this.clearSelected()
  }

  /**
   * 右对齐
   */
  flushRight() {
    const { right, items } = getComponentRealRect(this.components)
    items.forEach((el) => {
      const distance = right - el.right
      el.component.changePosition('left', el.component.position.left + distance)
    })
    this.canvasState.saveComponentData()
    this.clearSelected()
  }
  /**
   * 左对齐
   */
  flushLeft() {
    const { left, items } = getComponentRealRect(this.components)
    items.forEach((el) => {
      const distance = el.left - left
      el.component.changePosition('left', el.component.position.left - distance)
    })
    this.canvasState.saveComponentData()
    this.clearSelected()
  }
  /**
   * 顶端对齐
   */
  flushTop() {
    const { top, items } = getComponentRealRect(this.components)
    items.forEach((el) => {
      const distance = el.top - top
      el.component.changePosition('top', el.component.position.top - distance)
    })
    this.canvasState.saveComponentData()
    this.clearSelected()
  }
  /**
   * 底部对齐
   */
  flushBottom() {
    const { bottom, items } = getComponentRealRect(this.components)
    items.forEach((el) => {
      const distance = bottom - el.bottom
      el.component.changePosition('top', el.component.position.top + distance)
    })
    this.canvasState.saveComponentData()
    this.clearSelected()
  }
  /**
   * 行对齐
   */
  flushRow() {
    const { top, bottom, items } = getComponentRealRect(this.components)
    items.forEach((el) => {
      const distanceY = (bottom + top) / 2 - el.center.y
      el.component.changePosition('top', el.component.position.top + distanceY)
    })
    this.canvasState.saveComponentData()
    this.clearSelected()
  }
  /**
   * 列对齐
   */
  flushColumn() {
    const { left, right, items } = getComponentRealRect(this.components)
    items.forEach((el) => {
      const distanceX = (left + right) / 2 - el.center.x
      el.component.changePosition('left', el.component.position.left + distanceX)
    })
    this.canvasState.saveComponentData()
    this.clearSelected()
  }
}
