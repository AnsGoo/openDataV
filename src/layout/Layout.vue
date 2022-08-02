<template>
  <n-layout class="layout" :position="fixedMenu" has-sider>
    <n-layout-sider
      show-trigger="bar"
      @collapse="collapsed = true"
      :position="fixedMenu"
      @expand="collapsed = false"
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="leftMenuWidth"
      :native-scrollbar="false"
      :inverted="inverted"
      class="layout-sider"
    >
      <Logo :collapsed="collapsed" />
      <AsideMenu v-model:collapsed="collapsed" />
    </n-layout-sider>

    <n-layout :inverted="inverted">
      <n-layout-header :inverted="getHeaderInverted" :position="fixedHeader">
        <PageHeader v-model:collapsed="collapsed" />
      </n-layout-header>

      <n-layout-content
        class="layout-content"
        :class="{ 'layout-default-background': darkTheme === false }"
      >
        <div
          class="layout-content-main"
          :class="{
            'fluid-header': fixedHeader === 'static'
          }"
        >
          <div
            class="main-view"
            :class="{
              noMultiTabs: true,
              'mt-3': true
            }"
          >
            <MainView />
          </div>
        </div>
      </n-layout-content>
      <n-back-top :right="100" />
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { ref, unref, computed, onMounted } from 'vue'
import { MainView } from './components/Main'
import { AsideMenu } from './components/Menu'
import { PageHeader } from './components/Header'
import { Logo } from './components/Logo'
import { useLoadingBar } from 'naive-ui'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import { useDesignSettingWithOut } from '@/store/modules/designSetting'
import { NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, NBackTop } from 'naive-ui'

const designStore = useDesignSettingWithOut()
const projectStore = useProjectSettingStoreWithOut()
const collapsed = ref<boolean>(false)

const darkTheme = computed<boolean>(() => designStore.getDarkTheme)
const fixedHeader = computed(() => {
  const { fixed } = unref(projectStore.getHeaderSetting)
  return fixed ? 'absolute' : 'static'
})

const fixedMenu = computed(() => {
  const { fixed } = unref(projectStore.getHeaderSetting)
  return fixed ? 'absolute' : 'static'
})

const inverted = computed(() => {
  return ['dark', 'header-dark'].includes(unref(projectStore.getNavTheme))
})

const getHeaderInverted = computed(() => {
  const navTheme = unref(projectStore.getNavTheme)
  return ['light', 'header-dark'].includes(navTheme) ? unref(inverted) : !unref(inverted)
})

const leftMenuWidth = computed(() => {
  const { minMenuWidth, menuWidth } = unref(projectStore.getMenuSetting)
  return collapsed.value ? minMenuWidth : menuWidth
})

const watchWidth = () => {
  const Width = document.body.clientWidth
  if (Width <= 950) {
    collapsed.value = true
  } else collapsed.value = false
}

onMounted(() => {
  window.addEventListener('resize', watchWidth)
  //挂载在 window 方便与在js中使用
  const loading = useLoadingBar()
  loading.finish()
})
</script>

<style lang="less">
.layout-side-drawer {
  background-color: rgb(0, 20, 40);

  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }
}
</style>
<style lang="less" scoped>
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;

  &-default-background {
    background: #f5f7f9;
  }

  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }

  .layout-sider-fix {
    position: fixed;
    top: 0;
    left: 0;
  }

  .ant-layout {
    overflow: hidden;
  }

  .layout-right-fix {
    overflow-x: hidden;
    padding-left: 200px;
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
  }

  .layout-content {
    flex: auto;
    min-height: 100vh;
  }

  .n-layout-header.n-layout-header--absolute-positioned {
    z-index: 11;
  }

  .n-layout-footer {
    background: none;
  }
}

.layout-content-main {
  margin: 0 10px 10px;
  position: relative;
  padding-top: 64px;
}

.layout-content-main-fix {
  padding-top: 64px;
}

.fluid-header {
  padding-top: 0;
}

.main-view-fix {
  padding-top: 44px;
}

.noMultiTabs {
  padding-top: 0;
}
</style>
