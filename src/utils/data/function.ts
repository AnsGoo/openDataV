import { ScriptType } from '@/enum'
import { notification } from '../message'
import type { CallbackType } from './type'

/**
 * 创建函数
 * @param type 函数类型
 * @param code 函数代码
 * @param args 不定参数
 * @param isDebug 是否提示用户异常
 */
export function makeFunction(
  type: ScriptType,
  code: string,
  args: string[],
  isDebug?: boolean
): CallbackType | undefined {
  switch (type) {
    case ScriptType.Javascript:
      return makeJavaScriptsFunction(code, args, isDebug)
  }
}

function makeJavaScriptsFunction(code: string, args: string[], isDebug?: boolean): CallbackType {
  try {
    const handler = new Function(...args, code) as (resp: any, options: Recordable) => any
    return { handler }
  } catch (err: any) {
    if (isDebug) {
      notification.error({
        title: '脚本语法错误',
        content: err.message,
        duration: 10000,
        closable: false
      })
    }
    return { error: err }
  }
}
