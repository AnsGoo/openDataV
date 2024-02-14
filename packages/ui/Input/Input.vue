<template>
  <div
    :class="{
      ['o-form-input']: true,
      'input-prepend': $slots.prepend,
      'input-append': $slots.append
    }"
    :style="{ width: width }"
  >
    <div v-if="$slots.prepend" class="prepend">
      <slot name="prepend"></slot>
    </div>
    <input
      ref="inputEl"
      autocomplete="off"
      :value="value"
      :type="inputType"
      :readonly="readonly"
      :class="{
        disabled: disabled,
        ['o-input-control']: true,
        'has-prefix': $slots.prefix,
        [size]: size
      }"
      :disabled="disabled"
      @input="inputHandler"
      @focus="focusHandler"
      @blur="blurHandler"
    />
    <div v-if="$slots.append" class="append">
      <slot name="append"></slot>
    </div>
    <span v-if="$slots.prefix" class="prefix-icon">
      <slot name="prefix"></slot>
    </span>
    <span class="suffix-icon">
      <slot name="suffix"></slot>
      <i v-if="clearable" class="icon-close" @click.stop="clearValue"><Close /></i>
      <i v-if="type === 'password'" @click.stop="eyeShow = !eyeShow">
        <EyeOff v-if="eyeShow" /><Eye v-else />
      </i>
    </span>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, onMounted, ref, watch } from 'vue'

import { Close, Eye, EyeOff } from '../Icon'

const props = withDefaults(
  defineProps<{
    value?: any
    disabled?: boolean
    type?: string
    clearable?: boolean
    width?: string
    size?: string
    readonly?: boolean
    [key: string]: any
  }>(),
  {
    value: '',
    disabled: false,
    type: 'text',
    clearable: true,
    width: '',
    size: '',
    readonly: false
  }
)

const emits = defineEmits<{
  (e: 'update:value', modelValue: any): void
  (e: 'updateValue', modelValue: any): void
  (e: 'change', modelValue: any): void
  (e: 'blur', modelValue: any): void
  (e: 'focus', modelValue: any): void
}>()

const inputEl = ref<HTMLDivElement | null>(null)
const eyeShow = ref<boolean>(false)
const inputType = computed(() => {
  if (eyeShow.value) {
    return 'text'
  } else {
    return props.type
  }
})
const blurHandler = (e: Event) => {
  emits('blur', e)
  const { value } = e.target as HTMLInputElement
  controlChangeEvent(value, 'blur')
}
const focusHandler = (e: Event) => {
  emits('focus', e)
  const { value } = e.target as HTMLInputElement
  controlChangeEvent(value, 'focus')
}
const inputHandler = (e: Event) => {
  const { value } = e.target as HTMLInputElement
  emits('update:value', value)
  emits('updateValue', value)
  emits('change', value)
  controlChangeEvent(value, 'change')
}
const clearValue = () => {
  if (props.disabled || props.readonly) {
    return
  }
  emits('update:value', '')
  emits('updateValue', '')
  emits('change', '')
}

const focus = () => {
  inputEl.value?.focus()
}
const blur = () => {
  inputEl.value?.blur()
}
watch(
  () => props.value,
  (v: any) => {
    controlChangeEvent(v, 'mounted')
  }
)
// FormItem
const controlChange: any = inject(`OControlChange`, '')
const controlChangeEvent = (val: any, type?: string) => {
  controlChange && controlChange(val, type)
}
onMounted(() => {
  controlChangeEvent(props.value, 'mounted')
})

defineExpose({ blur, focus })
</script>
<style lang="less" scoped>
@import './input.less';
</style>
