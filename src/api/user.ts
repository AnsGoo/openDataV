import { apiHttp as http } from '@/utils/http'
import type { LoginData } from '@/types/user'
import { UserInfo } from '@/types/storeTypes'
import { AxiosResponse } from 'axios'
// 获取页面数据
export const login = async (data: LoginData): Promise<AxiosResponse<UserInfo>> => {
  return http.post<UserInfo>({
    url: '/login',
    data: data
  })
}

export const getUsers = async (): Promise<AxiosResponse<string[]>> => {
  return http.get<string[]>({
    url: '/users'
  })
}
