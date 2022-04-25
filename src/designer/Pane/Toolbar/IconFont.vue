<template>
  <div>
    <teleport to="body">
      <div v-show="visible" class="tab-container" v-click-outside="clickOutsideHandler">
        <div class="total">图标数量：{{ iconList.length }}</div>
        <ul class="icon_lists">
          <li v-for="icon in iconList" :key="icon" class="dib" @click="handleClick(icon)">
            <span :class="`icon iconfont ${icon}`"></span>
          </li>
        </ul>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { copyText } from '@/utils/utils'
import { successMessage } from '@/utils/message'

import icons from '@/enum/icon'

const iconList = reactive<string[]>(icons)

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
  successMessage(`复制图标: ${icon}`)
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
  background-color: aliceblue;
  border-radius: 20px;
  padding: 20px;

  .total {
    text-align: center;
  }
}

.icon_lists {
  width: 100% !important;
  overflow: hidden;
  *zoom: 1;
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

.icon_lists .icon {
  display: block;
  height: 50px;
  line-height: 50px;
  font-size: 22px;
  margin: 10px auto;
  color: #333;
  -webkit-transition: font-size 0.25s linear, width 0.25s linear;
  -moz-transition: font-size 0.25s linear, width 0.25s linear;
  transition: font-size 0.25s linear, width 0.25s linear;
}
</style>
