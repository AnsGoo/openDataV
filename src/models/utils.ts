import { componentList } from '@/designer/load'
import type { ComponentDataType } from '@/types/component'
import type { BaseComponent } from './component'
import type { RestRequestOptions, StaticRequestOptions } from './data'
import { DataIntegrationMode, DataType } from './data'

export function createComponent(component: ComponentDataType): any {
  if ((component.component as string) in componentList) {
    const _class = componentList[component.component as string]
    const obj: BaseComponent = new _class(component.id, component.name, component.icon)
    obj.groupStyle = component.groupStyle
    obj.setPropValue(component)
    obj.setStyleValue(component)
    obj.dataIntegrationMode = component.dataIntegrationMode || DataIntegrationMode.SELF
    const data = component.data
    if (obj.dataIntegrationMode === DataIntegrationMode.UNIVERSAL) {
      if (data) {
        if (data.type === DataType.STATIC) {
          const options = data.requestOptions as StaticRequestOptions
          obj.changeRequestDataConfig(DataType.STATIC, {
            id: options.dataId,
            script: options.script
          })
        } else if (data.type === DataType.REST) {
          const options = data.requestOptions as RestRequestOptions
          obj.changeRequestDataConfig(DataType.REST, {
            options: options.restOptions,
            otherConfig: data.otherConfig
          })
        } else if (data.type === DataType.DEMO) {
          obj.loadDemoData()
        }
      } else {
        obj.loadDemoData()
      }
    }
    component.subComponents?.forEach((item) => {
      const subObj = createComponent(item)
      subObj.parent = obj
      obj.subComponents.push(subObj)
    })
    return obj
  }
}

export function getComponentIndexById(id: string, parent: BaseComponent) {
  return parent.subComponents.findIndex((item) => item.id === id)
}
