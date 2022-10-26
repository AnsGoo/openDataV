<template>
  <canvas
    ref="canvas"
    class="ruler"
    @click="handle($event, 'click')"
    @mouseenter="handle($event, 'enter')"
    @mousemove="handle($event, 'move')"
    @mouseleave="$emit('update:showIndicator', false)"
  ></canvas>
</template>
<script lang="ts" setup>
import { drawCavaseRuler } from './utils'
import { reactive, ref, onMounted, watch } from 'vue'
import type { PaletteType } from '../index-types'

const props = defineProps<{
  showIndicator: boolean
  valueNum: number
  scale: number
  ratio: number
  palette: PaletteType
  vertical: boolean
  start: number
  width: number
  height: number
  selectStart: number
  selectLength: number
}>()

const emit = defineEmits<{
  (e: 'onAddLine', value: number): void
  (e: 'update:showIndicator', showIndicator: boolean): void
  (e: 'update:valueNum', valueNum: number): void
}>()
const state = reactive({
  canvasContext: null as CanvasRenderingContext2D | null
})
let ratio = 1
const canvas = ref<HTMLCanvasElement | null>(null)
onMounted(() => {
  ratio = props.ratio || window.devicePixelRatio || 1
  initCanvasRef()
  updateCanvasContext(ratio)
  drawRuler(ratio)
})
const initCanvasRef = () => {
  state.canvasContext = canvas.value && canvas.value.getContext('2d')
}
const updateCanvasContext = (ratio: number) => {
  if (canvas.value) {
    // 比例宽高
    canvas.value.width = props.width! * ratio!
    canvas.value.height = props.height! * ratio!
    const ctx = state.canvasContext
    if (ctx) {
      ctx.font = `${12 * ratio!}px -apple-system,
                "Helvetica Neue", ".SFNSText-Regular",
                "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB",
                "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`
      ctx.lineWidth = 1
      ctx.textBaseline = 'middle'
    }
  }
}
const drawRuler = (ratio: number) => {
  const options = {
    scale: props.scale!,
    width: props.width!,
    height: props.height!,
    palette: props.palette!,
    ratio: ratio
  }

  if (state.canvasContext) {
    drawCavaseRuler(
      state.canvasContext,
      props.start!,
      props.selectStart!,
      props.selectLength!,
      options,
      !props.vertical
    )
  }
}
watch(
  () => props.start,
  () => drawRuler(ratio)
)
watch([() => props.width, () => props.height], () => {
  updateCanvasContext(ratio)
  drawRuler(ratio)
})
const handle = (e: MouseEvent, key: string) => {
  const getValueByOffset = (offset: number, start: number, scale: number) =>
    Math.round(start + offset / scale)
  const offset = props.vertical ? e.offsetY : e.offsetX
  const value = getValueByOffset(offset, props.start!, props.scale!)
  switch (key) {
    case 'click':
      emit('onAddLine', value)
      break
    case 'enter':
      emit('update:valueNum', value)
      emit('update:showIndicator', true)
      break
    default:
      emit('update:valueNum', value)
      break
  }
}
</script>
