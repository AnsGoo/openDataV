<template>
  <ConfigProvider>
    <n-card
      class="show-card"
      :title="`图标数量${iconList.length}`"
      style="width: 50%; maxwidth: 800px"
    >
      <ul class="icon-list">
        <li v-for="icon in iconList" :key="icon" class="dib">
          <span :class="`icon iconfont ${icon}`"></span>
        </li>
      </ul>
    </n-card>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { NCard } from 'naive-ui'
import ConfigProvider from '@/components/provider/ConfigProvider.vue'
import iconfontList from '@/assets/directionFonts/iconfont.json'

const iconList = computed<string[]>(() => {
  return iconfontList.glyphs.map((item) => `icon-${item.font_class}`)
})
</script>

<style lang="less" scoped>
:deep(.show-card) {
  width: 50%;
}
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
