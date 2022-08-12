import { componentList } from '@/designer/load'

export function createComponent(component: Record<string, string | number | boolean>): any {
  console.log(componentList)
  if ((component.component as string) in componentList) {
  const _class = componentList[component.component as string]
  const obj = new _class(
    component.component,
    component.group,
    component.name,
    component.id,
    component.icon
  )
  obj.setPropValue(component)
  obj.setStyleValue(component)
  return obj
  }
}