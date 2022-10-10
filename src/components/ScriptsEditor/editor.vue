<template>
  <CodeEditor
    :language="languageType"
    :config="config"
    :theme="projectStore.darkTheme ? 'dark' : 'light'"
    v-model:code="form.code"
    ref="cm"
    @update:code="formChange"
  >
    <template #tool-bar>
      <div class="buttons">
        <n-select
          :options="languageOptions"
          v-model:value="form.type"
          class="item language"
          size="small"
          @update:value="formChange"
        />
        <icon-park class="item button" name="save-one" @click="handleSave" />
        <icon-park class="item button" name="back" @click="handleUndo" />
        <icon-park class="item button" name="next" @click="handleRedo" />
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <div :class="['saved-status', savedStatus ? 'save' : 'unsave']">
          {{ savedStatus ? '已保存' : '未保存' }}
        </div>
        <div class="lang">{{ form.type || 'JSON' }}</div>
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
import { message } from '@/utils/message'

const savedStatus = ref<boolean>(true)

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
  savedStatus.value = false
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

const handleSave = () => {
  emits('change', form)
  emits('update:data', form)
  savedStatus.value = true
  message.success('保存成功')
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
</style>
