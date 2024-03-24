import { TokenStorage } from '@/enum'

/**
 * 设置键值对
 */
export const setStorageItem = (key: string, value: string) => {
  switch (import.meta.env.VITE_TOKEN_STORAGE) {
    case TokenStorage.LOCALSTORAGE:
      window.localStorage.setItem(key, value)
      break
    case TokenStorage.SESSIONSTORAGE:
      window.sessionStorage.setItem(key, value)
      break
  }
}

/**
 * 查询storage下的数据
 * @param key 键
 * @returns
 */
export const getStorageItem = (key: string) => {
  switch (import.meta.env.VITE_TOKEN_STORAGE) {
    case TokenStorage.LOCALSTORAGE:
      return window.localStorage.getItem(key)
    case TokenStorage.SESSIONSTORAGE:
      return window.sessionStorage.getItem(key)
  }
}

/**
 * 删除storage下的数据
 * @param key 键
 */
export const removeStorageItem = (key: string) => {
  switch (import.meta.env.VITE_TOKEN_STORAGE) {
    case TokenStorage.LOCALSTORAGE:
      window.localStorage.removeItem(key)
      break
    case TokenStorage.SESSIONSTORAGE:
      window.sessionStorage.removeItem(key)
      break
  }
}
