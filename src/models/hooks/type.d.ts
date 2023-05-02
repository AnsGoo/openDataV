import type { CustomComponent } from '@/models'
import type { DataType } from '@/enum/data'

export interface HooksType {
  useProp: <T>(
    component: CustomComponent<T>,
    callbackProp?: (prop: string, key: string, value: any) => void,
    callbackStyle?: (key: string, value: any) => void
  ) => {
    propValue: any
  }
  useData: (component: CustomComponent, callbackProp?: (resp: any, _: DataType) => void) => void
}
