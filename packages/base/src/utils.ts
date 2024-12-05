import { isFunction, isUndefined } from 'lodash-es'

import type { IContainerItem, MetaForm } from './type'

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
  obj: Array<IContainerItem> | Array<MetaForm>,
  propKeys: Array<string>,
  start = 0
): MetaForm | IContainerItem | undefined => {
  // @ts-ignore
  const chidObj = obj.find((item) => item.prop === propKeys[start])
  if (chidObj && chidObj.children && start < propKeys.length) {
    return getObjProp(chidObj.children, propKeys, start + 1)
  }
  return chidObj
}

/**
 * 根据表单配置，生成初始化表单值
 * @param formItems 表单配置项
 * @param modelValue 表单初始值
 */
export const buildModeValue = (
  formItems: Array<MetaForm> | Array<IContainerItem>,
  modelValue: Record<string, any>
) => {
  formItems.forEach((el) => {
    if (el.children) {
      const childModelValue = {}
      buildModeValue(el.children, childModelValue)
      modelValue[el.prop] = childModelValue
    } else {
      modelValue[el.prop] = el.props?.defaultValue
    }
  })
}

/**
 * 根据对象属性路径更新对象
 * @param modelValue 对象
 * @param keys 属性路径
 * @param value 属性值
 */
export const updateModeValue = (
  modelValue: Record<string, any>,
  keys: Array<string>,
  value: any
) => {
  keys.reduce((acc, cur, i) => {
    return (acc[cur] = i === keys.length - 1 ? value : acc[cur] || {})
    // 根据递归创建空对象，直到是最后一个属性并赋值
  }, modelValue)
}

export const updateFormItemsValue = (
  formItems: Array<MetaForm> | Array<IContainerItem>,
  modelValue: Record<string, any>
) => {
  formItems.forEach((item) => {
    if (item.children) {
      if (isUndefined(modelValue[item.prop])) {
        modelValue[item.prop] = {}
      }
      return updateFormItemsValue(item.children, modelValue[item.prop])
    }
    if (!isUndefined(modelValue[item.prop]) && (item.props || item.componentOptions)) {
      return ((item.props || item.componentOptions).defaultValue = modelValue[item.prop])
    } else {
      modelValue[item.prop] = (item.props || item.componentOptions).defaultValue
    }
  })
}

export const isClass = (varValue: any) => {
  return isFunction(varValue) && !isUndefined(varValue.prototype)
}
