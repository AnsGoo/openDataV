import { cloneDeep } from 'lodash-es'

import { uuid } from '@/utils/utils'

import type { KV, RestOption, StoreRestOption } from './type'

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
    afterScript: data.afterScript
  }
  return result
}
export const storeOptionToRequestOptions = (data: StoreRestOption): RestOption => {
  const options = cloneDeep(data)
  const result: RestOption = {
    headers: recordabletoKV(options.headers),
    params: recordabletoKV(options.params),
    data: recordabletoKV(options.data),
    method: data.method,
    url: data.url,
    afterScript: data.afterScript
  }
  return result
}
