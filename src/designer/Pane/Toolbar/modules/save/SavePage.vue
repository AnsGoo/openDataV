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
import { reactive, ref } from 'vue'
import { NForm, NInput, NFormItem, NButton, NModal, NSpace } from 'naive-ui'
import type { FormItemRule } from 'naive-ui'
import { message } from '@/utils/message'
import type { LayoutData } from '@/api/pages'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { savePageApi, updatePageApi } from '@/api/pages'
import ConfigProvider from '@/components/provider/ConfigProvider.vue'
import router from '@/router'

const basicStore = useBasicStoreWithOut()
const props = defineProps<{ index?: string }>()

const saveDialogVisible = ref<boolean>(true)
const form = reactive<{
  name: string
  thumbnail: string
}>({
  name: basicStore.name,
  thumbnail: basicStore.thumbnail
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
    canvasData: basicStore.layoutData,
    canvasStyle: basicStore.canvasStyleData
  }

  if (type === 'update') {
    try {
      const resp = await updatePageApi(props.index!, layoutData)
      if (resp.status === 200) {
        message.success('修改成功')
        if (basicStore.name !== name) {
          basicStore.setName(name)
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
