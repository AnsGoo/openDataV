<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <div class="attr-list">
    <n-collapse accordion>
      <n-collapse-item
        v-for="{ name, uid, children } in styleKeys"
        :key="`${curComponent.id}${uid}`"
        :title="name"
        :name="uid"
      >
        <FormAttr
          :children="children"
          :data="formData"
          @change="changed"
          :name="name"
          :uid="uid"
          :ukey="curComponent.id"
        />
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { checkDiff, cleanObjectProp } from '@/utils/utils'
import { componentList } from '@/designer/load'
import { debounce } from 'lodash-es'
import { computed, reactive, watch } from 'vue'
import { useEventBus } from '@/bus/useEventBus'
import FormAttr from '@/designer/modules/form/FormAttr.vue'
import { NCollapse, NCollapseItem } from 'naive-ui'
import type { ComponentInfo } from '@/types/component'
import { groupCommonStyle } from '@/designer/interface'

const props = defineProps<{
  curComponent: ComponentInfo
}>()
const basicStore = useBasicStoreWithOut()

const formData = reactive<Recordable<any>>({})
const styleKeys = computed(() => {
  if (props.curComponent && props.curComponent.component in componentList) {
    const style = componentList[props.curComponent.component].style
    if (props.curComponent.groupStyle) {
      style[0] = groupCommonStyle
    }
    return componentList[props.curComponent.component].style
  }
  return []
})

// 样式页面改变，修改当前组件的样式：curComponent.style
const changed = (key: string, val: string) => {
  if (props.curComponent) {
    basicStore.setCurComponentStyle(key, val)
  }
}

const changeStyle = (eventValue: any) => {
  const attrVal = eventValue as Recordable<any>
  if (props.curComponent && props.curComponent.id === attrVal.id) {
    console
    updateFormData(attrVal.style)
  }
}

useEventBus('changeStyle', changeStyle)

const updateFormData = debounce((newVal: Recordable<any>) => {
  const style = checkDiff(newVal, formData)
  if (style) {
    Object.keys(style).forEach((key) => {
      formData[key] = style[key]
    })
  }
}, 200)

const resetFormData = () => {
  if (props.curComponent) {
    cleanObjectProp(formData)
    const data = {
      ...props.curComponent.style,
      ...(props.curComponent.groupStyle || {})
    }
    updateFormData(data)
  }
}

watch(
  [() => props.curComponent.id, () => props.curComponent.style],
  () => {
    if (props.curComponent && props.curComponent.id) {
      resetFormData()
    }
  },
  { immediate: true, deep: true }
)
</script>

<style scoped>
@layer components {
  .attr-list {
    @apply overflow-auto p-1 pt-0 h-full;

    backdrop-filter: blur(50px);
    margin-right: 10px;
  }
}
</style>
