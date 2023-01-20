<template>
  <div v-resize="resizeHandler" class="dv-decoration-9">
    <svg width="100" height="100" :style="`transform: scale(${scaleRota[0]}, ${scaleRota[1]})`">
      <defs>
        <polygon :id="polygonId" points="15, 46.5, 21, 47.5, 21, 52.5, 15, 53.5" />
      </defs>

      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        :stroke="mergedColor[1]"
        stroke-width="10"
        stroke-dasharray="80, 100, 30, 100"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;360 50 50"
          :dur="`${dur}s`"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        :stroke="mergedColor[0]"
        stroke-width="6"
        stroke-dasharray="50, 66, 100, 66"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;-360 50 50"
          :dur="`${dur}s`"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        cx="50"
        cy="50"
        r="38"
        fill="transparent"
        :stroke="mergedColor[1]"
        stroke-width="1"
        stroke-dasharray="5, 1"
      />

      <use
        v-for="(foo, i) in new Array(20).fill(0)"
        :key="i"
        :xlink:href="`#${polygonId}`"
        :stroke="mergedColor[1]"
        :fill="Math.random() > 0.4 ? 'transparent' : mergedColor[0]"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;360 50 50"
          :dur="`${dur}s`"
          :begin="`${(i * dur) / 20}s`"
          repeatCount="indefinite"
        />
      </use>

      <circle
        cx="50"
        cy="50"
        r="26"
        fill="transparent"
        :stroke="mergedColor[1]"
        stroke-width="1"
        stroke-dasharray="5, 1"
      />
    </svg>
    <div>{{ dataValue }}{{ unit }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { http } from '@/utils/http'
import { useProp } from '@/resource/hooks'
import { useEventBus } from '@/bus'
import type { Gauge } from './type'
import type { BaseComponent } from '@/resource/models'
import { useBasicStoreWithOut } from '@/store/modules/basic'

const basicStore = useBasicStoreWithOut()
const props = defineProps<{
  component: BaseComponent
}>()

const propChange = (prop: string, key: string, value: any) => {
  if (prop === 'attr' && key === 'color1') mergedColor.value[0] = value
  if (prop === 'attr' && key === 'color2') mergedColor.value[1] = value
  if (prop === 'attr' && key === 'unit') unit.value = value
}
const { propValue } = useProp<Gauge>(props.component, propChange)
const mergedColor = ref<string[]>([propValue.attr.color1, propValue.attr.color2])

const polygonId = `decoration-9-polygon`
const dur = ref<number>(3)
const dataValue = ref<number>(0)
const scaleRota = ref<number[]>([1, 1])

const unit = ref<string>(propValue.attr.unit || '')

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  const rate = Math.min(rect.width / 100, rect.height / 100)
  scaleRota.value = [rate, rate]
}

const handler = (event) => {
  const item: Recordable = event as Recordable

  if (propValue.data.datatag && item.TagName === propValue.data.datatag) {
    dataValue.value = Number(item.TagValue)
  }
}

onMounted(async () => {
  await initData()
})

const initData = async () => {
  if (propValue.data.history) {
    try {
      const resp = await http.post({
        url: propValue.data.history,
        data: [propValue.data.datatag]
      })
      if (resp.status === 200) {
        dataValue.value = Number(resp.data.TagValue)
      }
    } catch (err: any) {
      console.log(err.message || err)
    }
  }
  if (basicStore.isEditMode) {
    dataValue.value = Number((Math.random() * 100).toFixed(2))
  }
}

useEventBus('actual', handler)
</script>

<style lang="less" scoped>
.dv-decoration-9 {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    position: absolute;
    left: 0;
    top: 0;
    transform-origin: left top;
  }
}
</style>
