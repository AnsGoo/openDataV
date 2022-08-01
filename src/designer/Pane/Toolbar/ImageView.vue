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
          <n-card class="card upload-card"> 上传 </n-card>
        </div>
      </n-scrollbar>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { copyText } from '@/utils/utils'
import { message } from '@/utils/message'
import type { ImageFile } from '@/types/file'
import { getImages } from '@/api/file'
import { NCard, NScrollbar } from 'naive-ui'

const baseURL = ref<string>(import.meta.env.VITE_APP_BASE_URL)
defineProps<{
  visible: boolean
}>()

const emits = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

let images = ref<ImageFile[]>([])

const clickOutsideHandler = () => {
  emits('update:visible', false)
}

const handleClick = (url: string) => {
  copyText(`${baseURL.value}${url}`)
  message.success(`复制图片地址: ${url}`)
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
}
</style>
