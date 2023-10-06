<!-- Created by 337547038. -->
<template>
  <div class="o-collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, reactive } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string[]
    accordion?: boolean // 风琴模式
  }>(),
  {
    modelValue: () => []
  }
)
const emits = defineEmits<{
  (e: 'change', modelValue: boolean): void
}>()

const provideChangePanel = (v: boolean) => {
  emits('change', v)
}
provide(`OChangePanel`, provideChangePanel)
provide(
  'OProps',
  reactive({
    modelValue: props.modelValue,
    accordion: props.accordion
  })
)
</script>

<style lang="less" scoped>
@import './collapse.less';
</style>
