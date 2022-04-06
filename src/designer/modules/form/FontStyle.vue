<template>
  <el-select clearable v-model="font" placeholder="请选择字体" size="mini" @change="change">
    <el-option
      v-for="(item, index) in fonts"
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
import { SYS_FONTS } from '@/enum/font'

withDefaults(
  defineProps<{
    value?: string
  }>(),
  {
    value: ''
  }
)

const font = ref<string>('')
const fonts = reactive<{ label: string; value: string }[]>(SYS_FONTS)

const emits = defineEmits<{
  (e: 'update:value', color: string): void
  (e: 'change', color: string): void
}>()

const change = (val: string) => {
  font.value = val
  emits('update:value', font.value)
  emits('change', font.value)
}
</script>
