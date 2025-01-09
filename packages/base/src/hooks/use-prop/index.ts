import type { CustomComponent } from '../../component'

export const useProp = <T>(
  component: CustomComponent,
  options?: {
    callback?: (propValue: T) => any
    defaultPropValue?: T
  }
): { component: CustomComponent; propValue: T } => {
  const { callback, defaultPropValue } = options || {}
  if (callback || defaultPropValue) {
    const innerCallback = (propValue: T) => {
      defaultPropValue && Object.assign(defaultPropValue, propValue)
      callback && callback(propValue)
    }
    component.setPropChangeCallback(defaultPropValue ? innerCallback : callback!)
  }
  return { component: component, propValue: component.propValue as unknown as T }
}
