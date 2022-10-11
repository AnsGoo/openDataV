import { apiHttp as http } from '@/utils/http'
import { AxiosResponse } from 'axios'

export interface StaticDataDetail {
  id?: string
  name: string
  author?: string
  createDate?: string
  updateDate?: string
  data?: any
}

/**
 * 根据id 加载静态数据
 * @param id
 */
export const getStaticData = async (id: string): Promise<AxiosResponse<any>> => {
  return http.get<any>({
    url: '/staticData',
    params: {
      id
    }
  })
}

/**
 * 获取静态数据列表
 */
export const getStaticDataList = async (): Promise<AxiosResponse<StaticDataDetail[]>> => {
  return http.get<StaticDataDetail[]>({
    url: '/staticDataList'
  })
}

/**
 * 更新静态数据
 * @param id 静态数据id
 * @param data 静态数据
 */
export const updateStaticData = async (
  id: string,
  data: StaticDataDetail
): Promise<AxiosResponse<StaticDataDetail>> => {
  return http.put<StaticDataDetail>({
    url: `/staticData`,
    data: { ...data, id }
  })
}

/**
 * 创建静态数据
 * @param data 静态数据
 */
export const createStaticData = async (
  data: StaticDataDetail
): Promise<AxiosResponse<StaticDataDetail>> => {
  return http.post<StaticDataDetail>({
    url: '/staticData',
    data: data
  })
}
