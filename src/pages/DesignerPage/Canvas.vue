<template>
  <n-layout v-resize="editorWindowResizeHandler">
    <!-- 中间画布 -->
    <n-layout-content class="content">
      <n-scrollbar x-scrollable :style="scrobarStyle">
        <Editor :scale="sliderScale" />
      </n-scrollbar>
    </n-layout-content>
    <n-layout-footer position="absolute" class="footer">
      <n-space justify="end" align="center" style="height: 100%; margin-right: 5px">
        <n-el
          tag="span"
          style="color: var(--primary-color); transition: 0.3s var(--cubic-bezier-ease-in-out)"
        >
          画布缩放:
        </n-el>
        <n-slider v-model:value="value" :min="10" :max="200" style="width: 120px" />
        <n-select v-model:value="value" :options="options" size="small" style="width: 90px" />
      </n-space>
    </n-layout-footer>
  </n-layout>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import type { WatchStopHandle } from 'vue'
import Editor from '@/designer/Editor/Index.vue'
import {
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NScrollbar,
  NSlider,
  NSpace,
  NSelect,
  SelectOption
} from 'naive-ui'
import { debounce } from 'lodash-es'

const windowWidth = ref<number>(0)
const windowHeight = ref<number>(0)
const toolBarHeight = ref<number>(35)

const value = ref<number>(80)
const sliderScale = ref<number>(80)
const options: SelectOption[] = [
  {
    value: 200,
    label: '200%'
  },
  {
    value: 150,
    label: '150%'
  },
  {
    value: 100,
    label: '100%'
  },
  {
    value: 80,
    label: '80%'
  },
  {
    value: 50,
    label: '50%'
  }
]

const scrobarStyle = computed(() => {
  return {
    width: windowWidth.value + 'px',
    height: windowHeight.value + 'px'
  }
})

const editorWindowResizeHandler: ResizeObserverCallback = (entries: ResizeObserverEntry[]) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  windowWidth.value = width
  windowHeight.value = height - toolBarHeight.value
}

const changeScale = debounce((value: number) => {
  sliderScale.value = value
}, 300)

const stopWatch: WatchStopHandle = watch(
  () => value.value,
  () => {
    changeScale(value.value)
  }
)

onUnmounted(() => {
  if (stopWatch) {
    stopWatch()
  }
})
</script>

<style lang="less" scoped>
.content {
  box-shadow: inset 0px 0px 3px black;
}

.footer {
  height: v-bind('toolBarHeight + "px"');
}
</style>
