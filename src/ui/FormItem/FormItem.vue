<template>
  <div
    :class="{
      className,
      ['o-form-item-error']: state.errorTips !== '',
      ['o-form-item']: true,
      ['form-item-' + state.formSize]: state.formSize,
      ['form-item-' + labelPlacement]: !!labelPlacement
    }"
  >
    <label
      v-if="label || $slots.label"
      v-show="showLabel"
      :class="{ required: isRequired, ['o-form-label']: true }"
      :style="labelStyle"
    >
      <slot name="label">{{ label }}</slot>
    </label>
    <div :class="`o-form-box`">
      <slot></slot>
      <template
        v-if="
          state.iconType &&
          state.messageShow &&
          ((state.rules2 && state.rules2.length > 0) || error)
        "
      >
        <div v-if="state.errorTips === ''" :class="`o-form-tips ${state.iconType}`"></div>
        <div v-else :class="`o-form-tips`">
          <i :class="[state.iconType]"></i>
          <span v-text="state.errorTips"></span>
        </div>
      </template>
    </div>
    <slot name="other"></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, provide, reactive, watch } from 'vue'

import Validate from './validate'

const props = withDefaults(
  defineProps<{
    className?: string
    label?: string
    showLabel?: boolean
    prop?: string
    required?: boolean
    rules?: string[]
    showMessage?: boolean
    trigger?: 'change' | 'blur'
    labelWidth?: string
    size?: string
    error?: string
  }>(),
  {
    trigger: 'change',
    showMessage: true,
    rules: () => [],
    required: true,
    showLabel: true,
    error: ''
  }
)
const formProps: any = inject(`OFormProps`, {})
let formRules
if (formProps?.rules && props.prop && formProps.rules[props.prop]) {
  formRules = formProps.rules[props.prop]
}
let rules = [...props.rules]
if (props.rules?.length === 0 && formRules) {
  // 使用form的，formItem没有设置时使用form
  rules = [...formRules]
}
const labelPlacement = computed<string>(() => formProps.labelPlacement)
// formItem设置值时使用formItem的，否则使用form的
const getFormProps = (params: string, defaultValue: any) => {
  const itemProps = (props as any)[params]
  if (itemProps === defaultValue) {
    // formItem没有设置，返回form的
    if (formProps && Object.keys(formProps).length > 0) {
      return formProps[params]
    }
  }
  return itemProps
}
const state = reactive<any>({
  errorTips: '', // 有值时表示校验没通过有错误信息
  iconType: '', // 提示类型，
  rules2: rules,
  trigger2: getFormProps('trigger', 'change'),
  messageShow: getFormProps('showMessage', true),
  controlValue: '', // 组件的值，改变事件时*/
  formSize: props.size ? props.size : formProps && formProps.size
})
// 手动自定义错误设置
const setError = (error: string) => {
  if (error) {
    state.errorTips = error
    state.iconType = 'icon-failure'
  }
}
setError(props.error)
watch(
  () => props.error,
  (val: string) => {
    setError(val)
  }
)
const isRequired = computed(() => {
  let bool = false
  const required = getFormProps('required', true)
  if (required && state.rules2 && state.rules2.length > 0) {
    state.rules2.forEach((item: any) => {
      if (item.type === 'required') {
        bool = true
        return false
      }
    })
  }
  return bool
})
// 如果form组件设置了label的宽
const labelStyle = computed<any>(() => {
  const width = getFormProps('labelWidth', undefined)
  if (width) {
    return {
      width: width
    }
  } else {
    return null
  }
})
const validate = (value: any) => {
  let value2 = value
  // 外部调用时没有值
  if (value === undefined) {
    value2 = state.controlValue
  }
  return new Promise((resolve, reject) => {
    // 当手动设置了error时，则为不通过状态
    if (props.error) {
      reject(state.errorTips)
    } else if (state.rules2) {
      const result = Validate(value2, state.rules2)
      if (result === true) {
        // 通过
        state.errorTips = ''
        state.iconType = 'icon-success'
        resolve(state.controlValue)
        // console.log('通过')
      } else {
        state.errorTips = result
        state.iconType = 'icon-failure'
        reject(state.errorTips)
        // console.log('不通过')
      }
    } else {
      // 没有校验规则
      resolve(state.controlValue)
      console.log('没有校验规则通过')
    }
  })
}
const focusTips = (value: any) => {
  let typeTips = ''
  state.rules2.forEach((item: any) => {
    if (item.type === 'tips') {
      typeTips = item.msg
    }
  })
  if (typeTips && !value) {
    // 没有值时才提示
    state.errorTips = typeTips
    state.iconType = 'icon-tips'
  }
}
// 清空输入提示，恢复初始状态
const clearTips = () => {
  state.errorTips = ''
  state.iconType = ''
}
const getFormItemFields: any = inject(`OGetFormItemFields`, '')
const getAllFormItemFields = () => {
  // 所有带校验规则的
  if ((state.rules2.length > 0 || props.error) && getFormItemFields) {
    getFormItemFields({
      validate: validate,
      clear: clearTips,
      prop: props.prop || `prop${new Date().getTime()}` // 当有prop时随机添加一个
    })
  }
}
provide(`OControlChange`, (val: any, type: string) => {
  state.controlValue = val
  // 将组件值存起来，不触发其他操作，在没有手动触发时也使用validate来校验
  if (type === 'mounted') {
    return
  }
  if (type === 'focus') {
    focusTips(val)
  } else if (state.trigger2 === 'blur') {
    // 失去焦点校验
    if (type === 'blur') {
      validate(val).catch((res) => {
        console.log(res)
      })
    }
  } else {
    validate(val).catch((res) => {
      console.log(res)
    })
  }
})
onMounted(() => {
  getAllFormItemFields()
})
defineExpose({ validate, clearTips })
</script>
<style lang="less" scoped>
@import './formitem.less';
</style>
