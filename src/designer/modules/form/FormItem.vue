<template>
  <n-form-item
    v-for="{ key, label, type, selectOptions } in children"
    :key="`${ukey}${key}`"
    :label="label"
  >
    <NColorPicker
      v-if="type === 'color'"
      v-model:value="formData[key]"
      @update:value="changed($event, key)"
    />
    <n-select
      v-else-if="type === 'select'"
      v-model="formData[key]"
      :placeholder="label"
      update:value="changed($event, key)"
      :options="selectOptions"
    />
    <n-radio-group
      v-else-if="type === 'radio'"
      v-model:value="formData[key]"
      :placeholder="label"
      @update:value="changed($event, key)"
    >
      <n-radio v-for="item in selectOptions" :label="item.value" :key="item.value">
        {{ item.label }}
      </n-radio>
    </n-radio-group>
    <n-input-number
      v-else-if="type === 'number'"
      v-model:value="formData[key]"
      @update:value="changed($event, key)"
    />
    <n-switch
      v-else-if="type === 'switch'"
      v-model:value="formData[key]"
      @update:value="changed($event, key)"
    />
    <FontStyle
      v-else-if="type === 'fontStyle'"
      v-model="formData[key]"
      @change="changed($event, key)"
    />
    <FontWeight
      v-else-if="type === 'fontWeight'"
      v-model="formData[key]"
      @change="changed($event, key)"
    />
    <LinearGradient
      v-else-if="type === 'linearGradient'"
      v-model:value="formData[key]"
      @change="changed($event, key)"
    />
    <n-input v-else clearable v-model:value="formData[key]" @update:value="changed($event, key)" />
  </n-form-item>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import FontStyle from './FontStyle.vue'
import FontWeight from './FontWeight.vue'
import LinearGradient from './LinearGradient.vue'
import {
  NFormItem,
  NInput,
  NRadioGroup,
  NRadio,
  NSelect,
  NSwitch,
  NInputNumber,
  NColorPicker
} from 'naive-ui'
import type { AttrType } from '@/types/component'

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
