export const uuid = (hasHyphen?: string) => {
  return (
    hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
  ).replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 复制文本到剪贴板

export const copyText = (text: string): void => {
  const copy = (event: ClipboardEvent) => {
    event.clipboardData?.setData('text', text)
    event.preventDefault()
  }
  document.addEventListener('copy', copy)
  document.execCommand('copy')
  document.removeEventListener('copy', copy)
}

/**
 * 从剪切板获取文本
 * @returns  文本
 */
export const pasteText = (): string => {
  let textData
  const paste = (event: ClipboardEvent) => {
    textData = event.clipboardData?.getData('text')
    event.preventDefault()
  }
  document.addEventListener('paste', paste)
  document.execCommand('paste')
  document.removeEventListener('paste', paste)
  return textData
}

export const loadScript = async (src: string) => {
  return new Promise(function (resolve, reject) {
    let shouldAppend = false
    let el: any = document.querySelector('script[src="' + src + '"]')
    if (!el) {
      el = document.createElement('script')
      el.type = 'text/javascript'
      el.async = true
      el.src = src
      shouldAppend = true
    } else if (el.hasAttribute('data-loaded')) {
      resolve(el)
      return
    }
    el.addEventListener('error', reject)
    el.addEventListener('abort', reject)
    el.addEventListener('load', function loadScriptHandler() {
      el.setAttribute('data-loaded', true)
      resolve(el)
    })
    if (shouldAppend) document.head.appendChild(el)
  })
}

// 获取操作系统
export function getOS() {
  /**
   * 直接获取，实验属性
   * @see https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/platform#browser_compatibility
   */
  // @ts-expect-error 仅 chromium 核心 >=93 版本支持 navigator.userAgentData.platform 属性，兼容性查看上方链接
  const platform = window.navigator?.userAgentData?.platform || window.navigator.platform
  const userAgent = window.navigator.userAgent

  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'macOS']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']

  let os: 'unknown' | 'MacOS' | 'IOS' | 'Windows' | 'Android' | 'Linux' = 'unknown'

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'MacOS'
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'IOS'
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows'
  } else if (/Android/.test(userAgent)) {
    os = 'Android'
  } else if (/Linux/.test(platform)) {
    os = 'Linux'
  }

  return os
}

/**
 * 小驼峰转中划线命名
 * @param key 需要转化的字符串
 * @returns 结果
 */
export function camel2snake(key) {
  return key
    .replace(/[A-Z]/g, function (s) {
      return ' ' + s.toLowerCase()
    })
    .trim()
    .replaceAll(' ', '-')
}

export const Logger = console
