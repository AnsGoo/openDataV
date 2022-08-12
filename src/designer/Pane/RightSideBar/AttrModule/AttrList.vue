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
          :children="children"
          :data="formData"
          @change="changed"
          :name="label"
          :uid="prop"
          :ukey="curComponent.id"
        />
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { componentList } from '@/designer/load'
import { computed, reactive, watch } from 'vue'
import FormAttr from '@/designer/modules/form/FormAttr.vue'
import { cleanObjectProp } from '@/utils/utils'
import { NCollapse, NCollapseItem } from 'naive-ui'
import { BaseComponent } from '@/resource/models'

const props = defineProps<{
  curComponent: BaseComponent
}>()
const basicStore = useBasicStoreWithOut()

const formData = reactive<Recordable<any>>({})

const attrKeys = computed(() => {
  if (props.curComponent && props.curComponent.component in componentList) {
    return componentList[props.curComponent.component].attrs
  }
  return []
})

// 样式页面改变，修改当前组件的样式：curComponent.propValue
const changed = (key: string, val: any, form: string) => {
  basicStore.setCurComponentPropValue(form, key, val)
}

const resetFormData = () => {
  cleanObjectProp(formData)
  if (props.curComponent && props.curComponent.propValue) {
    const propValue = props.curComponent.propValue!
    Object.keys(propValue).forEach((key) => {
      formData[key] = propValue[key]
    })
  }
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
@layer components {
  .attr-list {
    @apply overflow-auto p-1 pt-0 h-full;
    margin-right: 10px;
    backdrop-filter: blur(50px);
  }
}
</style>
