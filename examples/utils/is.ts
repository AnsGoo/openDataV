/**
 * @description 用于书写判断语句
 */

import { getOS } from '@/utils/utils'

export const isWindows = getOS().toLowerCase() === 'windows'

export const isMac = getOS().toLowerCase() === 'macos'
