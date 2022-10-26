import type { StoreRequestOption } from '@/apiView/hooks/http/type'
import type { AfterScript } from '@/types/component'

export interface StaticDataDetail {
  id?: string
  name: string
  author?: string
  createDate?: string
  updateDate?: string
  data?: any
}

export interface RestDataDetail extends Omit<StoreRequestOption, 'afterScript'> {
  id: string
  name: string
  author?: string
  createDate?: string
  updateDate?: string
}

export interface AfterScriptDetail extends AfterScript {
  readonly id: string
  name: string
  readonly author?: string
  readonly createDate?: string
  readonly updateDate?: string
}
