<template>
  <div>
    <n-modal :show="visible">
      <n-card
        :title="`图标数量${iconList.length}`"
        class="tab-container"
        v-click-outside="clickOutsideHandler"
      >
        <ul class="icon_lists">
          <li v-for="icon in iconList" :key="icon" class="dib" @click="handleClick(icon)">
            <span :class="`icon iconfont ${icon}`"></span>
          </li>
        </ul>
      </n-card>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { copyText } from '@/utils/utils'
import { message } from '@/utils/message'
import { NModal, NCard } from 'naive-ui'

import iconfontList from '@/assets/directionFonts/iconfont.json'

const iconList = computed<string[]>(() => {
  return iconfontList.glyphs.map((item) => `icon-${item.font_class}`)
})

defineProps<{
  visible: boolean
}>()

const emits = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

const clickOutsideHandler = () => {
  emits('update:visible', false)
}
const handleClick = (icon: string) => {
  copyText(icon)
  message.success(`复制图标: ${icon}`)
}
</script>

<style lang="less" scoped>
.tab-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 800px;
  z-index: 1000;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  padding: 20px;

  .total {
    text-align: center;
  }
}

.icon_lists {
  width: 100% !important;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}

.icon_lists li {
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
