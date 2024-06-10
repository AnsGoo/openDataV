<template>
  <form class="o-form">
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import { onMounted, provide, reactive } from 'vue'

const props = withDefaults(
  defineProps<{
    rules?: Object
    showMessage?: boolean
    value?: Object
    trigger?: 'change' | 'blur'
    labelWidth?: string
    required?: boolean
    size?: string
    disabled?: boolean
    labelPlacement?: 'left' | 'top' | 'right'
  }>(),
  {
    showMessage: true,
    required: true,
    trigger: 'change',
    labelPlacement: 'left',
    rules: () => {
      return {}
    },
    value: () => {
      return {}
    }
  }
)

const state = reactive({
  defaultValue: '' // 用于保存所有表单元素初始值
})
const formItemFields: any = [] // 所有formItem
provide(`OFormProps`, props)
provide(`OGetFormItemFields`, (formItem: any) => {
  formItemFields.push(formItem)
})
const setValue = (obj: any, type?: string) => {
  if (type !== 'reset') {
    state.defaultValue = JSON.stringify(obj)
  }
  Object.assign(props.value, obj)
}
// 重置表单元素值
const resetForm = () => {
  setValue(JSON.parse(state.defaultValue), 'reset')
  // 将所有提示清空
  formItemFields &&
    formItemFields.forEach((item: any) => {
      item.clear()
    })
}
// 清空校验提示
const clearValidate = (field?: string[]) => {
  formItemFields &&
    formItemFields.forEach((item: any) => {
      if (field) {
        if (field.indexOf(item.prop) !== -1) {
          item.clear()
        }
      } else {
        item.clear()
      }
    })
}
const validate = (field?: string[]) => {
  const allTips: string[] = []
  let validateFields = formItemFields
  if (field && field.length > 0) {
    // 指定校验字段时
    validateFields = formItemFields.filter((fi: any) => {
      return field.indexOf(fi.prop) !== -1
    })
  }
  return new Promise((resolve, reject) => {
    validateFields.forEach((item: any) => {
      // console.log(item.prop)
      item
        .validate()
        .then(() => {
          allTips.push('true')
          returnResult() // 通过
        })
        .catch((res: string) => {
          allTips.push(res)
          returnResult()
        })
    })
    const returnResult = () => {
      if (allTips.length === validateFields.length) {
        const tips = allTips.filter((fi) => {
          return fi !== 'true'
        })
        if (tips.length > 0) {
          // console.log('不通过')
          reject(tips)
        } else {
          resolve(props.value)
        }
      }
    }
  })
}
onMounted(() => {
  setValue(props.value)
})
defineExpose({ validate, clearValidate, resetForm })
</script>
