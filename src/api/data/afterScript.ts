import { apiHttp as http } from '@/utils/http'
import { AxiosResponse } from 'axios'
import { AfterScriptDetail } from './type'

/**
 * 根据id 加载后置脚本
 * @param id
 */
export const getAfterScriptApi = async (id: string): Promise<AxiosResponse<AfterScriptDetail>> => {
  return http.get<AfterScriptDetail>({
    url: `/scripts/${id}`
  })
}

/**
 * 获取后置脚本列表
 */
export const getAfterScriptListApi = async (): Promise<AxiosResponse<AfterScriptDetail[]>> => {
  return http.get<AfterScriptDetail[]>({
    url: '/scripts'
  })
}

/**
 * 更新后置脚本
 * @param id 后置脚本id
 * @param data 后置脚本
 */
export const updateAfterScriptApi = async (
  id: string,
  data: AfterScriptDetail
): Promise<AxiosResponse<AfterScriptDetail>> => {
  return http.put<AfterScriptDetail>({
    url: `/scripts`,
    data: { ...data, id }
  })
}

/**
 * 创建后置脚本
 * @param data 后置脚本
 */
export const createAfterScriptApi = async (
  data: AfterScriptDetail
): Promise<AxiosResponse<AfterScriptDetail>> => {
  return http.post<AfterScriptDetail>({
    url: '/scripts',
    data: data
  })
}
