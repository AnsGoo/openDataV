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
import { computed, reactive, ref, watch } from 'vue'
import { NSelect } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { python } from '@codemirror/lang-python'
import { javascript } from '@codemirror/lang-javascript'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
/* eslint-disable-next-line @typescript-eslint/consistent-type-imports */
import CodeEditor from '@/components/CodeEditor'
import type { CodemirrorOption } from '@/components/CodeEditor/type'
import { ScriptType } from '@/enum'
import type { AfterScript } from '@/types/component'

const projectStore = useProjectSettingStoreWithOut()
const savedStatus = ref<boolean>(true)
const isShow = ref<boolean>(false)
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

const form = reactive(props.data)
const formChange = () => {
  emits('update:data', form)
  emits('change', form)
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

watch(
  () => props.data,
  () => {
    if (props.data) {
      form.code = props.data.code
      form.type = props.data.type
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
