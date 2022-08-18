import { componentList } from '@/designer/load'
import { BaseComponent } from './component'
import { ComponentDataType } from './types'

export function createComponent(component: ComponentDataType): any {
  if ((component.component as string) in componentList) {
    const _class = componentList[component.component as string]
    const obj: BaseComponent = new _class(component.id, component.name, component.icon)
    obj.groupStyle = component.groupStyle
    obj.setPropValue(component)
    obj.setStyleValue(component)

    component.subComponents.forEach((item) => {
      const subObj = createComponent(item)
      obj.subComponents.push(subObj)
    })
    return obj
  }
}

export function getComponentIndexById(id: string, parent: BaseComponent) {
  return parent.subComponents.findIndex((item) => item.id === id)
}
