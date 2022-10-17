<template>
  <CodeEditor
    :config="config"
    :theme="projectStore.darkTheme ? 'dark' : 'light'"
    v-model:code="contentRef"
    ref="cm"
    @change="formChange"
  >
    <template #tool-bar>
      <div class="buttons">
        <n-select
          :options="staticDataList"
          :value="id"
          class="item data"
          size="small"
          @update:value="dataChange"
          clearable
          @clear="clearSelect"
        />
        <icon-park class="item button" name="save-one" @click="id ? handleSave : handleUpdate" />
      </div>
    </template>
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import CodeEditor from '@/components/CodeEditor'
import { CodemirrorOption } from '@/components/CodeEditor/type'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import {
  createStaticDataApi,
  getStaticDataListApi,
  StaticDataDetail,
  updateStaticDataApi
} from '@/api/data'
import { NSelect } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { message, dialog } from '@/utils/message'

const staticDataList = ref<Array<SelectOption>>([])

const savedStatus = ref<boolean>(true)

const projectStore = useProjectSettingStoreWithOut()
const props = withDefaults(
  defineProps<{
    id?: string
    disable?: boolean
    content?: any
    title?: string
  }>(),
  {
    id: '',
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
  (e: 'update:id', id?: string): void
  (e: 'change', id: string, title: string): void
}>()

const contentRef = computed<string>(() => {
  return JSON.stringify(props.content, null, '\t')
})
const formChange = () => {
  savedStatus.value = false
}

const dataChange = async (value: string, option) => {
  let title = option ? option.label : ''
  emits('change', value, title!)
  emits('update:id', value)
  savedStatus.value = true
}

const clearSelect = () => {
  savedStatus.value = true
  emits('update:id', '')
  emits('change', '', '')
}
const loadStaticList = async () => {
  try {
    const resp = await getStaticDataListApi()
    if (resp.status === 200) {
      staticDataList.value = resp.data.map((el: StaticDataDetail) => {
        return {
          label: el.name,
          value: el.id
        }
      })
    }
  } catch (err: any) {
    console.log(err || err.message)
  }
}

const handleSave = async () => {
  try {
    const resp = await createStaticDataApi(JSON.parse(contentRef.value))
    if (resp.status === 201) {
      await loadStaticList()
      const data = resp.data as StaticDataDetail
      emits('update:id', undefined)
      emits('change', data.id!, data.name)
      emits('update:id', data.id)
      savedStatus.value = false
      message.success('数据保存成功')
    } else {
      message.warning('数据保存失败')
    }
  } catch (err) {
    message.warning('数据保存失败')
  }
}
const handleUpdate = async () => {
  try {
    const resp = await updateStaticDataApi(props.id!, JSON.parse(contentRef.value))
    if (resp.status === 200) {
      message.success('数据更新成功')
      savedStatus.value = false
    } else {
      message.warning('数据更新失败')
    }
  } catch (err) {
    message.warning('数据更新失败')
  }
}

onMounted(async () => {
  await loadStaticList()
})

onUnmounted(async () => {
  if (!savedStatus.value) {
    dialog.warning({
      title: '警告',
      content: '静态数据尚未保存，是否立刻保存？',
      positiveText: '确定',
      negativeText: '不确定',
      onPositiveClick: async () => {
        if (props.id) {
          await handleUpdate()
        } else {
          await handleSave()
        }
      },
      onNegativeClick: () => {
        message.warning('静态数据未保存')
      }
    })
  }
})
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
