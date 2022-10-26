import type { AfterScript } from '@/types/component'

export interface StaticRequestOptions {
  dataId: string
  title?: string
  script: AfterScript
}
