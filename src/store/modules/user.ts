import { defineStore } from 'pinia'
import store from '@/store'
import type { UserInfo } from '@/types/storeTypes'
import { TokenStorage } from '@/enum'

const useUserStore = defineStore({
  id: 'user',
  state: (): UserInfo => ({
    username: '',
    token: undefined,
    permissions: []
  }),
  getters: {
    userInfo(): UserInfo {
      let info: UserInfo = {
        username: this.username,
        token: this.token,
        permissions: []
      }
      switch (import.meta.env.VITE_TOKEN_STORAGE) {
        case TokenStorage.LOCALSTORAGE:
          const lUserinfo = window.localStorage.getItem('userInfo')
          info = lUserinfo ? JSON.parse(lUserinfo) : info
          break
        case TokenStorage.SESSIONSTORAGE:
          const sUserinfo = window.sessionStorage.getItem('userInfo')
          info = sUserinfo ? JSON.parse(sUserinfo) : info
          break
      }
      return info
    },
    userToken(): string | undefined {
      return this.userInfo.token
    },
    userName(): string {
      return this.userInfo.username
    },
    userPermissions(): string[] {
      return this.userInfo.permissions
    }
  },
  actions: {
    assignUserInfo(userInfo: UserInfo): void {
      this.username = userInfo.username
      this.token = userInfo.token
      this.permissions = userInfo.permissions
    },
    async logout(): Promise<string> {
      this.username = ''
      this.token = undefined
      this.permissions = []
      switch (import.meta.env.VITE_TOKEN_STORAGE) {
        case TokenStorage.LOCALSTORAGE:
          window.localStorage.removeItem('userInfo')
          break
        case TokenStorage.SESSIONSTORAGE:
          window.sessionStorage.removeItem('userInfo')
          break
      }
      return Promise.resolve('')
    },
    async setUserInfo(userInfo: UserInfo) {
      this.assignUserInfo(userInfo)
      switch (import.meta.env.VITE_TOKEN_STORAGE) {
        case TokenStorage.LOCALSTORAGE:
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          // info = useStorage('userInfo', userInfo, window.localStorage).value as UserInfo
          break
        case TokenStorage.SESSIONSTORAGE:
          window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
          // info = useStorage('userInfo', userInfo, window.sessionStorage).value as UserInfo
          break
      }
      return userInfo
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
