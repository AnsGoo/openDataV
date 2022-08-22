<template>
  <n-form-item
    v-for="{ prop, label, type, componentOptions } in children"
    :key="`${ukey}${prop}`"
    :label="label"
  >
    <NColorPicker
      v-if="type === FormType.COLOR"
      v-model:value="formData[prop]"
      :swatches="GlobalColorSwatches"
      :modes="['hex', 'rgb', 'hsl']"
      @update:value="changed($event, prop)"
    />
    <n-select
      v-else-if="type === FormType.SELECT"
      v-model="formData[prop]"
      :placeholder="label"
      @update:value="changed($event, prop)"
      :options="componentOptions?.options || []"
    />
    <n-radio-group
      v-else-if="type === FormType.RADIO"
      v-model:value="formData[prop]"
      :placeholder="label"
      @update:value="changed($event, prop)"
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
      v-model:value="formData[prop]"
      @update:value="changed($event, prop)"
    />
    <n-switch
      v-else-if="type === FormType.SWITCH"
      v-model:value="formData[prop]"
      @update:value="changed($event, prop)"
    />
    <FontStyle
      v-else-if="type === FormType.FONT_STYLE"
      v-model="formData[prop]"
      @change="changed($event, prop)"
    />
    <FontWeight
      v-else-if="type === FormType.FONT_WEIGHT"
      v-model="formData[prop]"
      @change="changed($event, prop)"
    />
    <LinearGradient
      v-else-if="type === FormType.LINEAR_GRADIENT"
      v-model:value="formData[prop]"
      @change="changed($event, prop)"
    />
    <CustomRender
      v-else-if="type === FormType.CUSTOM"
      v-model:value="formData[prop]"
      @change="changed($event, prop)"
      :component="(componentOptions as CustomFormSchema).componentType"
      :args="(componentOptions as CustomFormSchema).args"
    />
    <n-input
      v-else
      clearable
      v-model:value="formData[prop]"
      @update:value="changed($event, prop)"
    />
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
import type { AttrType, CustomFormSchema } from '@/types/component'

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
