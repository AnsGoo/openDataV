import type { Method } from 'axios'
import Axios from 'axios'

export interface RequestConfig {
  method: Method
  url: string
  headers: Record<string, any>
  params: Record<string, any>
  data: Record<string, any>
}
export interface RequestInstance {
  request: (config: RequestConfig) => Promise<any>
}
export const useRequest = () => {
  return Axios
}
