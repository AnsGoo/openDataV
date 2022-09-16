<template>
  <div class="dv-scroll-board" :ref="ref">
    <div class="header" v-if="header.length && mergedConfig" :style="`background-color: ${mergedConfig.headerBGC};`">
      <div
        class="header-item"
        v-for="(headerItem, i) in header"
        :key="`${headerItem}${i}`"
        :style="`
          height: ${mergedConfig.headerHeight}px;
          line-height: ${mergedConfig.headerHeight}px;
          width: ${widths[i]}px;
        `"
        :align="aligns[i]"
        v-html="headerItem"
      />
    </div>

    <div
      v-if="mergedConfig"
      class="rows"
      :style="`height: ${height - (header.length ? mergedConfig.headerHeight : 0)}px;`"
    >
      <div
        class="row-item"
        v-for="(row, ri) in rows"
        :key="`${row.toString()}${row.scroll}`"
        :style="`
          height: ${heights[ri]}px;
          line-height: ${heights[ri]}px;
          background-color: ${mergedConfig[row.rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC']};
        `"
      >
        <div
          class="ceil"
          v-for="(ceil, ci) in row.ceils"
          :key="`${ceil}${ri}${ci}`"
          :style="`width: ${widths[ci]}px;`"
          :align="aligns[ci]"
          v-html="ceil"
          @click="emitEvent('click', ri, ci, row, ceil)"
          @mouseenter="handleHover(true, ri, ci, row, ceil)"
          @mouseleave="handleHover(false)"
        />

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProp } from '@/resource/hooks'
import { BaseComponent } from '@/resource/models'
import { ScrollTableType } from './type'

const props = defineProps<{
  component: BaseComponent
}>()

const { propValue } = useProp<ScrollTableType>(props.component)
</script>
