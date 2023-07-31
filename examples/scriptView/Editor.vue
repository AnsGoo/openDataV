<template>
  <OCodeEditor ref="cm" v-model:value="form" @update:value="formChange">
    <template #tool-bar>
      <div>
        <div class="buttons">
          <x-icon class="item button" name="back" @click="handleUndo" />
          <x-icon class="item button" name="next" @click="handleRedo" />
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
import { ref, watch } from 'vue'

import type { CodemirrorOption } from '@/components/CodeEditor/type'

const savedStatus = ref<boolean>(true)
const props = withDefaults(
  defineProps<{
    value: string
    config?: CodemirrorOption
    mode?: 'use' | 'debug'
  }>(),
  {
    data: '',
    config: () => {
      return {
        height: '600px',
        tabSize: 4,
        indentWithTab: true,
        autofocus: true,
        disabled: false
      }
    },
    mode: 'use'
  }
)

const emits = defineEmits<{
  (e: 'update:value', value: string): void
  (e: 'change', value: string): void
}>()

const form = ref<string>(props.value)
const formChange = () => {
  emits('update:value', form.value)
  emits('change', form.value)
}

const cm = ref<HTMLElement | null>(null) as any
const handleRedo = () => {
  const handler = cm.value!.handleRedo
  if (handler) {
    handler()
  }
}
const handleUndo = () => {
  const handler = cm.value!.handleUndo
  if (handler) {
    handler()
  }
}

watch(
  () => props.value,
  () => {
    if (props.value) {
      form.value = props.value
    }
  }
)
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
        transform: scale(1.2);
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

  // .lang {
  //   background-color: #2080f0;
  // }
  .saved-status {
    &.save {
      background-color: #18a058;
    }
    &.unsave {
      background-color: #d03050;
    }
  }
}
</style>
