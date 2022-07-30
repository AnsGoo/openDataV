<template>
  <div>
    <teleport to="body">
      <n-scrollbar class="container" v-show="visible" v-click-outside="clickOutsideHandler">
        <div v-for="item in images" :key="item.md5">
          <n-card class="card">
            <img :src="`${baseURL}${item.url}`" class="image" @click="handleClick(item.url)" />
          </n-card>
        </div>
        <div>
          <n-card class="card upload-card">
            <n-upload
              class="upload"
              :action="`${baseURL}/upload`"
              list-type="picture-card"
              :thumbnail-mode="false"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadFail"
              :headers="headers"
            >
              <n-icon>上传</n-icon>
            </n-upload>
          </n-card>
        </div>
      </n-scrollbar>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { copyText } from '@/utils/utils'
import { successMessage, warnMessage } from '@/utils/message'
import type { ImageFile } from '@/types/file'
import { getImages } from '@/api/file'
import { NCard, NScrollbar, NIcon } from 'naive-ui'
import { useUserStoreWithOut } from '@/store/modules/user'
const userStore = useUserStoreWithOut()

const uploadSuccess = async () => {
  successMessage('上传成功')
  await getImageList()
}
const uploadFail = async () => {
  warnMessage('上传失败')
}

const baseURL = ref<string>(import.meta.env.VITE_APP_BASE_URL)
defineProps<{
  visible: boolean
}>()

const headers = computed<any>(() => {
  const token: string | undefined = userStore.userToken
  if (token) {
    return { authorization: token }
  }
  return undefined
})

const emits = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

let images = ref<ImageFile[]>([])

const clickOutsideHandler = () => {
  emits('update:visible', false)
}

const handleClick = (url: string) => {
  copyText(`${baseURL.value}${url}`)
  successMessage(`复制图片地址: ${url}`)
}

onMounted(async () => {
  await getImageList()
})

const getImageList = async () => {
  try {
    images.value = await getImages()
  } catch (e: any) {
    console.log(e)
  }
}
</script>

<style scoped lang="less">
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 920px;
  min-height: 400px;
  height: 50vh;
  z-index: 1000;
  transform: translate(-50%, -50%);
  background-color: aliceblue;
  border-radius: 20px;
  overflow-y: auto;
  padding: 20px;
  :deep(.el-scrollbar__view) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .card {
      width: 150px;
      height: 150px;
      padding: 0 0;
      margin: 10px 10px;
      .el-card__body {
        padding: 0 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 150px;
        weight: 150px;
        .image {
          max-width: 150px;
          max-height: 150px;
        }
      }
    }
    .upload-card {
      .el-card__body {
        .upload {
          .el-upload--picture-card {
            width: 110px !important;
            height: 110px !important;
          }
        }
      }
    }
  }
}
</style>
