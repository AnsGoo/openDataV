<template>
  <el-form-item
    v-for="{ key, label, type, selectOptions, arrayAttr } in children"
    :key="`${ukey}${key}`"
    :label="label"
  >
    <ColorPicker
      v-if="type === 'color'"
      v-model:value="formData[key]"
      @change="changed($event, key)"
    />
    <ArrayItem
      v-else-if="type === 'array'"
      v-model:data="formData[key]"
      :jsonSchema="arrayAttr!"
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
    <el-radio-group
      v-else-if="type === 'radio'"
      v-model="formData[key]"
      :placeholder="label"
      @change="changed($event, key)"
    >
      <el-radio v-for="item in selectOptions" :label="item.value" :key="item.value">{{ item.label }}</el-radio>
    </el-radio-group>
    <el-input-number
      v-else-if="type === 'number'"
      v-model="formData[key]"
      @change="changed($event, key)"
    />
    <el-switch
      v-else-if="type === 'switch'"
      v-model="formData[key]"
      @change="changed($event, key)"
    />
    <FontSelect v-else-if="type === 'font'" v-model="formData[key]" @change="changed($event, key)" />
    <el-input v-else :type="type" v-model="formData[key]" @change="changed($event, key)" />
  </el-form-item>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import ColorPicker from './ColorPicker.vue'
import ArrayItem from './ArrayItem.vue'
import FontSelect from './FontSelect.vue'
import type { AttrType } from '@/types/component'
import {
  ElInput,
  ElSelect,
  ElOption,
  ElFormItem,
  ElRadio,
  ElSwitch,
  ElRadioGroup,
  ElInputNumber
} from 'element-plus'

const props = defineProps<{
  data: Recordable<any>
  children: AttrType[]
  ukey: string
}>()

const emits = defineEmits<{ (e: 'change', value: any, key: any): void }>()
const formData = reactive<Recordable<any>>(props.data)

const changed = (val: any, key: string) => {
  emits('change', val, key)
}

watch(
  () => props.data,
  (val) => {
    Object.assign(formData, val)
  },
  {
    deep: true
  }
)
</script>
