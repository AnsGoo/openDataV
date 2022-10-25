import { ContentTypeEnum } from '@/enum'
import type { AxiosRequestConfig, Canceler } from 'axios'

/**
 * 默认配置
 */
export const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_BASE_URL ? import.meta.env.VITE_APP_BASE_URL : '',
  //10秒超时
  timeout: 10000,
  headers: { 'Content-Type': ContentTypeEnum.JSON }
}

export function httpConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config) {
    return defaultConfig
  }

  const { headers } = config
  if (headers && typeof headers === 'object') {
    defaultConfig.headers = {
      ...defaultConfig.headers,
      ...headers
    }
  }
  return { ...excludeProps(config, 'headers'), ...defaultConfig }
}

// 取消指定的属性
export function excludeProps<T extends { [key: string]: any }>(
  origin: T,
  prop: string
): { [key: string]: T } {
  return Object.keys(origin)
    .filter((key) => !prop.includes(key))
    .reduce((res, key) => {
      res[key] = origin[key]
      return res
    }, {} as { [key: string]: T })
}

export type CancelTokenType = { cancelKey: string; cancelExecutor: Canceler }

export interface ResultType<T = any> {
  data: T
  code: number
  message: string
}
