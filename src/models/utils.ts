import type { MetaContainerItem, MetaForm } from '@/types/component'

export const uuid = (hasHyphen?: string) => {
  return (
    hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
  ).replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const getObjProp = (
  obj: Array<MetaContainerItem> | Array<MetaForm>,
  propKeys: Array<string>,
  start = 0
): MetaForm | MetaContainerItem => {
  // @ts-ignore
  const chidObj = obj.find((item) => item.prop === propKeys[start])
  if (chidObj && chidObj.children && start < propKeys.length) {
    return getObjProp(chidObj.children, propKeys, start + 1)
  }
  return chidObj
}
