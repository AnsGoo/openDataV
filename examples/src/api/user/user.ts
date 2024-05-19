import type { AxiosResponse } from 'axios'

import type { LoginData } from '@/types/user'
import { apiHttp as http } from '@/utils/http'

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
