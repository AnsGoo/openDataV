import type { BaseComponent, DataType } from '@/models'

export interface HooksType {
  useProp: <T>(
    component: BaseComponent<T>,
    callbackProp?: (prop: string, key: string, value: any) => void,
    callbackStyle?: (key: string, value: any) => void
  ) => {
    propValue: any
  }
  useData: (component: BaseComponent, callbackProp?: (resp: any, _: DataType) => void) => void
}
