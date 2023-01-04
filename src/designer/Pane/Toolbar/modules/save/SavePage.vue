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
        <n-form-item v-show="!form.screenshot" label="页面缩略图" prop="thumbnail">
          <n-input v-model:value="form.thumbnail" placeholder="请输入缩略图地址" />
        </n-form-item>
        <n-form-item prop="screenshot">
          截图大屏作为缩略图：(值为Base64，后端需要转换)
          <n-checkbox v-model:checked="form.screenshot" />
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
import type { FormItemRule } from 'naive-ui'
import { NButton, NCheckbox, NForm, NFormItem, NInput, NModal, NSpace } from 'naive-ui'
import { message } from '@/utils/message'
import type { LayoutData } from '@/api/pages'
import { savePageApi, updatePageApi } from '@/api/pages'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import ConfigProvider from '@/components/provider/ConfigProvider.vue'
import router from '@/router'
import type { Options as Html2CanvasOptions } from 'html2canvas'
import html2canvas from 'html2canvas'

const basicStore = useBasicStoreWithOut()
const props = defineProps<{ index?: string }>()

const saveDialogVisible = ref<boolean>(true)
const form = reactive<{
  name: string
  thumbnail: string
  screenshot: boolean
}>({
  name: basicStore.name,
  thumbnail: basicStore.thumbnail,
  screenshot: false
})
const rules = reactive<{
  name: FormItemRule[]
}>({
  name: [{ required: true, message: '请输入页面名称', trigger: 'blur' }]
})

// 将界面生成图片并下载
function createImgByHtml() {
  const canvasData: HTMLDivElement = document.querySelector('#editor1')!
  return new Promise<string>((resolve, reject) => {
    if (canvasData) {
      const options: Partial<Html2CanvasOptions> = {
        width: canvasData.offsetWidth,
        height: canvasData.offsetHeight,
        backgroundColor: 'transparent',
        useCORS: true,
        logging: false,
        scale: 1
      }
      html2canvas(canvasData, options).then((canvas) => {
        // 转换为 base64
        const base64 = canvas.toDataURL('image/png', 1)
        resolve(base64)
      })
    } else {
      reject({
        error: '未获取到大屏页面'
      })
    }
  })
}

const handleSubmit = async (type: string) => {
  // 选择截图作为图片
  if (form.screenshot) {
    try {
      form.thumbnail = await createImgByHtml()
    } catch (e: any) {
      message.error(e.error)
      throw '未获取到大屏页面'
    }
  }
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
        router.push({
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
