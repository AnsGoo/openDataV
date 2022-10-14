import type { LayoutData, SimpleLayoutData } from './type'

/**
 * 服务端数据转为前端数据
 * @param serverData
 */
export const serverPageToLayoutData = (serverData: any): LayoutData => {
  const data: LayoutData = {
    id: serverData.id,
    name: serverData.name,
    thumbnail: serverData.thumbnail,
    author: serverData.author,
    createTime: serverData.create_at,
    isHome: serverData.is_home,
    canvasData: serverData.canvas_data,
    canvasStyle: serverData.canvas_style
  }
  return data
}

/**
 * 服务端数据转为前端数据
 * @param serverData
 */
export const serverPageToSimpleLayoutData = (serverData: any): SimpleLayoutData => {
  const data: SimpleLayoutData = {
    id: serverData.id,
    name: serverData.name,
    thumbnail: serverData.thumbnail,
    author: serverData.author,
    createTime: serverData.create_at,
    isHome: serverData.is_home
  }
  return data
}

/**
 * 前端数据转为服务端数据
 * @param data
 */
export const layoutDataPageToServer = (data: LayoutData): any => {
  return {
    id: data.id,
    name: data.name,
    thumbnail: data.thumbnail,
    author: data.author,
    create_at: data.createTime,
    is_home: data.isHome,
    canvas_data: data.canvasData,
    canvas_style: data.canvasStyle
  }
}
