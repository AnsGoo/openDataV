<template>
  <n-form-item
    v-for="{ key, label, type, componentOptions } in children"
    :key="`${ukey}${key}`"
    :label="label"
  >
    <n-color-picker
      v-if="type === FormType.COLOR"
      v-model:value="formData[key]"
      :swatches="GlobalColorSwatches"
      :modes="['hex', 'rgb', 'hsl']"
      size="small"
      @update:value="changed($event, key)"
    />
    <n-select
      v-else-if="type === FormType.SELECT"
      v-model="formData[key]"
      :placeholder="label"
      @update:value="changed($event, key)"
      :options="componentOptions?.options || []"
    />
    <n-radio-group
      v-else-if="type === FormType.RADIO"
      v-model:value="formData[key]"
      :placeholder="label"
      @update:value="changed($event, key)"
    >
      <n-radio
        v-for="item in componentOptions?.options || []"
        :label="item.value"
        :key="item.value"
      >
        {{ item.label }}
      </n-radio>
    </n-radio-group>
    <n-input-number
      v-else-if="type === FormType.NUMBER"
      v-model:value="formData[key]"
      @update:value="changed($event, key)"
    />
    <n-switch
      v-else-if="type === FormType.SWITCH"
      v-model:value="formData[key]"
      @update:value="changed($event, key)"
    />
    <FontStyle
      v-else-if="type === FormType.FONT_STYLE"
      v-model="formData[key]"
      @change="changed($event, key)"
    />
    <FontWeight
      v-else-if="type === FormType.FONT_WEIGHT"
      v-model="formData[key]"
      @change="changed($event, key)"
    />
    <LinearGradient
      v-else-if="type === FormType.LINEAR_GRADIENT"
      v-model:value="formData[key]"
      @change="changed($event, key)"
    />
    <CustomRender
      v-else-if="type === FormType.CUSTOM"
      v-model:value="formData[key]"
      @change="changed($event, key)"
      :component="componentOptions.componentType"
      :args="componentOptions.args"
    />
    <n-input v-else clearable v-model:value="formData[key]" @update:value="changed($event, key)" />
  </n-form-item>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import FontStyle from './FontStyle.vue'
import FontWeight from './FontWeight.vue'
import LinearGradient from './LinearGradient.vue'
import CustomRender from './utils/render'
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
import { FormType, GlobalColorSwatches } from '@/enum'
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
