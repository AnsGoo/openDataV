<template>
  <label
    :class="{
      disabled: disabled,
      checked: checked,
      'o-radio': true
    }"
    @click="changeHandler"
  >
    <span>
      <span class="radio-inner"></span>
      <span v-if="$slots.default" class="radio-text">
        <slot></slot>
      </span>
      <span v-if="label" class="radio-text"> {{ label }}</span>
    </span>
  </label>
</template>
<script lang="ts" setup>
import { computed, inject, onMounted, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    value?: string | boolean | number
    checked?: string | boolean | number
    modelValue?: string | boolean | number
    label?: string
  }>(),
  {
    disabled: false
  }
)
const emits = defineEmits<{
  (e: 'update:value', modelValue: any): void
  (e: 'updateValue', modelValue: any): void
  (e: 'change', modelValue: any): void
}>()
// FormItem
const controlChange: any = inject(`OControlChange`, '')
const changeHandler = () => {
  // 点击后只有选中状态
  if (props.disabled) {
    return
  }
  const val = props.value || true
  emits('change', val)
  emits('update:value', val)
  emits('updateValue', val)
  controlChange && controlChange(val, 'change')
}
const checked = computed(() => {
  // 存在value时，当v-model=value时为选中状态
  // 不存在value时，当v-model=true时为选中状态
  let bool
  if (props.value) {
    bool = props.value === props.modelValue
  } else {
    bool = !!props.modelValue
  }
  return bool
})
watch(
  () => props.checked,
  (v: any) => {
    controlChange && controlChange(v, 'mounted')
  }
)
onMounted(() => {
  controlChange && controlChange(props.checked, 'mounted')
})
</script>
<style lang="less" scoped>
@import './radio.less';
</style>
