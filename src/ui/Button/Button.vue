<template>
  <button v-bind="$attrs" :class="classStyle" :style="{ width: btnWidth }" @click="handleClick">
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue'

interface GroupPropConfig {
  disabled?: boolean
  round?: boolean
  size?: string
  width?: string
  plain?: boolean
}

const props = withDefaults(
  defineProps<{
    type?: string
    size?: string
    icon?: string
    round?: boolean
    disabled?: boolean
    width?: string
    name?: string // btn group中作为唯一标识
    plain?: boolean // 是否为朴素按钮
    circle?: boolean // 是否为圆形
    bordered?: boolean
  }>(),
  {
    type: '',
    size: '',
    icon: '',
    round: false,
    disabled: false,
    width: '',
    name: '', // btn group中作为唯一标识,
    bordered: true
  }
)

const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const groupConfig: GroupPropConfig = inject(`OGroupConfig`, {})
const btnClick: any = inject(`OBtnClick`, '')

const btnWidth = ref(props.width || groupConfig.width)
const classStyle = computed(() => {
  const size = props.size || groupConfig.size || ''
  const classes = {
    [`o-btn`]: true,
    'is-round': props.round || groupConfig.round,
    disabled: props.disabled,
    [size]: size,
    'is-plain': props.plain || groupConfig.plain,
    'is-circle': props.circle || groupConfig.plain,
    ['o-btn-' + (props.type || 'default')]: true
  }
  if (!props.bordered) {
    classes['o-btn-bordered'] = true
  }
  return classes
})
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emits('click', event)
    btnClick && btnClick(event, props.name)
  }
}
</script>
<style lang="less" scoped>
@import './button.less';
</style>
