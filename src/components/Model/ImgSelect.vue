<template>
  <div class="imgSelect">
    <div class="imgSelectInput">
      <div class="imgInput" @click="hiddenList()">
        <div :class="imgSrc"></div>
      </div>
      <div class="imgArrow" @click="showList()">
        <div class="icon iconfont icon-jiantouxia"></div>
      </div>
    </div>
    <div :class="['imgSelectList', className]">
      <div
        class="imgSelectListItem"
        v-for="(item, index) in listItem"
        :key="index"
        @click="selectImg(index)"
      >
        <div class="itemList" :class="item.label"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const props = withDefaults(
  defineProps<{
    value?: string
    listItem: Array<{ value: string; label: string }> | undefined
  }>(),
  {
    value: '',
    listItems: []
  }
)

const emits = defineEmits<{
  (e: 'update:value', color: string): void
  (e: 'change', color: string): void
}>()
const className = ref<string>('hidden')

let imgSrc = ref<string>(props.value)
function showList() {
  className.value = 'show'
}
function hiddenList() {
  className.value = 'hidden'
}
function selectImg(params) {
  imgSrc.value = props.listItem![params].label
  emits('update:value', imgSrc.value)
  emits('change', imgSrc.value)
  className.value = 'hidden'
}
</script>
<style lang="less" scoped>
.imgSelect {
  position: relative;
  text-align: center;
  .hidden {
    display: none;
  }
  .show {
    display: inline-block;
  }
  .imgSelectInput {
    height: 30px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(229, 231, 235, var(--tw-border-opacity));
    border-radius: 5px;
    position: relative;
    .imgArrow {
      position: absolute;
      right: 5px;
      top: 0;
    }
  }
  .imgSelectInput:hover {
    border-color: #c7c4c4;
  }
  .imgSelectList {
    position: absolute;
    top: 35px;
    left: 0;
    z-index: 1999;
    background-color: #fff;
    min-width: 152px;
    border: 1px solid;
    max-height: 125px;
    overflow-y: scroll;
    border-color: rgba(229, 231, 235, var(--tw-border-opacity));
    margin-bottom: 20px;
    .imgSelectListItem {
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
