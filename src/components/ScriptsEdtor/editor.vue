<template>
  <CodeEditor
    :language="languageType"
    :config="config"
    :theme="projectStore.darkTheme ? 'dark' : 'light'"
    v-model:code="form.code"
    ref="cm"
    @change="formChange"
  >
    <template #tool-bar>
      <div class="buttons">
        <n-select
          :options="languageOptions"
          v-model:value="form.type"
          class="item language"
          size="small"
          @change="formChange"
        />
        <icon-park class="item button" name="back" @click="handleUndo" />
        <icon-park class="item button" name="next" @click="handleRedo" />
      </div>
    </template>
  </CodeEditor>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import CodeEditor from '@/components/CodeEditor'
import { CodemirrorOption } from '@/components/CodeEditor/type'
import { NSelect } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import { ScriptType } from './eunm'
import { ScriptEditorType } from './type'

const projectStore = useProjectSettingStoreWithOut()
const props = withDefaults(
  defineProps<{
    data: ScriptEditorType
  }>(),
  {
    data: () => {
      return {
        code: '',
        type: ScriptType.Javascript
      }
    }
  }
)
const config = ref<CodemirrorOption>({
  height: '300px',
  tabSize: 4,
  indentWithTab: true,
  autofocus: true,
  disabled: false
})

const emits = defineEmits<{
  (e: 'update:data', value: ScriptEditorType): void
  (e: 'change', value: ScriptEditorType): void
}>()
const languageMap = { Javascript: javascript, Python: python }

const form = reactive(props.data)
const formChange = () => {
  emits('change', form)
  emits('update:data', form)
}

const languageOptions = computed<SelectOption[]>(() => {
  return Object.keys(ScriptType).map((el) => {
    return {
      label: el,
      value: el
    }
  })
})

const language = ref<string>(ScriptType.Javascript)
const languageType = computed<Function>(() => {
  return languageMap[language.value] || javascript
})

const cm = ref<InstanceType<typeof CodeEditor> | null>(null)
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
