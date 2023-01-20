<template>
  <div class="layout-header">
    <!--左侧菜单-->
    <div class="layout-header-left">
      <!-- 菜单收起 -->
      <div
        class="ml-1 layout-header-trigger layout-header-trigger-min"
        @click="() => emits('update:collapsed', !collapsed)"
      >
        <x-icon :name="!collapsed ? 'expandLeft' : 'expandRight'" :color="iconColor" />
      </div>
      <!-- 刷新 -->
      <div
        v-if="projectStore.headerSetting.isReload"
        class="mr-1 layout-header-trigger layout-header-trigger-min"
        @click="reloadPage"
      >
        <x-icon name="refresh" :color="iconColor" />
      </div>
      <!-- 面包屑 -->
      <n-breadcrumb v-if="projectStore.crumbsSetting.show">
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
          <n-breadcrumb-item>
            <n-dropdown
              v-if="routeItem.children.length"
              :options="routeItem.children"
              @select="dropdownSelect"
            >
              <span class="link-text">
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>
            <span v-else class="link-text" :style="{ color: iconColor }">
              {{ routeItem.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <div class="layout-header-right">
      <!--切换全屏-->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <x-icon :name="fullscreenIcon" :color="iconColor" @click="toggleFullScreen" />
          </template>
          <span>全屏</span>
        </n-tooltip>
      </div>

      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <x-icon :name="themeIcon" :color="iconColor" @click="toggleTheme" />
          </template>
          <span>主题</span>
        </n-tooltip>
      </div>
      <!-- 个人中心 -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-dropdown trigger="hover" :options="avatarOptions" @select="avatarSelect">
          <div class="avatar">
            <n-avatar round>
              {{ username }}
              <template #icon>
                <x-icon name="user" :color="iconColor" />
              </template>
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <x-icon name="github" :color="iconColor" @click="toGithub" />
          </template>
          <span>Github</span>
        </n-tooltip>
      </div>
      <!--设置-->
      <div class="layout-header-trigger layout-header-trigger-min" @click="openSetting">
        <n-tooltip placement="bottom-end">
          <template #trigger>
            <x-icon name="setting" :color="iconColor" />
          </template>
          <span>项目配置</span>
        </n-tooltip>
      </div>
    </div>
  </div>
  <!--项目配置-->
  <ProjectSetting ref="drawerSetting" />
</template>

<script lang="ts" setup>
import { ref, computed, unref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NTooltip, NDropdown, NAvatar, NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { useUserStoreWithOut } from '@/store/modules/user'
import ProjectSetting from './setting.vue'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import { message, dialog } from '@/utils/message'

defineProps<{
  collapsed: boolean
}>()

const emits = defineEmits<{
  (e: 'update:collapsed', collapsed: boolean)
}>()

const userStore = useUserStoreWithOut()
const projectStore = useProjectSettingStoreWithOut()

const username = userStore?.userName || ''

const drawerSetting = ref()
const fullscreenIcon = ref<string>('fullScreen')
const themeIcon = ref<string>('sun')

const router = useRouter()
const route = useRoute()

const iconColor = computed<string>(() => projectStore.iconColor)

const generator: any = (routerMap) => {
  return routerMap.map((item) => {
    const currentMenu = {
      ...item,
      label: item.meta.title,
      key: item.name,
      disabled: item.path === '/'
    }
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentMenu.children = generator(item.children)
    }
    return currentMenu
  })
}

const breadcrumbList = computed(() => {
  return generator(route.matched)
})

const dropdownSelect = async (key) => {
  await router.push({ name: key })
}

// 刷新页面
const reloadPage = async () => {
  await router.push({
    path: unref(route).fullPath
  })
}

// 退出登录
const doLogout = () => {
  dialog.info({
    title: '提示',
    content: '您确定要退出登录吗',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      userStore.logout().then(async () => {
        message.success('成功退出登录')
        await router
          .replace({
            name: 'Login',
            query: {
              redirect: route.fullPath
            }
          })
          .finally(() => location.reload())
      })
    },
    onNegativeClick: () => {}
  })
}

// 切换全屏图标
const toggleFullscreenIcon = () => {
  fullscreenIcon.value = document.fullscreenElement ? 'off-screen-one' : 'full-screen-one'
}

const toGithub = () => {
  window.open('https://github.com/AnsGoo/openDataV', '_blank')
}

// 切换主题
const toggleTheme = () => {
  projectStore.setNavTheme(!projectStore.darkTheme ? 'light' : 'dark')
  projectStore.setDarkTheme(!projectStore.darkTheme)
  themeIcon.value = projectStore.darkTheme ? 'sun' : 'moon'
}

// 监听全屏切换事件
document.addEventListener('fullscreenchange', toggleFullscreenIcon)

// 全屏切换
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

const avatarOptions = [
  {
    label: '个人设置',
    key: 1
  },
  {
    label: '退出登录',
    key: 2
  }
]

//头像下拉菜单
const avatarSelect = async (key) => {
  switch (key) {
    case 1:
      await router.push({ name: 'Setting' })
      break
    case 2:
      doLogout()
      break
  }
}

function openSetting() {
  const { openDrawer } = drawerSetting.value
  openDrawer()
}
</script>

<style lang="less" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: @header-height;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: all 0.2s ease-in-out;
  width: 100%;
  z-index: 11;

  &-left {
    display: flex;
    align-items: center;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 64px;
      line-height: 64px;
      overflow: hidden;
      white-space: nowrap;
      padding-left: 10px;

      img {
        width: auto;
        height: 32px;
        margin-right: 10px;
      }

      .title {
        margin-bottom: 0;
      }
    }

    ::v-deep(.ant-breadcrumb span:last-child .link-text) {
      color: #515a6e;
    }

    .n-breadcrumb {
      display: inline-block;
    }

    &-menu {
      color: var(--text-color);
    }
  }

  &-right {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .avatar {
      display: flex;
      align-items: center;
      height: 64px;
    }

    > * {
      cursor: pointer;
    }
  }

  &-trigger {
    display: inline-block;
    width: 64px;
    height: 64px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    .n-icon {
      display: flex;
      align-items: center;
      height: 64px;
      line-height: 64px;
    }

    &:hover {
      background: hsla(0, 0%, 100%, 0.08);
    }

    .anticon {
      font-size: 16px;
      color: #515a6e;
    }
  }

  &-trigger-min {
    width: auto;
    padding: 0 12px;
  }
}

.layout-header-light {
  background: #fff;
  color: #515a6e;

  .n-icon {
    color: #515a6e;
  }

  .layout-header-left {
    ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
      color: #515a6e;
    }
  }

  .layout-header-trigger {
    &:hover {
      background: #f8f8f9;
    }
  }
}

.layout-header-fix {
  position: fixed;
  top: 0;
  right: 0;
  left: 200px;
  z-index: 11;
}
</style>
