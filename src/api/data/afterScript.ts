import { apiHttp as http } from '@/utils/http'
import type { AxiosResponse } from 'axios'
import type { AfterScriptDetail } from './type'

/**
 * 根据id 加载后置脚本
 * @param id 脚本ID
 */
export const getAfterScriptApi = async (id: string): Promise<AxiosResponse<AfterScriptDetail>> => {
  return http.get<AfterScriptDetail>({
    url: `/dataset/script/${id}/`
  })
}

/**
 * 获取后置脚本列表
 */
export const getAfterScriptListApi = async (): Promise<AxiosResponse<AfterScriptDetail[]>> => {
  return http.get<AfterScriptDetail[]>({
    url: '/dataset/script/'
  })
}

/**
 * 更新后置脚本
 * @param id 后置脚本id
 * @param data 后置脚本
 */
export const updateAfterScriptApi = async (
  id: string,
  data: Partial<Pick<AfterScriptDetail, 'name' | 'code' | 'type'>>
): Promise<AxiosResponse<AfterScriptDetail>> => {
  return http.put<AfterScriptDetail>({
    url: `/dataset/script/${id}/`,
    data: { ...data, id }
  })
}

/**
 * 创建后置脚本
 * @param data 后置脚本
 */
export const createAfterScriptApi = async (
  data: Pick<AfterScriptDetail, 'name' | 'code' | 'type'>
): Promise<AxiosResponse<AfterScriptDetail>> => {
  return http.post<AfterScriptDetail>({
    url: '/dataset/script/',
    data: data
  })
}

/**
 * 删除后置脚本
 * @param id 脚本ID
 */
export const deleteAfterScriptApi = async (
  id: string
): Promise<AxiosResponse<AfterScriptDetail>> => {
  return http.post<AfterScriptDetail>({
    url: `/dataset/script/${id}/`
  })
}
