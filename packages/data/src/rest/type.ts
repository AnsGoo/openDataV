export interface KV {
  key: string
  value: string
  disable: boolean
  id: string
}

export interface StoreRestOption {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
  url: string
  headers: Record<string, any>
  params: Record<string, any>
  data: Record<string, any>
  otherConfig: {
    isRepeat: boolean
    interval: number
  }
}

export interface RestResponse<T = string> {
  status: number
  data: T
  headers?: Record<string, string>
  [key: string]: any
}

export interface RestOption {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
  url: string
  headers: Array<KV>
  params: Array<KV>
  data: Array<KV>
  otherConfig: {
    isRepeat: boolean
    interval: number
  }
}
