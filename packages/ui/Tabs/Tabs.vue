<template>
  <div ref="tabsEl" :class="[`o-tabs ${tabPosition}`, 'flex', 'flex-wrap flex-col']">
    <slot></slot>
    <div
      class="tabs-nav relative w-full border-b dark:border-b-zinc-500 border-b-zinc-200 flex flex-col items-center"
    >
      <slot name="leftExtra"></slot>
      <div ref="tabsScrollEl" class="tabs-scroll w-full overflow-hidden">
        <div
          ref="tabsTabEl"
          class="tabs-tab w-full flex flex-row flex-nowrap items-center content-center"
          :style="{ justifyContent }"
        >
          <div
            v-for="(item, index) in paneSlots"
            :key="index"
            class="tabs-item relative cursor-pointer whitespace-nowrap after:block after:bg-emerald-700 after:relative -top-1 after:opacity-0 after:w-0"
            :class="{
              disabled: item.disabled,
              active: getShow(item, index)
            }"
            @click="tabsClick(item, index)"
          >
            <span
              v-if="item.label"
              :class="{ label: true, active: getShow(item, index), disabled: item.disabled }"
              class="mx-6"
              >{{ item.label }}
            </span>
            <template v-else-if="item.slots?.label">
              <RenderSlot :slots="item.slots?.label()" />
            </template>
          </div>
        </div>
      </div>
      <slot name="rightExtra"></slot>
    </div>
    <div v-if="showContent" class="tabs-content overflow-hidden">
      <template v-for="(slot, index) in paneSlots" :key="index">
        <div v-show="getShow(slot, index)">
          <RenderSlot :slots="slot.slots" />
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'

import RenderSlot from './RenderSlot'

const props = withDefaults(
  defineProps<{
    value?: string
    beforeLeave?: Function
    showContent?: boolean // 是否显示切换内容
    tabPosition?: 'top' | 'right' | 'bottom' | 'left'
    closable?: boolean // 显示关闭标签
    justifyContent?: string
  }>(),
  {
    value: 'tab-1',
    showContent: true,
    tabPosition: 'top',
    closable: false,
    justifyContent: 'space-evenly'
  }
)
const emits = defineEmits<{
  (e: 'update:value', index: string): void
  (e: 'change', props: string, index: number): void
}>()

const activeKey = ref(props.value)
const tabsClick = (item: any, index: number) => {
  if (item.disabled) {
    return
  }
  if (props.beforeLeave) {
    if (!props.beforeLeave(item)) {
      return false
    }
  }
  activeKey.value = item.name || 'tab-' + (index + 1)
  emits('change', item, index)
  emits('update:value', activeKey.value)
}
const paneSlots: any = ref([])
provide('OChildrenList', (slots: any) => {
  paneSlots.value.push(slots)
})
const getShow = (item: any, index: number) => {
  if (item.name) {
    return item.name === activeKey.value
  } else {
    // 没有指定name时
    return activeKey.value === 'tab-' + (index + 1)
  }
}
const setActiveKey = () => {
  //设置了name的值
  paneSlots.value.forEach((item: any) => {
    if (item.name === props.value) {
      activeKey.value = item.name
    }
  })
}
const tabsEl = ref()
const tabsTabEl = ref()
const tabsScrollEl = ref() // 滚动区域
const isScroll = ref<boolean>(false) // 是否需要滚动
const moveWidth = ref<number>(0) // 已经移动的宽
const tabsWidth = ref<number>()
const scrollInit = () => {
  nextTick(() => {
    if (['top', 'bottom'].includes(props.tabPosition)) {
      const width = tabsEl.value.offsetWidth // 可视宽
      const width2 = tabsTabEl.value.offsetWidth // 实际宽
      isScroll.value = width <= width2
      tabsWidth.value = width
    }
  })
}
// 确保在动态切换时，清空上或下配置时设置的宽信息
watch(
  () => props.tabPosition,
  (val: string) => {
    if (['left', 'right'].includes(val)) {
      moveWidth.value = 0
      tabsWidth.value = 0
    } else {
      scrollInit()
    }
  }
)
onMounted(() => {
  setActiveKey()
  scrollInit()
  window.addEventListener('resize', scrollInit, false)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', scrollInit, false)
})
</script>
<style lang="less" scoped>
@import './tabs.less';
</style>
