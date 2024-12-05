import type { CustomComponent } from './base'

interface Hooks {
  useProp: <T>(
    component: CustomComponent<T>,
    options?: {
      callback?: (prop: string, key: string, value: any) => void
      defaultPropValue?: T
    }
  ) => {
    propValue: any
  }
  useData: (component: CustomComponent, options?:{callback:(data:any)=> void}
}

export type { Hooks }
