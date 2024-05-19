<template>
  <div class="o-btn-group">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: string
    round?: boolean
    disabled?: boolean
    width?: string
    plain?: boolean
  }>(),
  {
    size: '',
    round: false,
    disabled: false,
    width: ''
  }
)

const emits = defineEmits<{
  (e: 'click', event: MouseEvent, name: string): void
}>()

provide(`OGroupConfig`, props)
provide(`OBtnClick`, (event: MouseEvent, name: string) => {
  if (!props.disabled) {
    emits('click', event, name)
  }
})
</script>
