<template>
  <OCodeEditor ref="cm" :value="code" @update:value="formChange" @change="formChange">
    <template #tool-bar>
      <div>
        <div class="buttons">
          <x-icon class="item button" name="save" @click="handleSubmit" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <div :class="['saved-status', savedStatus ? 'save' : 'unsave']">
          {{ savedStatus ? '已保存' : '未保存' }}
        </div>
      </div>
    </template>
  </OCodeEditor>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { Logger } from '@/utils/utils'

const savedStatus = ref<boolean>(true)
const props = withDefaults(
  defineProps<{
    code?: string
    mode?: 'use' | 'debug' | 'view'
  }>(),
  {
    code: '',
    mode: 'use'
  }
)

const emits = defineEmits<{
  (e: 'update:code', value: string): void
  (e: 'change', value: string): void
}>()

const formChange = (value: string) => {
  emits('update:code', value)
  savedStatus.value = false
}

const cm = ref<HTMLElement | null>(null)
const handleSubmit = () => {
  emits('change', props.code)
  emits('update:code', props.code)
  savedStatus.value = true
  Logger.info('保存成功')
}

onMounted(async () => {})
</script>
<style lang="less" scoped>
.buttons {
  display: flex;
  .item {
    display: block;
    margin: 5px;
    &.language {
      width: 120px;
    }
    &.button {
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
.footer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  div {
    margin-left: 5px;
    color: #ffff;
    font-weight: 800;
    padding: 0 2px;
    border-radius: 2px;
  }
  .saved-status {
    &.save {
      background-color: #18a058;
    }
    &.unsave {
      background-color: #d03050;
    }
  }
}

.script {
  display: flex;
  margin-bottom: 5px;
  .selected {
    width: 300px;
    flex: 5;
  }
  .title {
    flex: 13;
  }
}
</style>
