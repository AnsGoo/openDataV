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

const props = defineProps<{
  curComponent: ComponentInfo
}>()
const basicStore = useBasicStoreWithOut()

const formData = reactive<Recordable<any>>({})
const styleKeys = computed(() => {
  if (props.curComponent && props.curComponent.component in componentList) {
    return componentList[props.curComponent.component].style
  }
  return []
})

// 样式页面改变，修改当前组件的样式：curComponent.style
const changed = debounce((key: string, val: any) => {
  if (props.curComponent) {
    const locationKeys = ['top', 'left', 'width', 'height', 'rotate']
    if (locationKeys.findIndex((el: string) => el === key) > -1) {
      const indexs: number[] = basicStore.activeIndex!.split('-').map((i) => Number(i))
      indexs.pop()
      const parentComponent = basicStore.getComponentByIndex(indexs)
      key as 'top' | 'left' | 'width' | 'height' | 'rotate'
      basicStore.syncComponentLoction(
        { [key]: val as number },
        parentComponent.component === 'Root' ? undefined : parentComponent
      )
      if (parentComponent) {
        basicStore.resizeAutoComponent(indexs)
      }
    } else {
      basicStore.setCurComponentStyle(key, val)
    }
  }
}, 300)

const changeStyle = (eventValue: any) => {
  const attrVal = eventValue as Recordable<any>
  if (props.curComponent && props.curComponent.id === attrVal.id) {
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
