<template>
  <OCodeEditor
    ref="cm"
    :value="data"
    :mode="mode"
    :disabled="disabled"
    @update:value="dataChange"
    @change="codeChange"
  >
    <template #tool-bar>
      <div class="buttons flex flex-nowrap flex-row m-1">
        <x-icon class="block ml-0.5 mr-0.5 hover:scale-110" name="save" @click="handleSave" />
      </div>
    </template>
    <template #footer>
      <div class="flex-row flex flex-nowrap justify-between">
        <div class="flex flex-nowrap flex-row align-middle items-center">
          <span v-if="error" class="err-message"> 异常信息：{{ error }}</span>
          <span v-else class="info-message decoration-current">{{
            title ? `数据名称：${title}` : ''
          }}</span>
        </div>
        <div class="flex flex-nowrap flex-row justify-end align-middle items-center">
          <div :class="['saved-status', 'decoration-current', savedStatus ? 'save' : 'unsave']">
            {{ savedStatus ? '已保存' : '未保存' }}
          </div>
          <div class="lang">JSON</div>
        </div>
      </div>
    </template>
  </OCodeEditor>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const savedStatus = ref<boolean>(true)

const props = withDefaults(
  defineProps<{
    data?: string
    title?: string
    mode?: 'debug' | 'use'
    height?: string
    error?: string
    disabled?: boolean
  }>(),
  {
    data: '',
    title: '',
    mode: 'use',
    height: '600px',
    disabled: false
  }
)

const cm = ref<HTMLElement | null>(null)
const emits = defineEmits<{
  (e: 'update:data', value?: any): void
  (e: 'change', value?: any): void
}>()
const codeChange = (_: string) => {
  savedStatus.value = false
}
const dataChange = (value: string) => {
  emits('update:data', value)
  emits('change', value)
}

const handleSave = () => {
  emits('update:data', props.data)
  emits('change', props.data)
  savedStatus.value = true
}
</script>
<style lang="less" scoped>
.err-message {
  color: #d03050;
}
.info-message {
  color: #2080f0;
}
.lang {
  background-color: #2080f0;
}
.saved-status {
  &.save {
    background-color: #18a058;
  }
  &.unsave {
    background-color: #d03050;
  }
}
</style>
