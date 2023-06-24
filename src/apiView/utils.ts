import { cloneDeep } from 'lodash-es'

import { ScriptType } from './const'
import type { CallbackType, KV, RestOption, StoreRestOption } from './type'

export const Logger = console

export const uuid = (hasHyphen?: string) => {
  return (
    hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
  ).replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const KVToRecordable = (values: Array<KV>): Recordable => {
  const data = {}
  for (const i of values) {
    if (i.key && !i.disable) {
      data[i.key] = i.value
    }
  }
  return data
}

export const recordabletoKV = (data: Recordable): Array<KV> => {
  return Object.keys(data).map((el) => {
    return {
      key: el,
      value: data[el],
      disable: false,
      id: uuid()
    }
  })
}

export const requestOptionsToStore = (options: RestOption): StoreRestOption => {
  const data = cloneDeep(options)
  const result: StoreRestOption = {
    headers: KVToRecordable(options.headers),
    params: KVToRecordable(options.params),
    data: KVToRecordable(options.data),
    method: data.method,
    url: data.url,
    otherConfig: data.otherConfig
  }
  return result
}
export const storeOptionToRequestOptions = (data: StoreRestOption): RestOption => {
  const options = cloneDeep(data)
  const result: RestOption = {
    headers: recordabletoKV(options.headers),
    params: recordabletoKV(options.params),
    data: recordabletoKV(options.data),
    method: options.method,
    url: options.url,
    otherConfig: options.otherConfig
  }
  return result
}

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

function makeJavaScriptsFunction(code: string, args: string[], _isDebug?: boolean): CallbackType {
  try {
    const handler = new Function(...args, code) as (resp: any, options: Recordable) => any
    return { handler }
  } catch (err: any) {
    return { error: err }
  }
}
