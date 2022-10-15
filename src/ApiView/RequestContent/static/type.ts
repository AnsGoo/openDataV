import { AfterScript } from '@/apiView/hooks/http/type'

export interface StaticRequestOptions {
  dataId: string
  title?: string
  script: AfterScript
}
