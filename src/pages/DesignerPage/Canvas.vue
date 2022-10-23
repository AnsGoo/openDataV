<template>
  <n-layout v-resize="editorWindowResizeHandler">
    <!-- 中间画布 -->
    <n-layout-content class="content">
      <n-scrollbar x-scrollable :style="scrollbarStyle">
        <Editor />
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
        <n-slider
          :value="sliderValue"
          @update:value="handleScale"
          :min="10"
          :max="200"
          style="width: 120px"
        />
        <n-select
          :value="selectValue"
          @update:value="handleScale"
          :options="options"
          size="tiny"
          style="width: 90px"
        />
      </n-space>
    </n-layout-footer>
  </n-layout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Editor from '@/designer/Editor/Index.vue'
import {
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NScrollbar,
  NSlider,
  NSpace,
  NSelect,
  SelectOption,
  NEl
} from 'naive-ui'
import { debounce } from 'lodash-es'
import { useBasicStoreWithOut } from '@/store/modules/basic'

const windowWidth = ref<number>(0)
const windowHeight = ref<number>(0)
const toolBarHeight = ref<number>(35)

const sliderValue = ref<number>(100)
const selectValue = ref<string>('100%')
const scaleValue = ref<number>(1)
const basicStore = useBasicStoreWithOut()
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

const scrollbarStyle = computed(() => {
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

const handleScale = (value: number) => {
  selectValue.value = `${value}%`
  sliderValue.value = value
  changeScale(sliderValue.value)
}

const changeScale = debounce((value: number) => {
  basicStore.setScale(value)
  scaleValue.value = value / 100
}, 300)
</script>

<style lang="less" scoped>
.content {
  box-shadow: inset 0px 0px 3px black;

  :deep(.n-scrollbar-content) {
    transform-origin: left top;
    transform: scale(v-bind(scaleValue));
    transition: all 0.3s;
  }
}

.footer {
  height: v-bind('toolBarHeight + "px"');
}
</style>
