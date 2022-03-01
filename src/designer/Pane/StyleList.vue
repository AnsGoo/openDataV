<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <div class="attr-list" style="height: calc(100vh - 100px)">
    <el-scrollbar>
      <el-form size="mini" @submit.prevent>
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
import { checkDiff, cleanObjectProp } from '@/utils/utils'
import { componentList } from '@/designer/load'
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
import type { ComponentInfo } from '@/types/component'
import { groupCommonStyle } from '../interface'

const props = defineProps<{
  curComponent: ComponentInfo
}>()
const activeName = ref<string>()
const basicStore = useBasicStoreWithOut()

const formData = reactive<Recordable<any>>({})
const styleKeys = computed(() => {
  if (props.curComponent && props.curComponent.component in componentList) {
    const style = componentList[props.curComponent.component].style
    if (props.curComponent.groupStyle && props.curComponent.groupStyle.top !== undefined) {
      style[0] = groupCommonStyle
    }
    return componentList[props.curComponent.component].style
  }
  return []
})

// 样式页面改变，修改当前组件的样式：curComponent.style
const changed = (val: string, key: string) => {
  if (props.curComponent) {
    basicStore.setCurComponentStyle(key, val)
  }
}

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
  cleanObjectProp(formData)
  if (props.curComponent) {
    updateFormData({
      ...props.curComponent.style,
      ...(props.curComponent.groupStyle || {})
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
