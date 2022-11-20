<template>
  <n-drawer v-model:show="isDrawer" :width="width" :placement="placement">
    <n-drawer-content :title="title" :native-scrollbar="false">
      <div class="drawer">
        <n-divider title-placement="center">主题</n-divider>

        <div class="justify-center drawer-setting-item dark-switch">
          <n-tooltip placement="bottom">
            <template #trigger>
              <n-switch v-model:value="currentThemeSettings.darkTheme" class="dark-theme-switch">
                <template #checked>
                  <x-icon name="sun" :size="14" color="#ffd93b" />
                </template>
                <template #unchecked>
                  <x-icon name="moon" :size="14" color="#ffd93b" />
                </template>
              </n-switch>
            </template>
            <span>{{ currentThemeSettings.darkTheme ? '深' : '浅' }}色主题</span>
          </n-tooltip>
        </div>

        <n-divider title-placement="center">系统主题</n-divider>

        <div class="drawer-setting-item align-items-top">
          <span
            v-for="(item, index) in appThemeList"
            :key="index"
            class="theme-item"
            :style="{ 'background-color': item }"
            @click="togTheme(item)"
          >
            <x-icon
              v-if="item === currentThemeSettings.appTheme"
              :size="12"
              name="check"
              color="#FFF"
            />
          </span>
        </div>

        <n-divider title-placement="center">导航栏风格</n-divider>

        <div class="drawer-setting-item align-items-top">
          <div class="drawer-setting-item-style align-items-top">
            <n-tooltip placement="top">
              <template #trigger>
                <img :src="NavThemeDark" alt="暗色侧边栏" @click="togNavTheme('dark')" />
              </template>
              <span>暗色侧边栏</span>
            </n-tooltip>
            <n-badge v-if="currentThemeSettings.navTheme === 'dark'" dot color="#19be6b" />
          </div>

          <div class="drawer-setting-item-style">
            <n-tooltip placement="top">
              <template #trigger>
                <img :src="NavThemeLight" alt="白色侧边栏" @click="togNavTheme('light')" />
              </template>
              <span>白色侧边栏</span>
            </n-tooltip>
            <n-badge v-if="currentThemeSettings.navTheme === 'light'" dot color="#19be6b" />
          </div>

          <div class="drawer-setting-item-style">
            <n-tooltip placement="top">
              <template #trigger>
                <img :src="HeaderThemeDark" alt="暗色顶栏" @click="togNavTheme('header-dark')" />
              </template>
              <span>暗色顶栏</span>
            </n-tooltip>
            <n-badge v-if="currentThemeSettings.navTheme === 'header-dark'" dot color="#19be6b" />
          </div>
        </div>
        <n-divider title-placement="center">界面功能</n-divider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">固定顶栏</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="currentThemeSettings.headerSetting.fixed" />
          </div>
        </div>

        <n-divider title-placement="center">界面显示</n-divider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">显示重载页面按钮</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="currentThemeSettings.headerSetting.isReload" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">显示面包屑导航</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="currentThemeSettings.crumbsSetting.show" />
          </div>
        </div>

        <n-divider title-placement="center">动画</n-divider>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">禁用动画</div>
          <div class="drawer-setting-item-action">
            <n-switch v-model:value="currentThemeSettings.isPageAnimate" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <div class="drawer-setting-item-title">动画类型</div>
          <div class="drawer-setting-item-select">
            <n-select v-model:value="currentThemeSettings.pageAnimateType" :options="animates" />
          </div>
        </div>

        <div class="drawer-setting-item">
          <n-alert type="warning" :showIcon="false">
            <p>{{ alertText }}</p>
          </n-alert>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import type { ProjectSettingState } from '@/store/modules/projectSetting'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
import {
  NDrawer,
  NDrawerContent,
  NAlert,
  NSelect,
  NSwitch,
  NDivider,
  NTooltip,
  NBadge
} from 'naive-ui'
import type { DrawerPlacement } from 'naive-ui'
import NavThemeDark from '@/assets/images/nav-theme-dark.svg'
import NavThemeLight from '@/assets/images/nav-theme-light.svg'
import HeaderThemeDark from '@/assets/images/header-theme-dark.svg'

withDefaults(
  defineProps<{
    title?: string
    width?: number
  }>(),
  {
    title: '项目配置',
    width: 280
  }
)

const settingStore = useProjectSettingStoreWithOut()
const currentThemeSettings = computed<ProjectSettingState>(() => settingStore)
const isDrawer = ref<boolean>(false)
const placement = ref<DrawerPlacement>('right')
const alertText = ref<string>(
  '该功能主要实时预览各种布局效果，更多完整配置在 projectSetting.ts 中设置，建议在生产环境关闭该布局预览功能。'
)
const appThemeList = [
  '#2d8cf0',
  '#0960bd',
  '#0084f4',
  '#009688',
  '#536dfe',
  '#ff5c93',
  '#ee4f12',
  '#0096c7',
  '#9c27b0',
  '#ff9800',
  '#FF3D68',
  '#00C1D4',
  '#71EFA3',
  '#171010',
  '#78DEC7',
  '#1768AC',
  '#FB9300',
  '#FC5404'
]

const animates = [
  { value: 'zoom-fade', label: '渐变' },
  { value: 'zoom-out', label: '闪现' },
  { value: 'fade-slide', label: '滑动' },
  { value: 'fade', label: '消退' },
  { value: 'fade-bottom', label: '底部消退' },
  { value: 'fade-scale', label: '缩放消退' }
]

watch(
  () => settingStore.darkTheme,
  (to) => {
    if (isDrawer.value) {
      settingStore.setNavTheme(to ? 'light' : 'dark')
    }
  }
)

function openDrawer() {
  isDrawer.value = true
}

function closeDrawer() {
  isDrawer.value = false
}

function togNavTheme(theme) {
  settingStore.setNavTheme(theme)
}

function togTheme(color) {
  settingStore.setAppTheme(color)
}

defineExpose({ openDrawer, closeDrawer })
</script>

<style lang="less" scoped>
.drawer {
  .n-divider:not(.n-divider--vertical) {
    margin: 10px 0;
  }

  &-setting-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    flex-wrap: wrap;

    &-style {
      display: inline-block;
      position: relative;
      margin-right: 16px;
      cursor: pointer;
      text-align: center;
    }

    &-title {
      flex: 1 1;
      font-size: 14px;
    }

    &-action {
      flex: 0 0 auto;
    }

    &-select {
      flex: 1;
    }

    .theme-item {
      width: 20px;
      min-width: 20px;
      height: 20px;
      cursor: pointer;
      border: 1px solid #eee;
      border-radius: 2px;
      margin: 0 5px 5px 0;
      text-align: center;
      line-height: 14px;

      .n-icon {
        color: #fff;
      }
    }
  }

  .align-items-top {
    align-items: flex-start;
    padding: 2px 0;
  }

  .justify-center {
    justify-content: center;
  }

  .dark-switch .n-switch {
    ::v-deep(.n-switch__rail) {
      background-color: #000e1c;
    }
  }
}
</style>
