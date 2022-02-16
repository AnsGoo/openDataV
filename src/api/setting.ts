import { apiHttp as http } from '@/utils/http'
import type { Setting } from '@/types/apiTypes'

/**
 * 获取所有系统设置
 * @returns
 */
export const getSystemAll = async (): Promise<Setting[]> => {
  return http.get<Setting[]>({ url: '/systemAll' })
}

/**
 * 获取系统设置
 */
export const getSystem = async (): Promise<Setting> => {
  return http.get<Setting>({ url: '/system' })
}

/**
 * 更新系统设置
 */
export const updateSystem = async (id: number | string, data: Setting): Promise<Setting> => {
  return http.put<Setting>({ url: `/system/${id}`, data })
}

/**
 * 创建系统设置
 */
export const createSystem = async (data: Setting): Promise<Setting> => {
  return http.post<Setting>({ url: '/system', data })
}

/**
 * 删除系统设置
 */
export const deleteSystem = async (id: number | string): Promise<string> => {
  return http.delete<string>({ url: `/system/${id}` })
}
