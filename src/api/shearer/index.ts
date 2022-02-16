import { apiHttp as http } from '@/utils/http'
import { ComponentData, BasicFetchResult } from '@/types/apiTypes'

// 获取页面数据
export const getComponents = () => {
  return http.get<BasicFetchResult<ComponentData>>({
    url: '/guntong.json'
  })
}
