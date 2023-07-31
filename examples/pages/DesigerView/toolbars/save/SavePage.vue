<template>
  <ConfigProvider>
    <n-modal
      :show="saveDialogVisible"
      :mask-closable="false"
      preset="card"
      center
      title="保存当前布局"
      style="width: 30%; min-width: 600px"
      size="medium"
      @update:show="saveDialogVisible = false"
    >
      <n-form :model="form" :rules="rules" @submit.prevent>
        <n-form-item label="页面名称" prop="name">
          <n-input v-model:value="form.name" placeholder="请输入页面名称" />
        </n-form-item>
        <n-form-item label="页面缩略图" prop="thumbnail">
          <n-input v-model:value="form.thumbnail" placeholder="请输入缩略图地址" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space>
          <n-button @click="saveDialogVisible = false">取消</n-button>
          <n-button v-if="!index" type="primary" @click="handleSubmit('new')">新增</n-button>
          <n-button v-else type="primary" @click="handleSubmit('update')">更新</n-button>
        </n-space>
      </template>
    </n-modal>
  </ConfigProvider>
</template>
<script lang="ts" setup>
import type { FormItemRule } from 'naive-ui'
import { NButton, NForm, NFormItem, NInput, NModal, NSpace } from 'naive-ui'
import useCanvasState from 'open-data-v/designer/state/canvas'
import { reactive, ref } from 'vue'

import type { LayoutData } from '@/api/pages'
import { savePageApi, updatePageApi } from '@/api/pages'
import ConfigProvider from '@/components/provider/ConfigProvider.vue'
import router from '@/router'
import { message } from '@/utils/message'

const canvasState = useCanvasState()
const props = defineProps<{ index?: string }>()

const saveDialogVisible = ref<boolean>(true)
const form = reactive<{
  name: string
  thumbnail: string
}>({
  name: canvasState.name,
  thumbnail: canvasState.thumbnail
})
const rules = reactive<{
  name: FormItemRule[]
}>({
  name: [{ required: true, message: '请输入页面名称', trigger: 'blur' }]
})

const handleSubmit = async (type: string) => {
  const { name, thumbnail } = form
  if (!name) {
    message.error('请输入页面名称')
    return
  }

  const layoutData: LayoutData = {
    name: name,
    thumbnail: thumbnail!,
    canvasData: canvasState.layoutData,
    canvasStyle: canvasState.canvasStyleData,
    dataSlotters: canvasState.dataSlotterData
  }

  if (type === 'update') {
    try {
      const resp = await updatePageApi(props.index!, layoutData)
      if (resp.status === 200) {
        message.success('修改成功')
        if (canvasState.name !== name) {
          canvasState.setName(name)
        }
      }
    } catch (e) {
      message.error('保存失败，请导出到本地，并重新进入此页面')
    } finally {
      saveDialogVisible.value = false
    }
  } else {
    try {
      const result = await savePageApi(layoutData)
      if (result.status === 201) {
        message.success('保存成功')
        // 新增页面成功，则跳转到编辑页
        await router.push({
          name: 'Editor',
          params: {
            index: result.data.id
          }
        })
      }
    } catch (e: any) {
      message.error(`保存失败，失败信息:${e?.message || e}`)
    } finally {
      saveDialogVisible.value = false
    }
  }
}
</script>
