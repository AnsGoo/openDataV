import { apiHttp as http } from '@/utils/http'
import type { LoginData } from '@/types/user'
import { UserInfo } from '@/types/storeTypes'
// 获取页面数据
export const login = async (data: LoginData): Promise<UserInfo> => {
  return http.post<UserInfo>({
    url: '/login',
    data: data
  })
}

export const getUsers = async (): Promise<string[]> => {
  return http.get<string[]>({
    url: '/users'
  })
}
