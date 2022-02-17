import { apiHttp as http } from '@/utils/http'
import type { LayoutData, BasicFetchResult } from '@/types/apiTypes'
import { cloneDeep } from 'lodash-es'

// 获取页面数据
export const getUIComponents = async (index: string): Promise<LayoutData> => {
  return http.get<LayoutData>({
    url: `/pages/${index}`
  })
}

// 获取页面数据列表
export const getUIComponentsList = async (): Promise<LayoutData[]> => {
  return http.get<Array<LayoutData>>({
    url: '/pages'
  })
}

// 保存页面数据
export const saveUIComponents = (componentData: LayoutData): Promise<LayoutData> => {
  const data: Recordable<any> = cloneDeep(componentData)
  data.canvasData = JSON.stringify(data.canvasData)
  data.canvasStyle = JSON.stringify(data.canvasStyle)
  return http.post<LayoutData>({
    url: 'pages',
    data: data
  })
}

// 更新页面数据
export const updateUIComponents = (id: string, componentData: LayoutData): Promise<LayoutData> => {
  const data: Recordable<any> = cloneDeep(componentData)
  data.canvasData = JSON.stringify(data.canvasData)
  data.canvasStyle = JSON.stringify(data.canvasStyle)
  return http.put<LayoutData>({
    url: `/pages/${id}`,
    data: data
  })
}

// 删除页面数据
export const deleteUIComponents = (id: string): Promise<string> => {
  return http.delete<string>({
    url: `/pages/${id}`
  })
}

// 获取首页配置数据
export const getHomeData = async (): Promise<LayoutData> => {
  return http.get<LayoutData>({
    url: '/home'
  })
}

// 设置首页
export const setHomePage = (id: string) => {
  return http.put<BasicFetchResult<string>>({
    url: `/home/${id}`
  })
}

// 设置页面权限
export const setPagePermission = (id: string, permissions: string[]) => {
  return http.put<BasicFetchResult<string>>({
    url: `/permission/${id}`,
    data: { permissions }
  })
}
