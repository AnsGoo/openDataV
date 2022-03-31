<template>
  <el-select clearable v-model="weight" placeholder="请选择字重" size="mini" @change="change">
    <el-option
      v-for="(item, index) in weights"
      :key="index"
      :value="item.value"
      :label="item.label"
      :filterable="true"
    />
  </el-select>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { SYS_FONT_WEIGHT } from '@/enum/font'

withDefaults(
  defineProps<{
    value?: string
  }>(),
  {
    value: ''
  }
)

const weight = ref<string>('')
const weights = reactive<{ label: string; value: string }[]>(SYS_FONT_WEIGHT)

const emits = defineEmits<{
  (e: 'update:value', color: string): void
  (e: 'change', color: string): void
}>()

const change = (val: string) => {
  weight.value = val
  emits('update:value', weight.value)
  emits('change', weight.value)
}
</script>
