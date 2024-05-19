import type { CustomComponent } from '../../component'

export const useProp = <T>(
  component: CustomComponent,
  callbackProp?: (propKeys: Array<string>, value: any) => any,
  callbackStyle?: (propKeys: Array<string>, value: any) => any
): { component: CustomComponent; propValue: T } => {
  if (callbackProp) {
    component.setPropChangeCallback(callbackProp)
  }

  if (callbackStyle) {
    component.setStyleChangeCallback(callbackStyle)
  }
  return { component: component, propValue: component.propValue as unknown as T }
}
