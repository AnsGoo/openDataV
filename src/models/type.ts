export interface RequestResponse<T> {
  status: number
  data: any
  afterData: T
  headers?: Recordable<string>
}
