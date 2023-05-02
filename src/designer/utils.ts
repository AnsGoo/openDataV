import { componentList } from '@/designer/load'
import type { ComponentDataType, ComponentRequestDataType } from '@/types/component'
import type { CustomComponent } from '@/models'
import { DataIntegrationMode, DataType } from '@/enum/data'

const componentDataHandler = (componentObj: CustomComponent, data?: ComponentRequestDataType) => {
  if (!data) {
    componentObj.loadDemoData()
    return
  }
  if (data.type === DataType.DEMO) {
    componentObj.changeRequestDataConfig(DataType.DEMO, {
      options: {
        data: componentObj.exampleData
      }
    })
  } else {
    const options = data.requestOptions
    componentObj.changeRequestDataConfig(data.type, {
      options: options,
      otherConfig: data.otherConfig
    })
  }
}

export function createComponent(component: ComponentDataType): any {
  if ((component.component as string) in componentList) {
    const _class = componentList[component.component as string]
    const obj: CustomComponent = new _class(component.id, component.name, component.icon)
    obj.groupStyle = component.groupStyle
    obj.setPropValue(component)
    obj.setStyleValue(component)
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
