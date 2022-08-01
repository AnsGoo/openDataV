<template>
  <div class="bg">
    <div class="container">
      <div class="card" v-for="item in layoutList" :key="item.id">
        <n-card
          :key="item.id"
          :body-style="{ padding: '0px', position: 'relative' }"
          :title="item.name"
        >
          <img :src="previewIcon(item.thumbnail)" class="image" @click="handleView(item)" />
          <div class="delete">
            <span class="icon iconfont icon-shouye shouye" v-show="item.isHome"></span>
            <span class="icon iconfont icon-shanchu shanchu" @click="handleDelete(item)"></span>
          </div>
          <div class="options">
            <span class="desc">{{ item.name }}</span>
            <div class="bottom">
              <span
                class="icon iconfont icon-bianji"
                title="编辑页面"
                @click="handleEdit(item)"
              ></span>
              <span
                class="icon iconfont icon-chakan"
                title="查看页面"
                @click="handleView(item)"
              ></span>
              <span
                class="icon iconfont icon-fuzhi"
                title="复制页面路由地址"
                @click="handleCopy(item)"
              ></span>
              <span
                v-if="!item.isHome"
                class="icon iconfont icon-leijianzhuxiulix"
                title="配置"
                @click="handleConfigAllowed(item)"
              ></span>
              <span
                v-if="!item.isHome"
                class="icon iconfont icon-shouye-moren"
                title="设置为默认首页"
                @click="handleSetHome(item)"
              ></span>
              <span
                v-else
                style="color: #67c23a"
                class="icon iconfont icon-shouye-moren"
                title="首页"
              ></span>
            </div>
          </div>
        </n-card>
      </div>
      <div class="card">
        <n-card
          class="box-card"
          @click="handleCreate()"
          :body-style="{ padding: '0px', position: 'relative' }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path
              fill="#ddd"
              d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
            />
          </svg>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUIComponentsList, deleteUIComponents, setHomePage } from '@/api/pages'
import type { LayoutData } from '@/types/apiTypes'
import { onMounted, ref } from 'vue'
import defaultImg from '@/assets/default.png'
import { useRouter } from 'vue-router'
import { copyText } from '@/utils/utils'
import { successMessage, errorMessage } from '@/utils/message'
import { NCard } from 'naive-ui'
import { getUsers } from '@/api/user'
const router = useRouter()
const layoutList = ref<LayoutData[]>([])
const isShow = ref<boolean>(false)
const users = ref<string[]>([])
const currentPage = ref<LayoutData | null>(null)

onMounted(async () => {
  await loadUsers()
  await initUI()
})

const loadUsers = async (): Promise<void> => {
  try {
    users.value = await getUsers()
  } catch (err: any) {
    console.log(err.message || err)
  }
}
const initUI = async (): Promise<void> => {
  const resp: LayoutData[] = await getUIComponentsList()
  if (resp) {
    layoutList.value = resp
  }
}

const handleCreate = () => {
  router.push({
    name: 'Create'
  })
}

const handleEdit = (item: LayoutData) => {
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

const handleCopy = (item: LayoutData) => {
  copyText(`/page/${item.id}/view`)
  successMessage(`路由复制成功: /page/${item.id}/view`)
}

const handleSetHome = async (item: LayoutData) => {
  try {
    await setHomePage(item.id!)
    successMessage('设置成功')
    await initUI()
  } catch (e: any) {
    errorMessage('设置失败')
  }
}

const handleDelete = async (item: LayoutData) => {
  try {
    await deleteUIComponents(item.id as string)
    await initUI()
  } catch (e: any) {
    console.log(e?.message || e)
    errorMessage('删除失败')
  }
}

const previewIcon = (icon: string | undefined) => {
  return icon ? icon : defaultImg
}

const image = ref<string>(
  `url('${(import.meta.env.VITE_BACKGROUND as string) || '/images/bg.jpg'}')`
)

const handleConfigAllowed = (item: LayoutData) => {
  isShow.value = true
  currentPage.value = item
}
</script>

<style lang="less" scoped>
@layer components {
  .container {
    @apply flex h-full mx-auto flex-wrap;
    align-content: flex-start;
    width: 80vw;
    margin: 5vw auto;

    .card {
      @apply p-2;

      width: 10vw;
      // height: 230px;
      transition: all 0.3s ease;
      transform-origin: center;

      &:hover {
        transform: scale(1.1);
      }

      &:active {
        transform: scale(1);
      }

      .box-card {
        @apply w-full h-full;

        height: calc(100%);
      }
    }
  }

  .bg {
    @apply bg-gray-100 w-screen h-screen border border-transparent;
  }

  .delete {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    color: red;
    overflow: hidden;
    text-align: center;
    cursor: pointer;

    .shanchu {
      position: absolute;
      display: none;
      color: red;
      right: 0;
      top: 0;
    }

    .shouye {
      position: absolute;
      color: red;
      left: 50%;
      top: 50%;
      font-size: 30px;
      transform: translate(-50%, -50%);
    }
  }

  .card:hover .shanchu {
    display: block;
  }

  .bottom {
    display: flex;
    margin-top: 5px;
    color: #1296db;
    justify-content: space-between;
  }

  .options {
    padding: 5px 14px 14px 14px;
    c {
      white-space: nowrap; /*强制span不换行*/
      display: inline-block; /*将span当做块级元素对待*/
      width: 100%; /*限制宽度*/
      overflow: hidden; /*超出宽度部分隐藏*/
      text-overflow: ellipsis; /*超出部分以点号代替*/
      line-height: 0.9; /*数字与之前的文字对齐*/
    }
  }
}
</style>
