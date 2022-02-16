<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <div class="attr-list" style="height: calc(100vh - 100px)">
    <el-scrollbar>
      <el-form v-if="curComponent" size="mini" @submit.prevent>
        <el-collapse
          v-model="activeName"
          accordion
          v-for="{ name, uid, children } in styleKeys"
          :key="`${curComponent.id}${uid}`"
        >
          <el-collapse-item :title="name" :name="uid">
            <el-form-item
              v-for="{ key, label, type, selectOptions } in children"
              :key="`${curComponent.id}${key}`"
              :label="label"
            >
              <ColorPicker
                v-if="type === 'color'"
                v-model:value="formData[key]"
                @change="changed($event, key)"
              />
              <el-select
                v-else-if="type === 'select'"
                v-model="formData[key]"
                :placeholder="label"
                @change="changed($event, key)"
              >
                <el-option
                  v-for="item in selectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input-number
                v-else-if="type === 'number'"
                v-model="formData[key]"
                @change="changed($event, key)"
              />
              <el-input
                v-else
                :type="type"
                v-model="formData[key]"
                @change="changed($event, key)"
              />
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { checkDiff, cleanObjectProp, isImage } from '@/utils/utils'
import { componentList } from '@/views/index'
import { debounce } from 'lodash-es'
import { computed, ref, reactive, watch } from 'vue'
import { useEventBus } from '@/bus/useEventBus'
import ColorPicker from '../Model/ColorPicker.vue'
import {
  ElScrollbar,
  ElCollapse,
  ElForm,
  ElInput,
  ElSelect,
  ElOption,
  ElFormItem,
  ElCollapseItem,
  ElInputNumber
} from 'element-plus'

const activeName = ref<string>()
const basicStore = useBasicStoreWithOut()

const formData = reactive<Recordable<any>>({})
const styleKeys = computed(() => {
  if (basicStore.curComponent && basicStore.curComponent.component in componentList) {
    return componentList[basicStore.curComponent.component].style
  }
  return []
})

const curComponent = computed(() => basicStore.curComponent)

// 样式页面改变，修改当前组件的样式：curComponent.style
const changed = (val: string, key: string) => {
  if (basicStore.curComponent) {
    if (key === 'backgroundImage' && isImage(val)) {
      val = `url('/${val}')`
    }
    basicStore.curComponent.style[key] = val
  }
}

const changeStyle = (eventValue: any) => {
  const attrVal = eventValue as Recordable<any>
  if (basicStore.curComponent && basicStore.curComponent.id === attrVal.id) {
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

// 如果当前选中组件发生变化，则更新 formData
watch(
  () => basicStore.curComponent,
  () => {
    cleanObjectProp(formData)
    if (basicStore.curComponent) {
      updateFormData(basicStore.curComponent.style)
    }
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
