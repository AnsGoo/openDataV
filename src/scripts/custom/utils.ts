import type { CallbackType } from '../type'

/**
 * 创建函数
 * @param type 函数类型
 * @param code 函数代码
 * @param args 不定参数
 * @param isDebug 是否提示用户异常
 */
export function makeFunction(
  type: string,
  code: string,
  args: string[],
  isDebug?: boolean
): CallbackType | undefined {
  switch (type) {
    case 'Javascript':
      return makeJavaScriptsFunction(code, args, isDebug)
  }
}

function makeJavaScriptsFunction(code: string, args: string[], _isDebug?: boolean): CallbackType {
  try {
    const handler = new Function(...args, code) as (resp: any, options: Recordable) => any
    return { handler }
  } catch (err: any) {
    return { error: err }
  }
}
