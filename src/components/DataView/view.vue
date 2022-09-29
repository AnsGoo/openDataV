<template>
  <CodeEditor
    :config="config"
    :theme="projectStore.darkTheme ? 'dark' : 'light'"
    v-model:code="contentRef"
    ref="cm"
    @change="formChange"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import CodeEditor from '@/components/CodeEditor'
import { CodemirrorOption } from '@/components/CodeEditor/type'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

const projectStore = useProjectSettingStoreWithOut()
const props = withDefaults(
  defineProps<{
    content?: string
    disable?: boolean
  }>(),
  {
    content: '',
    disabled: false
  }
)
const config = computed<CodemirrorOption>(() => {
  return {
    height: '300px',
    tabSize: 4,
    indentWithTab: true,
    autofocus: true,
    disabled: props.disable || false
  }
})

const emits = defineEmits<{
  (e: 'update:content', value: string): void
  (e: 'change', value: string): void
}>()

const contentRef = ref<string>(props.content)
const formChange = () => {
  emits('change', contentRef.value)
  emits('update:content', contentRef.value)
}
</script>
<style lang="less" scoped>
.buttons {
  display: flex;
  .item {
    display: block;
    margin-left: 5px;
    margin-right: 5px;
    &.language {
      width: 120px;
    }
    &.button {
      &:hover {
        transform: scale(1.5);
      }
    }
  }
}
</style>
