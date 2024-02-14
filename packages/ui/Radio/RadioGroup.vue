<template>
  <div class="o-radio-group">
    <Radio
      v-for="(item, index) in options"
      :key="index"
      :model-value="value"
      :value="item[optionsKey.value]"
      :disabled="disabled || item.disabled"
      @change="change($event, item)"
    >
      {{ item[optionsKey.label] }}
    </Radio>
  </div>
</template>
<script lang="ts" setup>
import Radio from './Radio.vue'

withDefaults(
  defineProps<{
    value?: string | boolean | number
    options?: Array<Record<any, any>>
    optionsKey?: { label: string; value: string }
    disabled?: boolean
  }>(),
  {
    disabled: false,
    optionsKey: () => {
      return { label: 'label', value: 'value' }
    }
  }
)
const emits = defineEmits<{
  (e: 'update:value', value: any): void
  (e: 'updateValue', value: any): void
  (e: 'change', value: any, item: any): void
}>()
const change = (val: string | number | boolean, item: any) => {
  emits('update:value', val)
  emits('updateValue', val)
  emits('change', val, item)
}
</script>

<style lang="less" scoped>
@import './radio.less';
</style>
