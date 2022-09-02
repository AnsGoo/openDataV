import { apiHttp as http } from '@/utils/http'
import type { ImageFile } from '@/types/file'
import { AxiosResponse } from 'axios'
// 获取页面数据
export const getImages = async (): Promise<AxiosResponse<ImageFile[]>> => {
  return http.get<ImageFile[]>({
    url: '/files'
  })
}
