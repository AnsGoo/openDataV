import { apiHttp as http } from '@/utils/http'
import { AxiosResponse } from 'axios'
import { RestDataDetail } from './type'

/**
 * 根据id 加载Rest数据
 * @param id
 */
export const getRestDataApi = async (id: number): Promise<AxiosResponse<RestDataDetail>> => {
  return http.get<RestDataDetail>({
    url: `/dataset/reset/${id}/`
  })
}

/**
 * 获取Rest数据列表
 */
export const getRestDataListApi = async (): Promise<AxiosResponse<RestDataDetail[]>> => {
  return http.get<RestDataDetail[]>({
    url: '/dataset/reset/'
  })
}

/**
 * 更新Rest数据
 * @param id Rest数据id
 * @param data Rest数据
 */
export const updateRestDataApi = async (
  id: number,
  data: RestDataDetail
): Promise<AxiosResponse<RestDataDetail>> => {
  return http.put<RestDataDetail>({
    url: `/dataset/reset/${id}/`,
    data: { ...data, id }
  })
}

/**
 * 创建Rest数据
 * @param data Rest数据
 */
export const createRestDataApi = async (
  data: RestDataDetail
): Promise<AxiosResponse<RestDataDetail>> => {
  return http.post<RestDataDetail>({
    url: '/dataset/reset/',
    data: data
  })
}

/**
 * 删除Rest数据
 * @param data Rest数据
 */
export const deleteRestDataApi = async (id: number): Promise<AxiosResponse<RestDataDetail>> => {
  return http.delete<RestDataDetail>({
    url: `/dataset/reset/${id}/`
  })
}
