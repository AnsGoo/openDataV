import { StoreRequestOption } from '@/ApiView/hooks/http/type'

export interface StaticDataDetail {
  id?: string
  name: string
  author?: string
  createDate?: string
  updateDate?: string
  data?: any
}

export interface RestDataDetail extends Omit<StoreRequestOption, 'afterScript'> {
  id?: string
  name: string
  author?: string
  createDate?: string
  updateDate?: string
}
