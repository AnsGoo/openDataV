import { apiHttp as http } from '@/utils/http'
import type { LoginData } from '@/types/user'
import { UserInfo } from '@/types/storeTypes'
import { AxiosResponse } from 'axios'

// 获取页面数据
export const loginApi = async (data: LoginData): Promise<AxiosResponse<UserInfo>> => {
  return http.post<UserInfo>({
    url: '/login',
    data: data
  })
}
