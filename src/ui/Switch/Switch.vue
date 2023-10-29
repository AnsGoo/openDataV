<template>
  <span
    :class="{
      ['o-switch']: true,
      'switch-checked': status,
      disabled: disabled,
      [size as string]: size
    }"
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
    activeValue?: string | number // switch 打开时的值
    closeValue?: string | number // switch 关闭时的值
    size?: string
  }>(),
  {
    value: false,
    disabled: false
  }
)

const emits = defineEmits<{
  (e: 'update:value', value: string | number | boolean): void
  (e: 'updateValue', value: string | number | boolean): void
  (e: 'change', value: string | number | boolean): void
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
const click = () => {
  if (!props.disabled) {
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
    emits('updateValue', checked)
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
