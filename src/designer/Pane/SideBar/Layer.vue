<template>
  <div style="height: calc(100vh - 100px)">
    <el-scrollbar>
      <el-menu
        :unique-opened="true"
        :collapse-transition="false"
        @select="handleSelect"
        @open="handleSelect"
        ref="menu"
      >
        <LayerItem :components="componentData" @select="handleSelect" activeKey="activeKey" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { computed, ref } from 'vue'
import LayerItem from './LayerItem.vue'
import type { ComponentInfo } from '@/types/component'
import { ElScrollbar, ElMenu } from 'element-plus'
import { useEventBus } from '@/bus/useEventBus'

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
  const indexs = key.split('-').map((i) => Number(i))
  let rootComponent: ComponentInfo = {
    subComponents: componentData.value,
    component: '',
    style: {}
  }
  indexs.forEach((el: number) => {
    rootComponent = rootComponent.subComponents ? rootComponent.subComponents[el] : rootComponent
  })
  basicStore.setActiveComponent(rootComponent)
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
  text-shadow: 0 5px 5px #aaa;
}
li {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
}
</style>
