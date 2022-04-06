<template>
  <div>
    <template v-for="(_, index) in arrayData" :key="index">
      <div class="item">
        <ColorPicker
          v-if="jsonSchema.type === 'color'"
          v-model:value="formData[`${jsonSchema.key}${index}`]"
          @change="changed()"
        />
        <el-select
          v-else-if="jsonSchema.type === 'select'"
          v-model="formData[`${jsonSchema.key}${index}`]"
          @change="changed()"
        >
          <el-option
            v-for="item in jsonSchema.selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          v-else
          :type="jsonSchema.type"
          v-model="formData[`${jsonSchema.key}${index}`]"
          @change="changed()"
        />
        <span class="iconfont icon-shanchu" @click="handleDelClick(index)"></span>
      </div>
    </template>
    <el-button v-show="isShowAdd" style="border-style: dashed; width: 100%" @click="handleAddClick"
      >+</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import type { ArrayType } from '@/types/component'
import { reactive, onMounted, computed } from 'vue'
import ColorPicker from './ColorPicker.vue'
import { ElButton, ElInput, ElSelect, ElOption } from 'element-plus'

const props = defineProps<{
  data: Array<string>
  jsonSchema: ArrayType
}>()

const emits = defineEmits<{
  (e: 'update:data', data: Array<string>): void
  (e: 'change', data: Array<string>): void
}>()

const isShowAdd = computed<boolean>(() => {
  if (
    !props.jsonSchema.max ||
    (props.jsonSchema.max && Object.keys(formData).length < props.jsonSchema.max)
  ) {
    return true
  }
  return false
})

const arrayData = computed(() => {
  return Array(Object.keys(formData).length)
})

const formData = reactive<Recordable>({})

onMounted(() => {
  if (props.data) {
    for (let i = 0; i < props.data.length; i++) {
      formData[`${props.jsonSchema.key}${i}`] = props.data[i]
    }
  } else {
    console.log('[ERROR] props.data is undefined')
  }
})

const changed = () => {
  emits('update:data', Object.values(formData))
  emits('change', Object.values(formData))
}

const handleAddClick = () => {
  const i = Object.keys(formData).length
  formData[`${props.jsonSchema.key}${i}`] = ''
}

const handleDelClick = (index: number) => {
  delete formData[`${props.jsonSchema.key}${index}`]
  changed()
}
</script>

<style lang="less" scoped>
.item {
  display: flex;

  span {
    color: red;
  }
}
</style>
