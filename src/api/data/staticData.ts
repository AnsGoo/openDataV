import { apiHttp as http } from '@/utils/http'
import type { AxiosResponse } from 'axios'
import type { StaticDataDetail } from './type'

/**
 * 根据id 加载静态数据
 * @param id 静态数据ID
 */
export const getStaticDataApi = async (id: string): Promise<AxiosResponse<StaticDataDetail>> => {
  return http.get<StaticDataDetail>({
    url: `/dataset/static/${id}/`
  })
}

/**
 * 获取静态数据列表
 */
export const getStaticDataListApi = async (): Promise<AxiosResponse<StaticDataDetail[]>> => {
  return http.get<StaticDataDetail[]>({
    url: '/dataset/static/'
  })
}

/**
 * 更新静态数据
 * @param id 静态数据id
 * @param data 静态数据
 */
export const updateStaticDataApi = async (
  id: string,
  data: Partial<Pick<StaticDataDetail, 'name' | 'data'>>
): Promise<AxiosResponse<StaticDataDetail>> => {
  return http.put<StaticDataDetail>({
    url: `/dataset/static/${id}/`,
    data: { ...data }
  })
}

/**
 * 创建静态数据
 * @param data 静态数据
 */
export const createStaticDataApi = async (
  data: Pick<StaticDataDetail, 'name' | 'data'>
): Promise<AxiosResponse<StaticDataDetail>> => {
  return http.post<StaticDataDetail>({
    url: '/dataset/static/',
    data: data
  })
}

/**
 * 删除静态数据
 * @param id 静态数据 id
 */
export const deleteStaticDataApi = async (id: string): Promise<AxiosResponse<StaticDataDetail>> => {
  return http.post<StaticDataDetail>({
    url: `/dataset/static/${id}/`
  })
}
