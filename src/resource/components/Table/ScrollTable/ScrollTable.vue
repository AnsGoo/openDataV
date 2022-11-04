<template>
  <div v-resize="resizeHandler" class="dv-scroll-board">
    <div
      v-if="propValue.header.header.length"
      class="header"
      :style="`background-color: ${propValue.header.headerBGC};`"
    >
      <div
        v-for="(item, i) in propValue.header.header"
        :key="`${item}${i}`"
        class="header-item"
        :style="`
          height: ${propValue.header.headerHeight}px;
          line-height: ${propValue.header.headerHeight}px;
        `"
        v-html="item"
      ></div>
    </div>

    <div
      class="rows"
      :style="{
        height: `${
          comHeight - (propValue.header.header.length ? propValue.header.headerHeight : 0)
        }px`
      }"
    >
      <div
        v-for="(row, ri) in rowData"
        :key="row.rowIndex"
        class="row-item"
        :style="`
          height: ${propValue.rows.data.height}px;
          line-height: ${propValue.rows.data.height}px;
          background-color: ${
            propValue.rows.data[row.rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC']
          };
        `"
      >
        <div
          v-for="(ceil, ci) in row.ceils"
          :key="`${ceil}${ri}${ci}`"
          class="ceil"
          v-html="ceil"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useProp, useData } from '@/resource/hooks'
import type { BaseComponent, DataType } from '@/resource/models'
import type { ScrollTableType } from './type'
import type { RequestResponse } from '@/resource/models/type'

const props = defineProps<{
  component: BaseComponent
}>()

const { propValue } = useProp<ScrollTableType>(props.component)

const comHeight = ref<number>(0)
const resizeHandler = (entry: ResizeObserverEntry) => {
  const { height } = entry.contentRect
  comHeight.value = height
}

const tableData = ref<
  | Array<{ label: string; value: number }>
  | RequestResponse<Array<{ label: string; value: number }>>['afterData']
>([])
const dataChange = (resp: any, _: DataType) => {
  if (resp.status >= 0) {
    tableData.value = resp.afterData
  }
}
useData(props.component, dataChange)

const rowData = computed(() => {
  return tableData.value.map((item, index) => {
    return {
      rowIndex: index,
      ceils: Object.values(item)
    }
  })
})
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
    justify-content: space-around;

    .header-item {
      transition: all 0.3s;
    }
  }

  .rows {
    overflow: hidden;

    .row-item {
      display: flex;
      font-size: 14px;
      transition: all 0.3s;
      justify-content: space-around;
    }

    .index {
      border-radius: 3px;
      padding: 0 3px;
    }
  }
}
</style>
