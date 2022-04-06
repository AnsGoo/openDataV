<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <div class="attr-list" style="height: calc(100vh - 120px)">
    <el-scrollbar v-if="curComponent">
      <el-form size="mini" @submit.prevent>
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
            :ukey="curComponent.id"
          />

          <!-- 动态属性 -->
          <DynamicAttr
            v-else
            :children="children"
            :data="formData[uid] || []"
            @change="changed"
            :name="name"
            :uid="uid"
            :max="max"
            :ukey="curComponent.id"
          />
        </el-collapse>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { componentList } from '@/designer/load'
import { computed, ref, reactive, watch } from 'vue'
import CompAttr from './CompAttr.vue'
import FormAttr from './FormAttr.vue'
import DynamicAttr from './DynamicAttr.vue'
import { ElScrollbar, ElCollapse, ElForm } from 'element-plus'
import type { ComponentInfo } from '@/types/component'
import { cleanObjectProp } from '@/utils/utils'

const props = defineProps<{
  curComponent: ComponentInfo
}>()
const activeName = ref<string>()
const basicStore = useBasicStoreWithOut()

const formData = reactive<Recordable<any>>({})

const attrKeys = computed(() => {
  if (props.curComponent && props.curComponent.component in componentList) {
    return componentList[props.curComponent.component].attrs
  }
  return []
})

// 样式页面改变，修改当前组件的样式：curComponent.propValue
const changed = (key: string, val: any) => {
  basicStore.setCurComponentPropValue(key, val)
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

    backdrop-filter: blur(50px);
  }
}
</style>
