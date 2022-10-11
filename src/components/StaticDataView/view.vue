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
          v-model:value="selectdata.id"
          class="item data"
          size="small"
          @update:value="dataChange"
          clearable
          @clear="clearSelect"
        />
        <icon-park
          class="item button"
          name="save-one"
          @click="selectdata.id ? handleSave : handleUpdate"
        />
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <div class="left">{{ selectdata.title ? `数据名称：${selectdata.title}` : '' }}</div>
        <div class="right">
          <div :class="['saved-status', savedStatus ? 'save' : 'unsave']">
            {{ savedStatus ? '已保存' : '未保存' }}
          </div>
          <div class="lang">'JSON'</div>
        </div>
      </div>
    </template>
  </CodeEditor>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import CodeEditor from '@/components/CodeEditor'
import { CodemirrorOption } from '@/components/CodeEditor/type'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import { createStaticData, getStaticDataList, StaticDataDetail, updateStaticData } from '@/api/data'
import { NSelect } from 'naive-ui'
import type { SelectOption } from 'naive-ui'
import { message } from '@/utils/message'

const staticDataList = ref<Array<SelectOption>>([])

const savedStatus = ref<boolean>(true)

const projectStore = useProjectSettingStoreWithOut()
const props = withDefaults(
  defineProps<{
    id?: string
    disable?: boolean
    content?: any
  }>(),
  {
    id: '',
    disabled: false,
    content: ''
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
const selectdata = reactive<{
  id?: string
  title?: string
}>({})

const emits = defineEmits<{
  (e: 'update:id', value: string): void
  (e: 'change', value: string): void
}>()

const contentRef = computed<string>(() => {
  return JSON.stringify(props.content, null, '\t')
})
const formChange = () => {
  savedStatus.value = false
  emits('change', selectdata.id!)
  emits('update:id', selectdata.id!)
}

const dataChange = async (value: string, option) => {
  selectdata.id = value
  selectdata.title = option.label
  emits('change', selectdata.id!)
  emits('update:id', selectdata.id!)
}

const clearSelect = () => {
  selectdata.id = undefined
  selectdata.title = undefined
  savedStatus.value = true
}
const loadStaticList = async () => {
  const resp = await getStaticDataList()
  if (resp.status === 200) {
    staticDataList.value = resp.data.map((el: StaticDataDetail) => {
      return {
        label: el.name,
        value: el.id
      }
    })
  }
}

const handleSave = async () => {
  try {
    const resp = await createStaticData(JSON.parse(contentRef.value))
    if (resp.status === 202) {
      selectdata.id = resp.data.id
      await loadStaticList()
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
    const resp = await updateStaticData(selectdata.id!, JSON.parse(contentRef.value))
    if (resp.status === 202) {
      message.success('数据更新失败')
    } else {
      message.warning('数据更新失败')
    }
  } catch (err) {
    message.warning('数据更新成功')
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
