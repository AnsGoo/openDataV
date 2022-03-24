<template>
  <div class="dv-tabs">
    <slot></slot>
    <div class="tabs-nav">
      <div class="prefix">
        <slot name="prefix"></slot>
      </div>
      <template v-if="mode === 'expand'">
        <div
          v-for="(item, index) in defaultSlots"
          :key="index"
          class="tabs-tab"
          :class="{ disabled: item.props?.disabled, active: getShow(item, index) }"
          @click="tabsClick(item, index)"
        >
          <span v-if="item.props!.label">
            <RenderSlot :slots="item.props!.label" />
          </span>
          <span v-else-if="item.children!.label">
            <RenderSlot :slots="item.children!.label()" />
          </span>
        </div>
      </template>
      <div class="suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
    <!-- <slot name="content"></slot> -->
    <div v-if="showContent" class="tabs-content">
      <div v-for="(slot, index) in defaultSlots" :key="index">
        <template v-if="slot.type.name! === 'DvTabPane'">
          <div v-show="getShow(slot, index + 1)">
            <RenderSlot :slots="slot.children!.default!()" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSlots, ref, computed, onMounted } from 'vue'
import type { VNode } from 'vue'
import RenderSlot from './renderSlot'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    beforeLeave?: Function
    showContent?: boolean
    mode?: string
  }>(),
  {
    modelValue: 'tab-1',
    showContent: true,
    beforeLeave: (_) => true,
    mode: 'expand'
  }
)

const defaultSlots = computed<VNode[]>(() => useSlots().default!())
const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: any): void
  (e: 'change', modelValue: any, index: number): void
}>()

const activeKey = ref<string>(props.modelValue)

const tabsClick = (item: any, index: number) => {
  if (props.beforeLeave && props.beforeLeave(item)) {
    activeKey.value = item.props.name || 'tab-' + (index + 1)
    emits('change', item, index)
    emits('update:modelValue', activeKey.value)
  }
}
const getShow = (slot: VNode, index: number) => {
  return slot.props?.name === activeKey.value || activeKey.value === 'tab-' + (index + 1)
}

onMounted(() => {
  const slots: VNode[] = defaultSlots.value
  if (slots && slots.length > 0 && slots[0].props && slots[0].props.name) {
    activeKey.value = slots[0].props.name
  }
})
</script>

<style lang="less" scoped>
.tabs-nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  .tabs-tab {
    font-size: 14px;
  }
  .tabs-tab.active {
    color: var(--el-color-primary);
    border-bottom: var(--el-color-primary) 2px solid;
  }
}
</style>
