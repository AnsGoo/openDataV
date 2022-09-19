<template>
  <div class="dv-scroll-board">
    <div class="header" v-if="propValue.header.header.length" :style="`background-color: ${propValue.header.headerBGC};`">
      <div
        class="header-item"
        v-for="(headerItem, i) in propValue.header.header"
        :key="`${headerItem}${i}`"
        :style="`
          height: ${propValue.header.headerHeight}px;
          line-height: ${propValue.header.headerHeight}px;
          width: ${widths[i]}px;
        `"
        :align="aligns[i]"
        v-html="headerItem"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useProp } from '@/resource/hooks'
import { BaseComponent } from '@/resource/models'
import { ScrollTableType } from './type'

const props = defineProps<{
  component: BaseComponent
}>()

const { propValue } = useProp<ScrollTableType>(props.component)

const widths = reactive<number[]>([])
const aligns = reactive<string[]>([])
</script>
