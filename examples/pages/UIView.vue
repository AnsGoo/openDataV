<template>
  <n-layout class="home">
    <n-layout-header class="h-16">
      <ToolBar />
    </n-layout-header>
    <!-- 左侧组件列表 -->
    <n-layout class="main">
      <n-tabs type="card" placement="left">
        <n-tab-pane name="oasis" tab="分割线">
          <NCard title="分割线" class="m-5">
            <div class="flex flex-row w-full">
              <NCard title="基础" class="m-5 w-1/4">
                <Diveider class="m-2" />
              </NCard>
              <NCard title="左右" class="m-5 w-1/4">
                <Diveider title-placement="left" class="m-2">left</Diveider>
                <Diveider title-placement="right" class="m-2">right</Diveider>
              </NCard>
              <NCard title="插槽" class="m-5 w-1/4">
                <Diveider title-placement="center" class="m-2"
                  ><XIcon :size="24" name="api"
                /></Diveider>
              </NCard>
              <NCard title="垂直" class="m-5 w-1/4">
                <div>故地重游<Diveider :vertical="true" />一周年</div>
              </NCard>
            </div>
          </NCard>
        </n-tab-pane>
        <n-tab-pane name="card" tab="卡片">
          <NCard title="卡片" class="m-5">
            <div class="flex flex-row w-full">
              <NCard title="基础" class="m-5 w-1/2">
                <Card title="我是标题"> 我是卡片内容 </Card>
              </NCard>
              <NCard title="标题自定义" class="m-5 w-1/2">
                <Card>
                  <template #header>
                    <XIcon :size="24" name="api" />
                    <div class="inline-block">我是头部</div> </template
                  >我是卡片内容
                </Card>
              </NCard>
              <NCard title="内容自定义" class="m-5 w-1/2">
                <Card title="我的内容特别好看">
                  <div>
                    <img
                      src="https://s2.loli.net/2022/10/31/QJhdabXU5fOsBzj.png"
                      class="thumbnail-image"
                      alt=""
                    />
                  </div>
                </Card>
              </NCard>
            </div>
          </NCard>
        </n-tab-pane>
      </n-tabs>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { NCard, NLayout, NLayoutHeader, NTabPane, NTabs } from 'naive-ui'
import Card from 'open-data-v/ui/Card'
import Diveider from 'open-data-v/ui/Divider'
import { getCurrentInstance } from 'vue'

import ToolBar from '@/pages/ApiView/ToolBar'

const instance = getCurrentInstance()
const XIcon = instance!.appContext.components['XIcon']
</script>
