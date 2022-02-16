<template>
  <div>
    <teleport to="body">
      <ElScrollbar class="container" v-show="visible" ref="imgDiv">
        <div v-for="item in images" :key="item.md5">
          <el-card class="card">
            <img :src="`${baseURL}${item.url}`" class="image" @click="handleClick(item.url)" />
          </el-card>
        </div>
        <div>
          <el-card class="card upload-card">
            <el-upload
              class="upload"
              :action="`${baseURL}/upload`"
              list-type="picture-card"
              :thumbnail-mode="false"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadFail"
              :headers="headers"
            >
              <el-icon>上传</el-icon>
            </el-upload>
          </el-card>
        </div>
      </ElScrollbar>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { copyText } from '@/utils/utils'
import { successMessage, warnMessage } from '@/utils/message'
import { onClickOutside } from '@vueuse/core'
import type { ImageFile } from '@/types/file'
import { getImages } from '@/api/file'
import { ElCard, ElUpload, ElScrollbar, ElIcon } from 'element-plus'
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

const imgDiv = ref<ElRef>(null)

let images = ref<ImageFile[]>([])

onClickOutside(imgDiv, () => {
  emits('update:visible', false)
})

const handleClick = (url: string) => {
  copyText(`${baseURL.value}${url}`)
  successMessage(`复制图片地址: ${url}`)
}

onMounted(async () => {
  await getImageList()
})

const getImageList = async () => {
  images.value = await getImages()
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
