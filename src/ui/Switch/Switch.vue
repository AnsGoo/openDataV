<!--Created by 337547038 on 2021/6.-->
<template>
  <span
    :class="{
      ['o-switch']: true,
      'switch-checked': status,
      disabled: disabled,
      [size as string]: size
    }"
    :style="style"
    @click="click"
  >
    <i :class="`o-switch-inner`"></i>
    <span class="switch-text">
      <slot v-if="status" name="open"></slot>
      <slot v-else name="close"></slot>
    </span>
  </span>
</template>
<script lang="ts" setup>
import { computed, inject, onMounted, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    value?: string | number | boolean
    disabled?: boolean
    activeColor?: string // 打开时的颜色
    closeColor?: string // 关闭时的颜色
    activeValue?: string | number // switch 打开时的值
    closeValue?: string | number // switch 关闭时的值
    beforeChange?: Function
    size?: string
  }>(),
  {
    value: false,
    disabled: false
  }
)

const emits = defineEmits<{
  (e: 'update:value', modelValue: string | number | boolean): void
  (e: 'change', modelValue: string | number | boolean): void
}>()

const controlChange: any = inject(`OControlChange`, '')
const status = computed(() => {
  if (props.activeValue) {
    // 指定了选中值时
    return props.value === props.activeValue
  } else {
    return props.value
  }
})
const style = computed(() => {
  let elStyle = {}
  if (props.value && props.activeColor) {
    // 打开状态，并设置了打开时的颜色
    elStyle = {
      borderColor: props.activeColor,
      backgroundColor: props.activeColor
    }
  }
  if (!props.value && props.closeColor) {
    elStyle = {
      borderColor: props.closeColor,
      backgroundColor: props.closeColor
    }
  }
  return elStyle
})
const click = () => {
  if (!props.disabled) {
    if (props.beforeChange && !props.beforeChange()) {
      return
    }
    let checked
    if (!status.value) {
      if (props.activeValue) {
        checked = props.activeValue
      } else {
        checked = true
      }
    } else {
      if (props.closeValue) {
        checked = props.closeValue
      } else {
        checked = false
      }
    }
    emits('update:value', checked)
    emits('change', checked)
    controlChangeEvent(checked)
  }
}
const controlChangeEvent = (val: any, type?: string) => {
  controlChange && controlChange(val, type)
}
watch(
  () => props.value,
  (v: any) => {
    controlChangeEvent(v, 'mounted')
  }
)
onMounted(() => {
  controlChangeEvent(props.value, 'mounted')
})
</script>
<style lang="less" scoped>
@import './switch.less';
</style>
