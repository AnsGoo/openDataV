/**
 * @description 用于书写判断语句
 */

export function getOS(): string {
  const userAgent = window.navigator.userAgent
  /**
   * 直接获取，实验属性
   * @see https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/platform
   */
  // @ts-expect-error chromium 核心 >=93 版本支持 navigator?.userAgentData?.platform 属性，详情查看上方链接
  const platform = window.navigator?.userAgentData?.platform || window.navigator.platform
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'macOS']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']

  let os = 'unknown'

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'MacOS'
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS'
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows'
  } else if (/Android/.test(userAgent)) {
    os = 'Android'
  } else if (/Linux/.test(platform)) {
    os = 'Linux'
  }

  return os
}

export const isWindows = getOS().toLowerCase() === 'windows'

export const isMac = getOS().toLowerCase() === 'macos'
