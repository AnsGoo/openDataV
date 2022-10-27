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
import { getMenus } from './menus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import docsRouters from '@/router/modules/docs'
import type { MenuItem } from '../modules/components/SiderContent/type'
const route = useRoute()
const componentMenus = computed<Array<MenuItem>>(() => {
  console.log(route.matched)
  const matecheds = route.matched
  const name = matecheds[matecheds.length - 2].name
  const routers = docsRouters[0].children.filter((el) => el.name === name)
  return getMenus(routers)
})
</script>
