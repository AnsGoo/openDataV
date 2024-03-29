import type { CustomComponent } from './base'

interface Hooks {
  useProp: <T>(
    component: CustomComponent<T>,
    callbackProp?: (prop: string, key: string, value: any) => void,
    callbackStyle?: (key: string, value: any) => void
  ) => {
    propValue: any
  }
  useData: (component: CustomComponent, callbackProp?: (resp: any, _: string) => void) => void
}

export type { Hooks }
