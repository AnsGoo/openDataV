import type { StoreRequestOption } from '@/apiView/hooks/http/type'
import type { AfterScript } from '@/types/component'

export interface StaticDataDetail {
  readonly id: string
  name: string
  readonly author: string
  readonly createDate: string
  readonly updateDate: string
  data: any
}

export interface RestDataDetail extends Omit<StoreRequestOption, 'afterScript'> {
  readonly id: string
  name: string
  readonly author: string
  readonly createDate: string
  readonly updateDate: string
}

export interface AfterScriptDetail extends AfterScript {
  readonly id: string
  name: string
  readonly author?: string
  readonly createDate?: string
  readonly updateDate?: string
}
