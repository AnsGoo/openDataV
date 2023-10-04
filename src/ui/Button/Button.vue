<template>
  <button
    v-if="nativeType"
    v-bind="$attrs"
    :type="nativeType"
    :class="classStyle"
    :disabled="disabledOk"
    :style="{ width: btnWidth }"
    @click="handleClick"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </button>
  <a
    v-else
    v-bind="$attrs"
    :class="classStyle"
    :href="disabledOk ? null : href"
    :style="{ width: btnWidth }"
    @click="handleClick"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </a>
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
    href?: string | null
    icon?: string
    round?: boolean
    disabled?: boolean
    nativeType?: '' | 'button' | 'submit' | 'reset'
    width?: string
    name?: string // btn group中作为唯一标识
    loading?: boolean // 是否加
    plain?: boolean // 是否为朴素按钮
    circle?: boolean // 是否为圆形
  }>(),
  {
    type: '',
    size: '',
    href: null,
    icon: '',
    round: false,
    disabled: false,
    nativeType: '',
    width: '',
    name: '', // btn group中作为唯一标识
    loading: false // 是否加
  }
)

const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const groupConfig: GroupPropConfig = inject(`OGroupConfig`, {})
const btnClick: any = inject(`OBtnClick`, '')
const disabledOk = computed<boolean>(() => {
  if (props.loading) {
    return true // loading情况下一定为禁用状态
  } else {
    return props.disabled || false
  }
})

const btnWidth = ref(props.width || groupConfig.width)
const classStyle = computed(() => {
  const size = props.size || groupConfig.size || ''
  return {
    [`o-btn`]: true,
    'is-round': props.round || groupConfig.round,
    [`o-btn-` + props.type]: props.type,
    disabled: disabledOk.value,
    [size]: size,
    'is-plain': props.plain || groupConfig.plain,
    'is-circle': props.circle || groupConfig.plain
  }
})
const handleClick = (event: MouseEvent) => {
  if (!disabledOk.value) {
    emits('click', event)
    btnClick && btnClick(event, props.name)
  }
}
</script>
<style lang="less" scoped>
@import './button.less';
</style>
