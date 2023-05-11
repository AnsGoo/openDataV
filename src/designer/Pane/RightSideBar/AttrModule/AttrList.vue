<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <div class="attr-list">
    <n-collapse accordion>
      <n-collapse-item
        v-for="{ label, prop, children } in attrKeys"
        :key="`${curComponent.id}${prop}`"
        :title="label"
        :name="prop"
      >
        <FormAttr
          :children="children || []"
          :data="formData[prop]"
          :name="label"
          :uid="prop"
          :ukey="curComponent.id"
          @change="(keys: Array<string>, value) => changed(keys, value)"
        />
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import { NCollapse, NCollapseItem } from 'naive-ui'
import { computed, ref, watch } from 'vue'

import FormAttr from '@/designer/modules/form/FormAttr'
import useCanvasState from '@/designer/state/canvas'
import type { CustomComponent } from '@/models'

const props = defineProps<{
  curComponent: CustomComponent
}>()
const canvasState = useCanvasState()

interface PropData {
  common: {
    name: string
    component: string
    id: string
  }
  [key: string]: any
}

const formData = ref<PropData>({
  common: {
    name: props.curComponent.name,
    component: props.curComponent.component,
    id: props.curComponent.id
  }
})

const attrKeys = computed(() => {
  if (props.curComponent) {
    return props.curComponent.propFromValue
  }
  return []
})

// 样式页面改变，修改当前组件的样式：curComponent.propValue
const changed = (keys: Array<string>, val: any) => {
  canvasState.setCurComponentPropValue(keys, val)
}

const resetFormData = () => {
  const data: PropData = {
    common: {
      name: props.curComponent.name,
      component: props.curComponent.component,
      id: props.curComponent.id
    }
  }

  if (props.curComponent && props.curComponent.propValue) {
    Object.assign(data, props.curComponent.propValue)
  }
  formData.value = data
}

watch(
  () => props.curComponent.id,
  () => {
    resetFormData()
  },
  { immediate: true }
)
</script>

<style scoped>
.attr-list {
  @apply overflow-auto p-1 pt-0 h-full;
  margin-right: 10px;
  backdrop-filter: blur(50px);
}
</style>
