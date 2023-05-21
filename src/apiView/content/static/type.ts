import type { AfterScript } from '@/types/component'

export interface StaticRequestOptions {
  id: string
  title?: string
  script: AfterScript
}
