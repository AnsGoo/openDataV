import type { Method } from 'axios'
import Axios from 'axios'

export interface requestConfig {
  method: Method
  url: string
  headers: Recordable
  params: Recordable
  data: Recordable
}
export interface RequestInstance {
  request: (config: requestConfig) => Promise<any>
}
export const useRequest = () => {
  return Axios
}
