<template>
  <div class="tabs">
    <el-button :type="tabType('actual')" class="actual" @click="changeTab('actual')">
      实时报警
    </el-button>
    <el-button :type="tabType('history')" class="history" @click="changeTab('history')">
      历史报警
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { ref } from 'vue'
import type { AlertType } from '../types'

const emits = defineEmits<{
  (e: 'changeTab', tab: AlertType): void
}>()

const activeTab = ref<AlertType>('actual')
const tabType = (type: AlertType) => {
  return activeTab.value === type ? 'primary' : 'default'
}
const changeTab = (type: AlertType) => {
  activeTab.value = type
  emits('changeTab', type)
}
</script>

<style lang="less" scoped>
@width: 100px;
.tabs {
  position: absolute;
  left: -@width;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .el-button {
    width: @width;
    margin: 0;
  }

  .actual {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  .history {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
