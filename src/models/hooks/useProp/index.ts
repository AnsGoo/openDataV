import type { CustomComponent } from '@/models'

export const useProp = <T>(
  component: CustomComponent,
  callbackProp?: (propKeys: Array<string>, value: any) => void,
  callbackStyle?: (propKeys: Array<string>, value: any) => void
): { component: CustomComponent; propValue: T } => {
  if (callbackProp) {
    component.changePropCallback(callbackProp)
  }

  if (callbackStyle) {
    component.changeStyleCallback(callbackStyle)
  }
  return { component: component, propValue: component.propValue as unknown as T }
}
