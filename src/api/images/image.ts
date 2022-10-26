import { apiHttp as http } from '@/utils/http'
import type { ImageFile } from './type'
import type { AxiosResponse } from 'axios'

// 获取页面数据
export const getImageListApi = async (): Promise<AxiosResponse<ImageFile[]>> => {
  return http.get<ImageFile[]>({
    url: '/image/image/'
  })
}

export const uploadImageFileApi = async (
  file: FormData
): Promise<AxiosResponse<{ url: string }>> => {
  return http.post<{ url: string }>({
    url: '/image/uploadImage/',
    data: file,
    headers: {
      CONTENT_TYPE: 'multipart/form-data'
    }
  })
}
