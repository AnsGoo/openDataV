import { uuid } from '@/utils/utils'
import { cloneDeep } from 'lodash-es'
import type { KV, RequestOption, StoreRequestOption } from './type'

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

export const requestOptionsToStore = (options: RequestOption): StoreRequestOption => {
  const data = cloneDeep(options)
  const result: StoreRequestOption = {
    headers: KVToRecordable(options.headers),
    params: KVToRecordable(options.params),
    data: KVToRecordable(options.data),
    method: data.method,
    url: data.url,
    afterScript: data.afterScript
  }
  return result
}
export const storeOptionToRequestOptions = (data: StoreRequestOption): RequestOption => {
  const options = cloneDeep(data)
  const result: RequestOption = {
    headers: recordabletoKV(options.headers),
    params: recordabletoKV(options.params),
    data: recordabletoKV(options.data),
    method: data.method,
    url: data.url,
    afterScript: data.afterScript
  }
  return result
}
