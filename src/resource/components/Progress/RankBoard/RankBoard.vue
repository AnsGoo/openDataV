<template>
  <div :ref="ref" class="dv-scroll-ranking-board">
    <div v-for="(item, index) in dataSource" :key="item.label" class="row-item">
      <div class="ranking-info">
        <div class="rank">No.{{ index + 1 }}</div>
        <div class="info-name">{{ item.label }}</div>
        <div class="ranking-value">{{ item.value }} {{ unit }}</div>
      </div>

      <div class="ranking-column">
        <div
          class="inside-column"
          :style="{ width: `${maxValue ? (item.value * 100) / maxValue : 100}%` }"
        >
          <div class="shine"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useProp, useData } from '@/resource/hooks'
import type { BaseComponent, DataType } from '@/resource/models'
import type { RequestResponse } from '@/resource/models/type'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { RankBoard } from './type'
const props = defineProps<{
  component: BaseComponent
}>()

const dataSource = ref<
  | Array<{ label: string; value: number }>
  | RequestResponse<Array<{ label: string; value: number }>>['afterData']
>([])
const dataChange = (resp: any, _: DataType) => {
  if (resp.status >= 0) {
    dataSource.value = resp.afterData
  }

  updateData(dataSource.value)
}
useData(props.component, dataChange)

const propValueChange = (prop: string, key: string, value: any) => {
  if (prop === 'bar') {
    switch (key) {
      case 'barHeight':
        barHeight.value = `${value}px`
        break
      case 'borderRadius':
        borderRadius.value = `${value}px`
        break
      case 'color1':
        color1.value = value
        break
      case 'color2':
        color2.value = value
        break
    }
  } else if (prop === 'line') {
    switch (key) {
      case 'lineHeight':
        lineHeight.value = `${value}px`
        break
      case 'borderGap':
        borderGap.value = `${value}px`
        break
      case 'lineColor':
        lineColor.value = value
        break
    }
  } else if (prop === 'text') {
    switch (key) {
      case 'fontSize':
        fontSize.value = `${value}px`
        break
      case 'labelColor':
        labelColor.value = value
        break
      case 'valueColor':
        valueColor.value = value
        break
      case 'rankColor':
        rankColor.value = value
        break
    }
  }
  if (prop === 'data' && key === 'unit') unit.value = value
}

const { propValue } = useProp<RankBoard>(props.component, propValueChange)

const unit = ref<string>(propValue.data.unit)
const barHeight = ref<string>(`${propValue.bar.barHeight}px`)

const fontSize = ref<string>(`${propValue.text.fontSize}px`)
const labelColor = ref<string>(propValue.text.labelColor || '#fff')
const valueColor = ref<string>(propValue.text.valueColor || '#fff')
const rankColor = ref<string>(propValue.text.rankColor || '#fff')
const color1 = ref<string>(propValue.bar.color1 || '#3DE7C9')
const color2 = ref<string>(propValue.bar.color2 || '#00BAFF')
const borderRadius = ref<string>(`${propValue.bar.borderRadius}px`)
const lineHeight = ref<string>(`${propValue.line.lineHeight}px`)
const borderGap = ref<string>(`${propValue.line.borderGap}px`)
const lineColor = ref<string>(propValue.line.lineColor || '#3DE7C9')
const linearGradient = computed<string>(
  () => `linear-gradient(to right, ${color1.value}, ${color2.value})`
)

const maxValue = computed<number>(() => {
  if (propValue.data.maxValue) {
    return propValue.data.maxValue
  } else {
    return Math.max(...dataSource.value.map((el) => el.value))
  }
})

const updateData = (results: Array<{ label: string; value: number }>) => {
  results.sort((a, b) => b.value - a.value)
  dataSource.value = results
}
onMounted(async () => {})

onUnmounted(() => {})
</script>
<style lang="less" scoped>
.dv-scroll-ranking-board {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .row-item {
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }
  .ranking-info {
    display: flex;
    width: 100%;
    font-size: v-bind(fontSize);
    .rank {
      color: v-bind(rankColor);
      margin-right: 2px;
    }
    .info-name {
      flex: 1;
      color: v-bind(labelColor);
    }
    .ranking-value {
      color: v-bind(valueColor);
    }
  }
  .ranking-column {
    border-bottom: v-bind(lineHeight) solid v-bind(lineColor);
    margin-top: 5px;
    .inside-column {
      position: relative;
      height: v-bind(barHeight);
      background-image: v-bind(linearGradient);
      margin-bottom: v-bind(borderGap);
      border-radius: v-bind(borderRadius);
      overflow: hidden;
    }
    .shine {
      position: absolute;
      left: 0;
      top: 2px;
      height: v-bind(barHeight);
      width: 50px;
      transform: translateX(-100%);
      background: radial-gradient(v-bind(color1) 5%, transparent 80%);
      animation: shine 3s ease-in-out infinite alternate;
    }
  }
}
@keyframes shine {
  80% {
    left: 0;
    transform: translateX(-100%);
  }
  100% {
    left: 100%;
    transform: translateX(0%);
  }
}
</style>
