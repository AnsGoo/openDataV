import type { Method } from 'axios'
import Axios from 'axios'

export interface RequestConfig {
  method: Method
  url: string
  headers: Recordable
  params: Recordable
  data: Recordable
}
export interface RequestInstance {
  request: (config: RequestConfig) => Promise<any>
}
export const useRequest = () => {
  return Axios
}
