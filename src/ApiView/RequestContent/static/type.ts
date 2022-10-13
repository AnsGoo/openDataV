import { AfterScript } from '@/ApiView/hooks/http/type'

export interface StaticRequestOptions {
  dataId: string
  title?: string
  script: AfterScript
}
