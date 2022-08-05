<template>
  <div class="container">
    <div class="toolbar">
      <n-button type="primary" :loading="loading" @click="handleCreate"> 新建 </n-button>
    </div>

    <div class="card" v-for="item in layoutList" :key="item.id">
      <n-card :key="item.id" hoverable>
        <template #header>
          <n-ellipsis style="max-width: 8rem">
            {{ item.name }}
          </n-ellipsis>
        </template>
        <img :src="previewIcon(item.thumbnail)" class="image" @click="handleView(item)" alt="" />
        <template #action>
          <div class="options">
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-button quaternary @click="handleEdit(item)">
                  <template #icon>
                    <icon-park name="editor" />
                  </template>
                </n-button>
              </template>
              <span>编辑</span>
            </n-tooltip>
            <n-dropdown
              trigger="hover"
              @select="(key) => handleSelect(key, item)"
              :options="options"
            >
              <icon-park name="setting" />
            </n-dropdown>
          </div>
        </template>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUIComponentsList, deleteUIComponents } from '@/api/pages'
import type { LayoutData } from '@/types/apiTypes'
import { onMounted, ref, h } from 'vue'
import defaultImg from '@/assets/default.png'
import { useRouter } from 'vue-router'
import { message } from '@/utils/message'
import { IconPark } from '@/plugins/icon'
import { NCard, NEllipsis, NTooltip, NDropdown, DropdownOption, NButton } from 'naive-ui'

const router = useRouter()
const loading = ref<boolean>(false)
const layoutList = ref<LayoutData[]>([])
const options: DropdownOption[] = [
  {
    key: 'preview',
    label: '预览',
    icon: renderIcon('preview-open')
  },
  {
    key: 'delete',
    label: '删除',
    icon: renderIcon('delete-one')
  }
]

onMounted(async () => {
  await initUI()
})

function renderIcon(icon: string) {
  return () =>
    h(IconPark, {
      name: icon
    })
}

const initUI = async (): Promise<void> => {
  const resp: LayoutData[] = await getUIComponentsList()
  if (resp) {
    layoutList.value = resp
  }
}

const handleSelect = async (key: string | number, item: LayoutData) => {
  if (key === 'preview') {
    router.push({
      name: 'PageView',
      params: {
        index: item.id
      }
    })
  } else if (key === 'delete') {
    try {
      await deleteUIComponents(item.id as string)
      await initUI()
    } catch (e: any) {
      console.log(e?.message || e)
      message.error('删除失败')
    }
  }
}

const handleCreate = () => {
  if (loading.value) {
    return false
  }

  loading.value = true
  router.push({
    name: 'Create'
  })
}

const handleEdit = (item: LayoutData) => {
  if (loading.value) {
    return false
  }

  loading.value = true
  router.push({
    name: 'Editor',
    params: {
      index: item.id
    }
  })
}

const handleView = (item: LayoutData) => {
  router.push({
    name: 'PageView',
    params: {
      index: item.id
    }
  })
}

const previewIcon = (icon: string | undefined) => {
  return icon ? icon : defaultImg
}
</script>

<style lang="less" scoped>
@layer components {
  .container {
    @apply flex h-full mx-auto flex-wrap relative;
    align-content: flex-start;

    .card {
      @apply p-2;

      width: 20%;
      transition: all 0.3s ease;
      transform-origin: center;
    }

    .toolbar {
      @apply flex flex-col justify-start items-center absolute top-4 -left-16;
    }
  }

  .options {
    padding: 5px 14px 14px 14px;
    @apply flex justify-between items-center;
  }
}
</style>
