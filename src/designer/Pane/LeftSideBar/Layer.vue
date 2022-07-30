<template>
  <div style="height: calc(100vh - 100px)">
    <n-scrollbar v-if="componentData.length > 0">
      <el-menu
        :unique-opened="true"
        :collapse-transition="false"
        @select="handleSelect"
        @open="handleSelect"
        mode="vertical"
        ref="menu"
      >
        <LayerItem
          :components="componentData"
          @select="handleSelect"
          activeKey="activeKey"
          :mode="mode"
        />
      </el-menu>
    </n-scrollbar>
    <n-descriptions v-else class="placeholder">
      <n-descriptions-item v-show="mode === 'expand'">
        <n-empty description="画布为空" />
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { computed, ref } from 'vue'
import LayerItem from './LayerItem.vue'
import type { ComponentInfo } from '@/types/component'
import { ElMenu } from 'element-plus'
import { NScrollbar, NDescriptions, NEmpty, NDescriptionsItem } from 'naive-ui'
import { useEventBus } from '@/bus/useEventBus'

withDefaults(
  defineProps<{
    mode?: string
  }>(),
  {
    mode: 'expand'
  }
)

const basicStore = useBasicStoreWithOut()

const componentData = computed(() => basicStore.componentData)

const menu = ref<ElRef<any>>(null)
const activeKey = ref<string>('')
const open = (event: any) => {
  const index = event as string
  activeKey.value = index
  if (menu.value && menu.value.open) {
    menu.value.open(index)
  }
}
useEventBus('ActiveMenu', open)

const handleSelect = (key: string) => {
  activeKey.value = key
  const indexs: number[] = key.split('-').map((i) => Number(i))
  const activedComponent: ComponentInfo = basicStore.getComponentByIndex(indexs)
  basicStore.setActiveComponent(activedComponent)
}
</script>

<style lang="less" scoped>
:deep(.el-sub-menu__title) {
  height: 36px;
  line-height: 36px;
}
:deep(.el-sub-menu .el-menu-item) {
  height: 30px;
  line-height: 30px;
}
:deep(.el-menu-item) {
  height: 30px;
  line-height: 30px;
}
ul {
  flex: 1;
  /* width: 50px; */
  background-color: #f5f7fa;
}
li {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
}
</style>
