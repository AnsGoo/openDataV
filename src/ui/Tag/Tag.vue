<template>
  <span
    v-show="visible"
    :class="{
      [`o-tag`]: true,
      [`tag-` + type]: type,
      [`tag-` + size]: size
    }"
    :style="{ background: bgColor, borderColor: borderColor, color: color }"
    @click="click"
  >
    <slot></slot>
    <i v-if="closable" class="icon-close" @click="closeClick"></i>
  </span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

withDefaults(
  defineProps<{
    type?: string
    closable?: boolean
    color?: string
    borderColor?: string
    bgColor?: string
    size?: string
  }>(),
  {
    type: '',
    closable: false,
    color: '',
    borderColor: '',
    bgColor: '',
    size: ''
  }
)

const emits = defineEmits<{
  (e: 'click'): void
  (e: 'close'): void
}>()

const visible = ref<boolean>(true)
const closeClick = () => {
  visible.value = false
  emits('close')
}
const click = () => {
  emits('click')
}
</script>
<style lang="less" scoped>
@import 'tag.less';
</style>
