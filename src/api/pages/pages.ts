import { apiHttp as http } from '@/utils/http'
import type { LayoutData, SimpleLayoutData } from './type'
import type { AxiosResponse } from 'axios'

/***
 * 获取页面数据
 * @param index 页面ID
 */
export const getPageApi = async (index: string): Promise<AxiosResponse<LayoutData>> => {
  return http.get<LayoutData>({
    url: `/page/page/${index}/`
  })
}

/***
 * 获取页面数据列表
 */
export const getPageListApi = async (): Promise<AxiosResponse<SimpleLayoutData[]>> => {
  return http.get({
    url: '/page/page/'
  })
}

/**
 * 保存页面数据
 * @param componentData 页面数据
 */
export const savePageApi = (componentData: LayoutData): Promise<AxiosResponse<LayoutData>> => {
  return http.post<LayoutData>({
    url: '/page/page/',
    data: componentData
  })
}

/**
 * 更新页面数据
 * @param id 页面ID
 * @param componentData 页面数据
 */
export const updatePageApi = (
  id: string,
  componentData: LayoutData
): Promise<AxiosResponse<LayoutData>> => {
  return http.put<LayoutData>({
    url: `/page/page/${id}/`,
    data: componentData
  })
}

/**
 * 删除页面数据
 * @param id 页面ID
 */
export const deletePageApi = (id: string): Promise<AxiosResponse<string>> => {
  return http.delete<string>({
    url: `/page/page/${id}/`
  })
}
