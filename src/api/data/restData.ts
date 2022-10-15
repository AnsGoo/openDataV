import { apiHttp as http } from '@/utils/http'
import { AxiosResponse } from 'axios'
import { RestDataDetail } from './type'

/**
 * 根据id 加载Rest数据
 * @param id
 */
export const getRestData = async (id: string): Promise<AxiosResponse<RestDataDetail>> => {
  return http.get<RestDataDetail>({
    url: '/restData',
    params: {
      id
    }
  })
}

/**
 * 获取Rest数据列表
 */
export const getRestDataList = async (): Promise<AxiosResponse<RestDataDetail[]>> => {
  return http.get<RestDataDetail[]>({
    url: '/restDataList'
  })
}

/**
 * 更新Rest数据
 * @param id Rest数据id
 * @param data Rest数据
 */
export const updateRestData = async (
  id: string,
  data: RestDataDetail
): Promise<AxiosResponse<RestDataDetail>> => {
  return http.put<RestDataDetail>({
    url: `/restData`,
    data: { ...data, id }
  })
}

/**
 * 创建Rest数据
 * @param data Rest数据
 */
export const createRestData = async (
  data: RestDataDetail
): Promise<AxiosResponse<RestDataDetail>> => {
  return http.post<RestDataDetail>({
    url: '/restData',
    data: data
  })
}
