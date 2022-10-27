<template>
  <n-layout-sider
    class="right"
    :width="240"
    :native-scrollbar="false"
    bordered
    collapse-mode="width"
  >
    <SiderContent :menus="componentMenus" />
  </n-layout-sider>
  <n-layout-content class="content">
    <n-scrollbar x-scrollable>
      <RenderMD>
        <ConfigProvider>
          <RouterView />
        </ConfigProvider>
      </RenderMD>
    </n-scrollbar>
  </n-layout-content>
</template>

<script lang="ts" setup>
import { NLayoutSider, NLayoutContent, NScrollbar } from 'naive-ui'
import ConfigProvider from '@/components/provider/ConfigProvider.vue'
import RenderMD from '../RenderMD.vue'
import SiderContent from '../modules/components/SiderContent'
import { getComponentMenus } from './menus'
const componentMenus = getComponentMenus()
</script>
