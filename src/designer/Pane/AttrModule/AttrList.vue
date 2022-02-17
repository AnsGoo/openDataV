<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <div class="attr-list" style="height: calc(100vh - 120px)">
    <el-scrollbar>
      <el-form v-if="curComponent" size="mini" @submit.prevent>
        <!-- 组件通用属性 -->
        <CompAttr :curComponent="curComponent" />

        <el-collapse
          v-model="activeName"
          accordion
          v-for="{ name, uid, children, max } in attrKeys"
          :key="`${curComponent.id}${uid}`"
        >
          <!-- 普通表单属性 -->
          <FormAttr
            v-if="!max || max < 1"
            :children="children"
            :data="formData"
            @change="changed"
            :name="name"
            :uid="uid"
            :ukey="curComponent.id as string"
          />

          <!-- 动态属性 -->
          <DynamicAttr
            v-else
            :children="children"
            :data="formData[uid]"
            @change="changed"
            :name="name"
            :uid="uid"
            :max="max"
            :ukey="curComponent.id as string"
          />
        </el-collapse>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { componentList } from '@/designer/load'
import { computed, ref, reactive, watch } from 'vue'
import { cleanObjectProp } from '@/utils/utils'
import CompAttr from './CompAttr.vue'
import FormAttr from './FormAttr.vue'
import DynamicAttr from './DynamicAttr.vue'
import { ElScrollbar, ElCollapse, ElForm } from 'element-plus'

const activeName = ref<string>()
const basicStore = useBasicStoreWithOut()

const formData = reactive<Recordable<any>>({})
const curComponent = computed(() => basicStore.curComponent || basicStore.layerComponent)

const attrKeys = computed(() => {
  if (curComponent.value && curComponent.value.component in componentList) {
    return componentList[curComponent.value.component].attrs
  }
  return []
})

// 样式页面改变，修改当前组件的样式：curComponent.propValue
const changed = (val: string, key: string) => {
  basicStore.setCurComponentProp(key, val)
}

const resetFormData = () => {
  cleanObjectProp(formData)
  const component = basicStore.curComponent || basicStore.layerComponent
  if (component && component.propValue) {
    const propValue = component.propValue
    Object.keys(propValue).forEach((key) => {
      formData[key] = propValue[key]
    })
  }
}

// 如果当前选中组件发生变化，则更新 formData
watch(
  () => [basicStore.curComponent, basicStore.layerComponent],
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

    backdrop-filter: blur(50px);
  }
}
</style>
