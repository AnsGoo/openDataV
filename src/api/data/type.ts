import { StoreRequestOption } from '@/apiView/hooks/http/type'
import { AfterScript } from '@/types/component'

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
  id: string
  name: string
  author?: string
  createDate?: string
  updateDate?: string
}
