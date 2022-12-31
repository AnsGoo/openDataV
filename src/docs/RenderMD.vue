<template>
  <n-card>
    <slot></slot>
  </n-card>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { NCard } from 'naive-ui'
import '@/css/markdown.css'

import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'
const projectStore = useProjectSettingStoreWithOut()

const backgroundColor = computed<string>(() => {
  return projectStore.darkTheme ? '#101014' : '#ffffff'
})
const textColor = computed<string>(() => {
  return projectStore.darkTheme ? '#ffffffd1' : '#333639'
})
</script>
<style lang="less" scoped>
:deep(.markdown-body) {
  // max-width: max(80%, 70vw);
  margin-right: 200px;
  border-right: 1px solid;
  .toc-box {
    position: fixed;
    right: 0px;
    width: max(15%, 200px);
    min-width: 200px;
    li {
      list-style: none;
    }
  }
  body {
    scroll-behavior: smooth;
  }
  ul {
    li {
      list-style-type: disc;
    }
  }
  ol {
    li {
      list-style: decimal;
    }
  }
  padding: 10px 30px;
  background-color: v-bind(backgroundColor) !important;
  img {
    display: block;
    margin: 0 auto;
    background-color: v-bind(backgroundColor);
  }
  table {
    tr {
      background-color: v-bind(backgroundColor) !important;
      color: v-bind(textColor);
    }
  }
  * {
    color: v-bind(textColor);
  }
  code {
    color: #ffffffd1;
  }
}
</style>
