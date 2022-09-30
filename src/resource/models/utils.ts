import { componentList } from '@/designer/load'
import { ComponentDataType } from '@/types/component'
import { BaseComponent } from './component'
import { DataType } from './data'

export function createComponent(component: ComponentDataType): any {
  if ((component.component as string) in componentList) {
    const _class = componentList[component.component as string]
    const obj: BaseComponent = new _class(component.id, component.name, component.icon)
    obj.groupStyle = component.groupStyle
    obj.setPropValue(component)
    obj.setStyleValue(component)
    const data = component.data
    if (data) {
      if (data.type === DataType.STATIC) {
        // const data = {
        //   originData: JSON.stringify(props.curComponent.exampleData, null, '\t'),
        //   afterData: '',
        //   protocol: DataProtocol.JSON,
        //   script: {
        //     code: 'return resp.filter(el => el.value > 50)',
        //     type: ScriptType.Javascript
        //   }
        // }
        // const callback = makeFunction(data.script.type, data.script.code, ['resp', 'options'])
        // obj.changeRequestDataConfig(DataType.STATIC, {
        // })
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
