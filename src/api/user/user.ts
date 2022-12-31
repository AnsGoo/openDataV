import { apiHttp as http } from '@/utils/http'
import type { LoginData } from '@/types/user'
import type { AxiosResponse } from 'axios'

//
/***
 * 获取页面数据
 * @param data 登录数据
 */
export const loginApi = async (data: LoginData): Promise<AxiosResponse<string>> => {
  return http.post<string>({
    url: '/user/login',
    data: data
  })
}
