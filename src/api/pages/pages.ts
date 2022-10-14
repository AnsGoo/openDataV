import { apiHttp as http } from '@/utils/http'
import type { LayoutData, SimpleLayoutData } from './type'
import { AxiosResponse } from 'axios'
import {
  serverPageToLayoutData,
  layoutDataPageToServer,
  serverPageToSimpleLayoutData
} from './utils'

// 获取页面数据
export const getPageApi = async (index: string): Promise<Optional<LayoutData>> => {
  try {
    const resp = await http.get<LayoutData>({
      url: `/page/page/${index}/`
    })
    return serverPageToLayoutData(resp.data)
  } catch (e) {
    console.log(e)
  }
}

// 获取页面数据列表
export const getPageListApi = async (): Promise<SimpleLayoutData[]> => {
  try {
    const resp = await http.get({
      url: '/page/page/'
    })

    const result: SimpleLayoutData[] = []
    resp.data.forEach((el) => {
      result.push(serverPageToSimpleLayoutData(el))
    })
    return result
  } catch (e) {
    return []
  }
}

// 保存页面数据
export const savePageApi = (componentData: LayoutData): Promise<AxiosResponse<LayoutData>> => {
  return http.post<LayoutData>({
    url: '/page/page/',
    data: layoutDataPageToServer(componentData)
  })
}

// 更新页面数据
export const updatePageApi = (
  id: string,
  componentData: LayoutData
): Promise<AxiosResponse<LayoutData>> => {
  return http.put<LayoutData>({
    url: `/page/page/${id}/`,
    data: layoutDataPageToServer(componentData)
  })
}

// 删除页面数据
export const deletePageApi = (id: string): Promise<AxiosResponse<string>> => {
  return http.delete<string>({
    url: `/page/page/${id}/`
  })
}
