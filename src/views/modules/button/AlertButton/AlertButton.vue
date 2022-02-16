<template>
  <div>
    <el-dropdown @command="handleLinkMore">
      <el-badge :value="newAlertMsg">
        <span :class="`iconfont ${propValue.icon}`"></span>
      </el-badge>
      <template #dropdown>
        <el-dropdown-menu :style="{ background: propValue.background }">
          <el-dropdown-item v-for="(item, index) in alertList" :key="index">
            <div class="alert-info">
              <span class="iconfont icon-jinggao1"></span>
              <p>{{ item.AlarmDescription }}</p>
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="linkMore">
            <hr />
            <span class="link-more">查看更多>></span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { ComponentInfo } from '@/types/component'
import { useEventBus } from '@/bus/useEventBus'
import { useWsDataStoreWithOut } from '@/store/modules/wsdata'
import type { WSAlertDataType } from '@/types/wsTypes'
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElBadge } from 'element-plus'

defineProps<{
  element: ComponentInfo
  propValue: { icon: string; background: string }
}>()

const router = useRouter()
const wsdataStore = useWsDataStoreWithOut()

const alertList = computed<WSAlertDataType[]>(() => wsdataStore.alertList)

// const alertList = ref([
//   {
//     AlarmDescription: '压力超限'
//   },
//   {
//     AlarmDescription: '温度超限'
//   },
//   {
//     AlarmDescription: '湿度超限'
//   },
//   {
//     AlarmDescription: '电压异常，可能引发故障，请及时处理， 如果不处理，可能导致系统故障'
//   }
// ])

const newAlertMsg = ref<number>(alertList.value.length)

const alertHandler = () => {
  newAlertMsg.value =
    newAlertMsg.value === alertList.value.length ? alertList.value.length : newAlertMsg.value + 1
}

useEventBus('alert', alertHandler)

const handleLinkMore = () => {
  router.push({
    name: 'Alert'
  })
}
</script>

<style lang="less" scoped>
.alert-info {
  display: flex;

  span {
    margin-right: 10px;
    color: #f56c6c;
  }

  p {
    color: rgba(93, 169, 255);
  }
}

.link-more {
  display: inline-block;
  width: 100%;
  text-align: center;
}

.el-badge {
  span {
    color: aliceblue;
    font-size: 20px;
  }
}

.el-dropdown-menu {
  max-width: 350px;
}
</style>
