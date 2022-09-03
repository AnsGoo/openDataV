import { apiHttp as http } from '@/utils/http'
import type { LayoutData, SimpleLayoutData } from '@/types/apiTypes'
import { cloneDeep } from 'lodash-es'
import { AxiosResponse } from 'axios'

// 获取页面数据
export const getPage = async (index: string): Promise<AxiosResponse<LayoutData>> => {
  return http.get<LayoutData>({
    url: `/pages/${index}`
  })
}

// 获取页面数据列表
export const getPagesList = async (): Promise<AxiosResponse<SimpleLayoutData[]>> => {
  return http.get<SimpleLayoutData[]>({
    url: '/pages'
  })
}

// 保存页面数据
export const savePage = (componentData: LayoutData): Promise<AxiosResponse<LayoutData>> => {
  const data: Recordable<any> = cloneDeep(componentData)
  data.canvasData = JSON.stringify(data.canvasData)
  data.canvasStyle = JSON.stringify(data.canvasStyle)
  return http.post<LayoutData>({
    url: 'pages',
    data: data
  })
}

// 更新页面数据
export const updatePage = (
  id: string,
  componentData: LayoutData
): Promise<AxiosResponse<LayoutData>> => {
  const data: Recordable<any> = cloneDeep(componentData)
  data.canvasData = JSON.stringify(data.canvasData)
  data.canvasStyle = JSON.stringify(data.canvasStyle)
  return http.put<LayoutData>({
    url: `/pages/${id}`,
    data: data
  })
}

// 删除页面数据
export const deletePage = (id: string): Promise<AxiosResponse<string>> => {
  return http.delete<string>({
    url: `/pages/${id}`
  })
}
