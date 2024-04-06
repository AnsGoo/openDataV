<template>
  <div class="w-full">
    <Input readonly :value="value" :style="{ backgroundColor: value }" @click="toggle" />
    <transition v-click-outside="close" name="slide-toggle">
      <div v-show="state.visible" :class="`o-color-picker`" @click.stop="">
        <ColorPane :value="colorOp" :swatches="swatches" @change="paneChange" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'

import { Input } from '../Input'
import ColorPane from './ColorPane.vue'
import type { ColorOption } from './types'
import { tinycolor, transColor } from './utils'
import { ClickOutsideDirective } from '@open-data-v/base'

const vClickOutside = ClickOutsideDirective

const props = withDefaults(
  defineProps<{
    value?: string
    format?: 'hex' | 'rgb' | 'hsl' // 风琴模式
    text?: string
    disableAlpha?: boolean
    swatches?: Array<string>
  }>(),
  {
    value: '#fff',
    format: 'hex',
    disableAlpha: false,
    swatches: () => []
  }
)

const colorOp = computed<ColorOption>(() => {
  return transColor(props.value)
})

const emit = defineEmits<{
  (e: 'change', value: string): void
  (e: 'update:value', value: string): void
  (e: 'updateValue', value: string): void
}>()

const state: any = reactive({
  visible: false
})
const toggle = () => {
  state.visible = true
}
const close = () => {
  state.visible = false
}
function paneChange(color) {
  const tiny = tinycolor(color.rgba)
  if (!props.disableAlpha) {
    tiny.setAlpha(color.a)
  } else {
    tiny.setAlpha(1)
  }

  let afterColor
  switch (props.format) {
    case 'hex':
      afterColor = (props.disableAlpha ? tiny.toHexString() : tiny.toHex8String()).toUpperCase()
      break
    case 'rgb':
      afterColor = tiny.toRgbString()
      break
    case 'hsl':
      afterColor = tiny.toHslString()
      break
  }
  emit('update:value', afterColor)
  emit('change', afterColor)
  emit('updateValue', afterColor)
}
</script>
