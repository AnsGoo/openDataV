<template>
  <CodeEditor
    ref="cm"
    v-model:code="form.code"
    :language="languageType"
    :config="config"
    :theme="projectStore.darkTheme ? 'dark' : 'light'"
    @update:code="formChange"
  >
    <template #tool-bar>
      <div>
        <div class="script">
          <n-select
            :options="scriptList"
            :value="formData.id"
            class="selected"
            clearable
            @update:value="selectedChange"
            @clear="clear"
          />
          <n-input v-if="mode === 'debug'" v-model:value="formData.title" class="title">
            <template #prefix>
              <x-icon name="code" />
            </template>
          </n-input>
          <n-space v-if="mode === 'debug'">
            <n-button-group class="save">
              <n-button :disabled="formData.id === undefined" @click="handleUpdate">更新</n-button>
              <n-button type="success" @click="handleSave">另存为</n-button>
            </n-button-group>
          </n-space>
        </div>
        <div class="buttons">
          <x-icon class="item button" name="save" @click="handleSubmit" />
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
        <div class="lang" @click="isShow = true">
          <n-select
            v-model:value="form.type"
            :options="languageOptions"
            class="item language"
            size="tiny"
            style="width: 110px"
            @update:value="formChange"
          />
        </div>
      </div>
    </template>
  </CodeEditor>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch, onMounted } from 'vue'
/* eslint-disable-next-line @typescript-eslint/consistent-type-imports */
import CodeEditor from '@/components/CodeEditor'
import type { CodemirrorOption } from '@/components/CodeEditor/type'
import { NSelect, NInput, NSpace, NButtonGroup, NButton } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import { ScriptType } from '@/enum'
import type { AfterScript } from '@/types/component'
import { message } from '@/utils/message'
import {
  getAfterScriptListApi,
  updateAfterScriptApi,
  createAfterScriptApi,
  getAfterScriptApi
} from '@/api/data/afterScript'
import type { AfterScriptDetail } from '@/api/data/type'

const scriptList = ref<SelectOption[]>([])

const savedStatus = ref<boolean>(true)

const isShow = ref<boolean>(false)

const projectStore = useProjectSettingStoreWithOut()
const props = withDefaults(
  defineProps<{
    data: AfterScript
    config?: CodemirrorOption
    mode?: 'use' | 'debug'
  }>(),
  {
    data: () => {
      return {
        code: '',
        type: ScriptType.Javascript
      }
    },
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
  (e: 'update:data', value: AfterScript): void
  (e: 'change', value: AfterScript): void
}>()
const languageMap = { Javascript: javascript, Python: python }

const formData = reactive<{
  id?: string
  title?: string
}>({})

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

const handleSubmit = () => {
  emits('change', form)
  emits('update:data', form)
  savedStatus.value = true
  message.success('保存成功')
}

const loadStaticList = async () => {
  try {
    const resp = await getAfterScriptListApi()
    if (resp.status === 200) {
      scriptList.value = resp.data.map((el) => {
        return {
          value: el.id,
          label: el.name
        }
      })
    }
  } catch (err: any) {
    console.log(err || err.message)
  }
}

watch(
  () => props.data,
  () => {
    if (props.data) {
      form.code = props.data.code
      form.type = props.data.type
    }
  }
)

const selectedChange = async (id: string) => {
  if (id) {
    await loadScriptData(id)
  } else {
    clear()
  }
}

const clear = () => {
  formData.id = undefined
  formData.title = undefined
  form.code = ''
  form.type = ScriptType.Javascript
}
const handleSave = async () => {
  try {
    const resp = await createAfterScriptApi({
      name: formData.title || '未命名',
      code: props.data.code,
      type: props.data.type
    })
    if (resp.status === 201) {
      const data: AfterScriptDetail = resp.data
      formData.id = data.id!
      formData.title = data.name
      message.success('脚本保存成功')
    } else {
      message.warning('脚本保存失败')
    }
  } catch (err) {
    message.warning('脚本保存失败')
  }
}
const handleUpdate = async () => {
  try {
    const resp = await updateAfterScriptApi(formData.id!, {
      name: formData.title || '未命名',
      code: props.data.code,
      type: props.data.type
    })
    if (resp.status === 200) {
      message.success('脚本更新成功')
    } else {
      message.warning('脚本更新失败')
    }
  } catch (err) {
    message.warning('脚本更新失败')
  }
}

const loadScriptData = async (id: string) => {
  try {
    const resp = await getAfterScriptApi(id)
    if (resp.status === 200) {
      const data: AfterScriptDetail = resp.data
      formData.id = data.id
      formData.title = data.name
      form.code = data.code
      form.type = data.type
      emits('change', form)
      emits('update:data', form)
    }
  } catch (err) {
    return undefined
  }
}

onMounted(async () => {
  await loadStaticList()
})
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
