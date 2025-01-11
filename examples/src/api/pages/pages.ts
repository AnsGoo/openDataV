import type { AxiosResponse } from 'axios'

import { apiHttp as http } from '@/utils/http'

import type { CanvasMetaData, SimpleCanvasMetaData } from './type'

/***
 * 获取页面数据
 * @param index 页面ID
 */
export const getPageApi = async (index: string): Promise<AxiosResponse<CanvasMetaData>> => {
  return http.get<CanvasMetaData>({
    url: `/page/page/${index}/`
  })
}

/***
 * 获取页面数据列表
 */
export const getPageListApi = async (): Promise<AxiosResponse<SimpleCanvasMetaData[]>> => {
  return http.get({
    url: '/page/page/'
  })
}

/**
 * 保存页面数据
 * @param componentData 页面数据
 */
export const savePageApi = (componentData: CanvasMetaData): Promise<AxiosResponse<CanvasMetaData>> => {
  return http.post<CanvasMetaData>({
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
  componentData: CanvasMetaData
): Promise<AxiosResponse<CanvasMetaData>> => {
  return http.put<CanvasMetaData>({
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
