<template>
  <n-layout-sider
    class="right"
    :width="180"
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

<script lang="ts" setup name="DocContent">
import { NLayoutSider, NLayoutContent, NScrollbar } from 'naive-ui'
import ConfigProvider from '@/components/provider/ConfigProvider.vue'
import RenderMD from '../RenderMD.vue'
import SiderContent from '../modules/components/SiderContent'
import { getMenus } from './menus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import docsRouters from '@/router/modules/docs'
import type { MenuItem } from '../modules/components/SiderContent/type'
import type { AppRouteRecordRaw } from '@/router/types'
const route = useRoute()
const componentMenus = computed<Array<MenuItem>>(() => {
  const matcheds = route.matched
  const name = matcheds[1].name
  const routers = docsRouters[0].children.filter((el) => el.name === name)
  if (routers.length > 0 && routers[0].children && routers[0].children.length > 0) {
    return getMenus(routers[0].children as Array<AppRouteRecordRaw>)
  } else {
    return []
  }
})
</script>
