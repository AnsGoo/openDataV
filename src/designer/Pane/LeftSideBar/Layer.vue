<template>
  <div style="height: calc(100vh - 100px)">
    <n-scrollbar v-if="componentData.length > 0">
      <n-menu :options="menuOptions" @update:value="handleSelect" />
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
import { computed, ref, h, watch } from 'vue'
import type { ComponentInfo } from '@/types/component'
import { NScrollbar, NDescriptions, NEmpty, NDescriptionsItem, NMenu } from 'naive-ui'
import { useEventBus } from '@/bus/useEventBus'
import RenderIcon from './RenderIcon.vue'
import LayerItem from './LayerItem.vue'
import type { MentionOption } from 'naive-ui'
import { ComponentGroupList } from '@/enum'

withDefaults(
  defineProps<{
    mode?: string
  }>(),
  {
    mode: 'expand'
  }
)

const basicStore = useBasicStoreWithOut()

const iconMap: Recordable<string> = {}
ComponentGroupList.map((ele) => {
  iconMap[ele.key] = ele.icon
})

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

const menuOptions = ref<MentionOption[]>([])

const getMenuOptions = (
  fatherIndex: string,
  compoments: ComponentInfo[],
  options: MentionOption[]
): MentionOption[] => {
  for (let i = 0; i < compoments.length; i++) {
    const item = compoments[i]

    if (item.component === 'Group') {
      const childrenOptions: MentionOption[] = []
      options.push({
        label: () =>
          h(LayerItem, {
            component: item,
            index: calcIndex(i, fatherIndex)
          }),
        key: calcIndex(i, fatherIndex),
        icon: () =>
          h(RenderIcon, {
            name: 'icon-branch-one'
          }),
        children: getMenuOptions(
          calcIndex(i, fatherIndex),
          item.subComponents || [],
          childrenOptions
        )
      })
    } else {
      options.push({
        label: () =>
          h(LayerItem, {
            component: item,
            index: calcIndex(i, fatherIndex)
          }),
        key: calcIndex(i, fatherIndex),
        icon: () =>
          h(RenderIcon, {
            name: `icon${iconMap[item.group!]}`
          })
      })
    }
  }
  return options
}
const calcIndex = (index: number, fatherIndex: string) => {
  if (fatherIndex !== '0') {
    return `${fatherIndex}-${index}`
  } else {
    return index.toString()
  }
}
watch(
  () => basicStore.componentData,
  () => {
    const compoments = basicStore.componentData
    menuOptions.value = []
    menuOptions.value = getMenuOptions('0', compoments, menuOptions.value)
    console.log(menuOptions.value)
  },
  {
    deep: true,
    immediate: true
  }
)
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
