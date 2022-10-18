<template>
  <CodeEditor
    :config="config"
    :theme="projectStore.darkTheme ? 'dark' : 'light'"
    v-model:code="contentRef"
    ref="cm"
    @change="formChange"
  >
    <template #footer>
      <div class="footer">
        <div class="left">{{ title ? `数据名称：${title}` : '' }}</div>
        <div class="right">
          <div :class="['saved-status', savedStatus ? 'save' : 'unsave']">
            {{ savedStatus ? '已保存' : '未保存' }}
          </div>
          <div class="lang">JSON</div>
        </div>
      </div>
    </template>
  </CodeEditor>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import CodeEditor from '@/components/CodeEditor'
import { CodemirrorOption } from '@/components/CodeEditor/type'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

const savedStatus = ref<boolean>(true)

const projectStore = useProjectSettingStoreWithOut()
const props = withDefaults(
  defineProps<{
    disable?: boolean
    content?: any
    title?: string
  }>(),
  {
    disabled: false,
    content: '',
    title: ''
  }
)
const config = computed<CodemirrorOption>(() => {
  return {
    height: '600px',
    tabSize: 4,
    indentWithTab: true,
    autofocus: true,
    disabled: props.disable || false
  }
})

const emits = defineEmits<{
  (e: 'update:content', content?: string): void
}>()

const contentRef = computed<string>(() => {
  return JSON.stringify(props.content, null, '\t')
})
const formChange = (value: string) => {
  emits('update:content', JSON.parse(value))
  savedStatus.value = false
}
</script>
<style lang="less" scoped>
.buttons {
  display: flex;
  .item {
    display: block;
    margin-left: 5px;
    margin-right: 5px;
    &.data {
      width: 120px;
    }
    &.button {
      &:hover {
        transform: scale(1.5);
      }
    }
  }
}
.footer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  div {
    margin-left: 5px;
    font-weight: 800;
    padding: 0 2px;
    border-radius: 2px;
  }
  .left {
    color: #2080f0;
  }
  .right {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
    color: #ffff;
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
  }
}
</style>
