<template>
  <OCodeEditor ref="cm" :value="form.code" @update:value="formChange" @change="formChange">
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
  </OCodeEditor>
</template>

<script lang="ts" setup>
import type { SelectOption } from 'naive-ui'
import { NButton, NButtonGroup, NInput, NSelect, NSpace } from 'naive-ui'
import { computed, onMounted, reactive, ref, watch } from 'vue'

import {
  createAfterScriptApi,
  getAfterScriptApi,
  getAfterScriptListApi,
  updateAfterScriptApi
} from '@/api/data/afterScript'
import type { AfterScriptDetail } from '@/api/data/type'
import { Logger } from '@/utils/utils'

import { ScriptType } from '../const'
import type { AfterScript } from '../type'

const scriptList = ref<SelectOption[]>([])

const savedStatus = ref<boolean>(true)

const isShow = ref<boolean>(false)
const props = withDefaults(
  defineProps<{
    data?: AfterScript
    mode?: 'use' | 'debug' | 'view'
  }>(),
  {
    data: () => {
      return {
        id: undefined,
        code: '',
        type: ScriptType.Javascript
      }
    },
    mode: 'use'
  }
)

const emits = defineEmits<{
  (e: 'update:data', value: AfterScript): void
  (e: 'change', value: AfterScript): void
}>()

const formData = reactive<{
  id?: string
  title?: string
}>({})

const form = reactive(props.data)
const formChange = (value: string) => {
  form.code = value
  emits('update:data', { code: value, type: props.data.type || ScriptType.Javascript })
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

const cm = ref<HTMLElement | null>(null)
const handleSubmit = () => {
  emits('change', form)
  emits('update:data', form)
  savedStatus.value = true
  Logger.info('保存成功')
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
    Logger.log(err || err.message)
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
      Logger.info('脚本保存成功')
    } else {
      Logger.warn('脚本保存失败')
    }
  } catch (err) {
    Logger.warn('脚本保存失败')
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
      Logger.info('脚本更新成功')
    } else {
      Logger.warn('脚本更新失败')
    }
  } catch (err) {
    Logger.warn('脚本更新失败')
  }
}

const loadScriptData = async (id: string) => {
  try {
    const resp = await getAfterScriptApi(id)
    if (resp.status === 200) {
      const data: AfterScriptDetail = resp.data
      formData.id = data.id
      formData.title = data.name
      form.id = data.id
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
