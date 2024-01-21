export interface AfterScript {
  code: string
}

export interface StaticDataDetail {
  readonly id: string
  name: string
  readonly author: string
  readonly createDate: string
  readonly updateDate: string
  data: any
}

export interface RestDataDetail {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
  url: string
  headers: Record<string, any>
  params: Record<string, any>
  data: Record<string, any>
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
