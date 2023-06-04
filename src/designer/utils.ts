import { componentList } from '@/designer/load'
import useDataState from '@/designer/state/data'
import { DataIntegrationMode } from '@/enum/data'
import type { CustomComponent } from '@/models'
import type { Position } from '@/types/common'
import type { ComponentDataType, ComponentRequestDataType } from '@/types/component'
import { calcComponentAxis } from '@/utils/utils'

const componentDataHandler = (componentObj: CustomComponent, data?: ComponentRequestDataType) => {
  const dataState = useDataState()
  if (!data) {
    componentObj.loadDemoData()
    return
  }
  const dataHandler = dataState.getDataComponent(data.type).handler
  const { options } = data.requestOptions!
  const otherConfig = data.otherConfig || {}
  const dataConfig = {
    type: data.type,
    requestConfig: new dataHandler(options),
    otherConfig: otherConfig
  }
  componentObj.changeRequestDataConfig(dataConfig)
}

export function createComponent(component: ComponentDataType): any {
  if ((component.component as string) in componentList) {
    const _class = componentList[component.component as string]
    const obj: CustomComponent = new _class(component.id, component.name, component.icon)
    obj.groupStyle = component.groupStyle
    obj.setPropValue({ propValue: component.propValue })
    obj.setStyleValue({ style: component.style })
    obj.dataIntegrationMode = component.dataIntegrationMode || DataIntegrationMode.SELF
    const data = component.data
    if (obj.dataIntegrationMode === DataIntegrationMode.UNIVERSAL) {
      componentDataHandler(obj, data)
    }
    component.subComponents?.forEach((item) => {
      const subObj = createComponent(item)
      subObj.parent = obj
      obj.subComponents.push(subObj)
    })
    return obj
  }
}

export function getComponentIndexById(id: string, parent: CustomComponent) {
  return parent.subComponents.findIndex((item) => item.id === id)
}

/**
 * 给定区域获取该区域范围内的所有组件和包含该这些组件的最小区域
 * @param rect 区域范围
 * @param componentData 所有组件数据
 *
 *@return {components: CustomComponent[], rect: Position} components 所有组件， minRect 最小区域
 */
export const getSelectComponents = (
  rect: Position,
  componentData: CustomComponent[]
): { components: Array<CustomComponent>; rect: Position } | undefined => {
  const selectedComponents: Array<CustomComponent> = []
  const leftSet: Set<number> = new Set()
  const topSet: Set<number> = new Set()
  const rightSet: Set<number> = new Set()
  const bottomSet: Set<number> = new Set()

  // 计算所有的组件数据，判断是否在选中区域内
  componentData.forEach((component) => {
    // 获取位置大小信息：left, top, width, height
    const { width, height, left, top, rotate } = component.style
    const componentRect: Position = calcComponentAxis({
      width,
      height,
      left,
      top,
      rotate
    })
    if (
      componentRect.left >= rect.left &&
      componentRect.right <= rect.right &&
      componentRect.top >= rect.top &&
      componentRect.bottom <= rect.bottom
    ) {
      selectedComponents.push(component)
      leftSet.add(componentRect.left)
      topSet.add(componentRect.top)
      rightSet.add(componentRect.right)
      bottomSet.add(componentRect.bottom)
    }
  })

  if (selectedComponents.length > 0) {
    const left = Math.min(...leftSet)
    const right = Math.max(...rightSet)
    const top = Math.min(...topSet)
    const bottom = Math.max(...bottomSet)
    return {
      components: selectedComponents,
      rect: { left, right, top, bottom }
    }
  }
}
