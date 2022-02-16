import { apiHttp as http } from '@/utils/http'
import type { ImageFile } from '@/types/file'
// 获取页面数据
export const getImages = async (): Promise<ImageFile[]> => {
  return http.get<ImageFile[]>({
    url: '/files'
  })
}
