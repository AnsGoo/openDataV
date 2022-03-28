<template>
  <el-input
    clearable
    v-model="colorValue"
    placeholder="请输入颜色"
    size="mini"
    @change="changeColor"
  >
    <template #append>
      <el-color-picker
        v-model="colorValue"
        :predefine="predefineColors"
        show-alpha
        size="mini"
        @change="changeColor"
      />
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElInput, ElColorPicker } from 'element-plus'

const props = withDefaults(
  defineProps<{
    value?: string
  }>(),
  {
    value: ''
  }
)

const emits = defineEmits<{
  (e: 'update:value', color: string): void
  (e: 'change', color: string): void
}>()

const predefineColors: string[] = reactive([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  'var(--el-color-primary)',
  '#c71585'
])
const colorValue = ref<string>(props.value)

const changeColor = (val: string) => {
  colorValue.value = val || ''
  emits('update:value', colorValue.value)
  emits('change', colorValue.value)
}
</script>

<style scoped>
:deep(.el-input-group__append) {
  border: none;
  padding: 0;
}
</style>
