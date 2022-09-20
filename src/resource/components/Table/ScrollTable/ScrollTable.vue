<template>
  <div class="dv-scroll-board" v-resize="resizeHandler">
    <div
      class="header"
      v-if="propValue.header.column.length"
      :style="`background-color: ${propValue.header.headerBGC};`"
    >
      <div
        class="header-item"
        v-for="(item, i) in propValue.header.column"
        :key="`${item.name}${i}`"
        :style="`
          height: ${propValue.header.headerHeight}px;
          line-height: ${propValue.header.headerHeight}px;
          width: ${item.width}px;
        `"
        :align="item.align"
        v-html="item.name"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useProp } from '@/resource/hooks'
import { BaseComponent } from '@/resource/models'
import { ScrollTableType } from './type'

const props = defineProps<{
  component: BaseComponent
}>()

const { propValue } = useProp<ScrollTableType>(props.component)

const comHeight = ref<number>(0)
const resizeHandler = (entries: ResizeObserverEntry[]) => {
  const entry = entries[0]
  const { height } = entry.contentRect
  comHeight.value = height
}
</script>

<style lang="less" scoped>
.dv-scroll-board {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;

  .header {
    display: flex;
    flex-direction: row;
    font-size: 15px;

    .header-item {
      transition: all 0.3s;
    }
  }
}
</style>
