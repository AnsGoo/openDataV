<template>
  <n-modal
    class="show-card"
    :show="isShow"
    preset="card"
    @mask-click="close"
    :title="`图标数量${iconList.length}`"
    @close="close"
    @update:show="() => (isShow = false)"
    :style="{ width: '50%', maxWidth: '800px' }"
  >
    <ul class="icon-list">
      <li v-for="icon in iconList" :key="icon" class="dib" @click="handleClick(icon)">
        <span :class="`icon iconfont ${icon}`"></span>
      </li>
    </ul>
  </n-modal>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { copyText } from '@/utils/utils'
import { message } from '@/utils/message'
import { NModal } from 'naive-ui'

import iconfontList from '@/assets/directionFonts/iconfont.json'

const iconList = computed<string[]>(() => {
  return iconfontList.glyphs.map((item) => `icon-${item.font_class}`)
})

const isShow = ref<boolean>(true)
const close = () => {
  isShow.value = false
}
const handleClick = (icon: string) => {
  copyText(icon)
  message.success(`复制图标: ${icon}`)
}
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
