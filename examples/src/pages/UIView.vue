<template>
  <n-layout class="home">
    <n-layout-header class="h-14">
      <ToolBar class="w-full h-14" />
    </n-layout-header>
    <!-- 左侧组件列表 -->
    <n-layout class="main">
      <n-tabs type="card" placement="left">
        <n-tab-pane name="oasis" tab="分割线">
          <NCard title="分割线" class="m-5">
            <div class="flex flex-row w-full">
              <NCard title="基础" class="m-5 w-1/4">
                <ODivider class="m-2" />
              </NCard>
              <NCard title="左右" class="m-5 w-1/4">
                <ODivider title-placement="left" class="m-2">left</ODivider>
                <ODivider title-placement="right" class="m-2">right</ODivider>
              </NCard>
              <NCard title="插槽" class="m-5 w-1/4">
                <ODivider title-placement="center" class="m-2"
                  ><XIcon :size="24" name="api"
                /></ODivider>
              </NCard>
              <NCard title="垂直" class="m-5 w-1/4">
                <div>故地重游<ODivider :vertical="true" />一周年</div>
              </NCard>
            </div>
          </NCard>
        </n-tab-pane>
        <n-tab-pane name="card" tab="卡片">
          <NCard title="卡片" class="m-5">
            <div class="flex flex-row w-full">
              <NCard title="基础" class="m-5 w-1/2">
                <OCard title="我是标题">
                  <div>我是卡片内容</div>
                  <div class="w-full"><OColorPane v-model:value="colors" /></div
                ></OCard>
              </NCard>
              <NCard title="标题自定义" class="m-5 w-1/2">
                <OCard>
                  <template #header>
                    <XIcon :size="24" name="api" />
                    <div class="inline-block">我是头部</div> </template
                  >我是卡片内容
                </OCard>
              </NCard>
              <NCard title="内容自定义" class="m-5 w-1/2">
                <OCard title="我的内容特别好看">
                  <template #header>
                    <XIcon :size="24" name="api" />
                    <div class="inline-block">我是头部，我可以自定义</div>
                  </template>
                  <div>
                    <img
                      src="https://s2.loli.net/2022/10/31/QJhdabXU5fOsBzj.png"
                      class="thumbnail-image"
                      alt=""
                    />
                  </div>
                </OCard>
              </NCard>
              <NCard title="基础1" class="m-5 w-1/2">
                <OCard title="我是标题">
                  <div>我是卡片内容</div>
                  <div class="w-full"><OColorPicker v-model:value="color" /></div
                ></OCard>
              </NCard>
            </div>
          </NCard>
        </n-tab-pane>
        <n-tab-pane name="radio" tab="单选框">
          <NCard title="卡片" class="m-5">
            <div class="flex flex-row w-full">
              <NCard title="基础" class="m-5 w-1/2">
                <ORadio value="M" label="男" :model-value="radioGroupValue" />
                <ORadio :model-value="radioGroupValue" value="F" label="女" />
              </NCard>
              <NCard title="标题自定义" class="m-5 w-1/2">
                <ORadioGroup
                  v-model:value="radioGroupValue"
                  :options="[
                    {
                      value: 'M',
                      label: '男'
                    },
                    {
                      value: 'F',
                      label: '女'
                    }
                  ]"
                />
              </NCard>
              <NCard title="内容自定义" class="m-5 w-1/2">
                <OInput v-model:value="inputValue" type="password">选择颜色</OInput>
              </NCard>
            </div>
          </NCard>
        </n-tab-pane>
        <n-tab-pane name="icon" tab="图标">
          <div class="flex flex-row">
            <n-card title="内置" class="m-2 w-1/2">
              <div class="flex flex-row flex-wrap w-full h-full">
                <div v-for="item in iconMap" :key="item" class="m-2" @click="handleClick(item)">
                  <XIcon :name="item" class="hover:scale-150" />
                </div>
              </div>
            </n-card>
            <n-card title="IconFont" class="m-2 w-1/2">
              <ul class="icon-list">
                <li v-for="icon in iconList" :key="icon" class="dib" @click="handleClick(icon)">
                  <span :class="`icon iconfont ${icon}`"></span>
                </li>
              </ul>
            </n-card>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { iconMap } from '@open-data-v/designer'
import {
  OCard,
  OColorPane,
  OColorPicker,
  ODivider,
  OInput,
  ORadio,
  ORadioGroup
} from '@open-data-v/ui'
import { NCard, NLayout, NLayoutHeader, NTabPane, NTabs } from 'naive-ui'
import { computed, getCurrentInstance, ref } from 'vue'

import iconfontList from '@/assets/directionFonts/iconfont.json'
import ToolBar from '@/pages/ApiView/ToolBar'
import { message } from '@/utils/message'
import { copyText } from '@/utils/utils'

const iconList = computed<string[]>(() => {
  return iconfontList.glyphs.map((item) => `icon-${item.font_class}`)
})
const handleClick = (icon: string) => {
  copyText(icon)
  message.success(`复制图标: ${icon}`)
}
const colors = ref({
  hsl: { h: 150, s: 0.5098039215686275, l: 0.19999999999999998, a: 0.6588235294117647 },
  hex: '#194D33',
  hex8: '#194D33A8',
  rgba: { r: 25, g: 77, b: 51, a: 0.6588235294117647 },
  hsv: { h: 150, s: 0, v: 0, a: 0.6588235294117647 },
  oldHue: 150,
  a: 0.6588235294117647
})

const color = ref<string>('#194D33A8')
const instance = getCurrentInstance()
const XIcon = instance!.appContext.components['XIcon']
const radioGroupValue = ref<string>('M')

const inputValue = ref<string>('12312312')
</script>
<style scoped>
.icon-list {
  width: 100% !important;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}

.icon-list li {
  width: 50px;
  text-align: center;
  list-style: none !important;
  cursor: default;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.5);
  }

  &:active {
    transform: scale(1);
  }
}
.icon {
  display: block;
  height: 50px;
  line-height: 50px;
  font-size: 22px;
  margin: 10px auto;
  -webkit-transition: font-size 0.25s linear, width 0.25s linear;
  -moz-transition: font-size 0.25s linear, width 0.25s linear;
  transition: font-size 0.25s linear, width 0.25s linear;
}
</style>
