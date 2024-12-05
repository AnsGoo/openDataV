import { set } from 'lodash-es'

import type { CustomComponent } from '../../component'

export const useProp = <T>(
  component: CustomComponent,
  options?: {
    callback?: (propKeys: Array<string>, value: any) => any
    defaultPropValue?: T
  }
): { component: CustomComponent; propValue: T } => {
  const { callback, defaultPropValue } = options || {}
  if (callback || defaultPropValue) {
    const innerCallback = (propKeys: Array<string>, value: any) => {
      set(defaultPropValue, propKeys.join('.'), value)
      callback && callback(propKeys, value)
    }
    component.setPropChangeCallback(defaultPropValue ? innerCallback : callback!)
  }
  return { component: component, propValue: component.propValue as unknown as T }
}
