import type { Method } from 'axios'

import type { AfterScript } from '@/types/component'

export interface StaticDataDetail {
  readonly id: string
  name: string
  readonly author: string
  readonly createDate: string
  readonly updateDate: string
  data: any
}

export interface RestDataDetail {
  method: Method
  url: string
  headers: Recordable
  params: Recordable
  data: Recordable
  afterScript?: AfterScript
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
