import { KV } from './type'

export const KVToRecordable = (values: Array<KV>): Recordable => {
  const data = {}
  for (const i of values) {
    if (i.key) {
      data[i.key] = i.value
    }
  }
  return data
}
