import Axios from 'axios'

export interface RequestConfig {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
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
