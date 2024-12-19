<template>
  <details>
    <summary @click="toggle" @dblclick="changeType">
      <div class="flex justify-between w-full">
        <ComponentLayer
          :component="model.component"
          :level="props.level"
          class="flex items-center flex-1"
        >
          <x-icon :name="model.icon" />
          <div class="text-md">{{ model.name }}</div>
        </ComponentLayer>
        <div class="flex items-center">
          <x-icon
            :name="toggleIcon(model.component.display!)"
            :size="18"
            @click="
              model.component.display
                ? hidden(model.component, level)
                : display(model.component, level)
            "
          />
        </div>
      </div>
    </summary>
    <LayerItem
      v-for="(item, index) in model.children"
      v-show="isOpen"
      :key="item.id"
      :model="item"
      :level="`${level}-${index}`"
    />
  </details>
</template>

<script setup lang="ts">
import { ComponentLayer, useCanvasState, useComponentActions } from '@open-data-v/designer'
import { computed, ref } from 'vue'

const canvasState = useCanvasState()
const props = defineProps<{
  model: {
    children?: any[]
    name: string
    id: string
    component: any
    icon: string
  }
  level: string
}>()

const isOpen = ref(false)
const isFolder = computed(() => {
  return props.model.children && props.model.children.length > 0
})

function toggle() {
  isOpen.value = !isOpen.value
  canvasState.activateComponent(props.model.component)
}
const toggleIcon = (isDisplay: boolean) => (isDisplay ? 'previewOpen' : 'previewClose')

function changeType() {
  if (!isFolder.value) {
    isOpen.value = true
  }
}

const { hidden, display } = useComponentActions()
</script>
<style scoped>
summary {
  outline: 0;
  padding-left: 30px;
  display: flex;
  list-style: none;
  background: repeating-linear-gradient(90deg, #999 0 1px, transparent 0px 2px) 0px 50%/20px 1px
    no-repeat;
  /* background: linear-gradient(#999,#999) 0px 50%/20px 1px no-repeat; */
}
.tree details:last-child {
  background-size: 1px 23px;
}
.tree > details:not(:last-child) > details:last-child {
  background-size: 1px 100%;
}
.tree details {
  padding-left: 40px;
  background: repeating-linear-gradient(#999 0 1px, transparent 0px 2px) 40px 0px/1px 100% no-repeat;
  /* background: linear-gradient(#999, #999) 40px 0px/1px 100% no-repeat; */
}
.tree > details {
  background: none;
  padding-left: 0;
}
.tree > details > summary {
  background: none;
}
.tree summary {
  display: flex;
  align-items: center;
  height: 46px;
  font-size: 15px;
  line-height: 22px;
  cursor: default;
}
.tree summary::after {
  content: '';
  position: absolute;
  left: 10px;
  right: 10px;
  height: 38px;
  border-radius: 8px;
  z-index: -1;
  opacity: 0;
  transition: 0.2s;
}
.tree summary:hover::after {
  opacity: 1;
}
.tree summary:not(:only-child)::before {
  content: '';
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin-right: 8px;
  border: 1px solid #999;
  background: linear-gradient(#999, #999) 50%/1px 10px no-repeat,
    linear-gradient(#999, #999) 50%/10px 1px no-repeat;
}
.tree details[open] > summary::before {
  background: linear-gradient(#999, #999) 50%/10px 1px no-repeat;
}
</style>
