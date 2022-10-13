<template>
  <div class="dv-scroll-board" v-resize="resizeHandler">
    <div
      class="header"
      v-if="propValue.header.header.length"
      :style="`background-color: ${propValue.header.headerBGC};`"
    >
      <div
        class="header-item"
        v-for="(item, i) in propValue.header.header"
        :key="`${item}${i}`"
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
        class="row-item"
        v-for="(row, ri) in rowData"
        :key="row.rowIndex"
        :style="`
          height: ${propValue.rows.data.height}px;
          line-height: ${propValue.rows.data.height}px;
          background-color: ${
            propValue.rows.data[row.rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC']
          };
        `"
      >
        <div
          class="ceil"
          v-for="(ceil, ci) in row.ceils"
          :key="`${ceil}${ri}${ci}`"
          v-html="ceil"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useProp, useData } from '@/resource/hooks'
import { BaseComponent, DataType } from '@/resource/models'
import { ScrollTableType } from './type'
import { RequestResponse } from '@/resource/models/type'

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

const tableData = ref<Array<{ label: string; value: number }>>([])
const dataChange = (resp: any, _: DataType) => {
  resp as RequestResponse<Array<{ label: string; value: number }>>
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
      padding: 0px 3px;
    }
  }
}
</style>
