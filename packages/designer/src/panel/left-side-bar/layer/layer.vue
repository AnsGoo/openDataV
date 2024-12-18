<template>
  <o-menu
    v-if="componentData.length > 0"
    class="h-full o-scroll overflow-auto"
    :options="menuOptions"
    :root-indent="1"
    :indent="12"
    :collapsed="!iscollapsed"
  />
  <LayerEmpty v-else />
</template>

<script lang="ts" setup>
import type { CustomComponent } from '@open-data-v/base'
import type { MenuOption } from '@open-data-v/ui'
import { OMenu } from '@open-data-v/ui'
import { computed, h, ref, watch } from 'vue'

import { useEmpty } from '../../../modules'
import { useCanvasState } from '../../../state'
import ComponentLayer from '../../components/component-layer.vue'
import LayerItem from './layer-item.vue'
import SimpleLayerItem from './simple-layer-item.vue'

const canvasState = useCanvasState()

const LayerEmpty = useEmpty()
withDefaults(
  defineProps<{
    iscollapsed?: boolean
  }>(),
  {
    iscollapsed: true
  }
)

const componentData = computed(() => canvasState.componentData)
const menuOptions = ref<MenuOption[]>([])

const getMenuOptions = (
  fatherIndex: string,
  components: CustomComponent[],
  options: MenuOption[]
): MenuOption[] => {
  for (let i = 0; i < components.length; i++) {
    const item = components[i]
    const currentIndex = calcIndex(i, fatherIndex)
    if (item.subComponents) {
      const childrenOptions: MenuOption[] = []
      options.push({
        label: () =>
          h(
            ComponentLayer,
            {
              component: item,
              level: currentIndex
            },
            () =>
              h(LayerItem, {
                component: item,
                level: currentIndex
              })
          ),
        key: currentIndex,
        icon: () =>
          h(
            ComponentLayer,
            {
              component: item,
              level: currentIndex
            },
            () =>
              h(SimpleLayerItem, {
                icon: 'container',
                component: item,
                level: currentIndex
              })
          ),
        children: getMenuOptions(currentIndex, item.subComponents || [], childrenOptions)
      })
    } else {
      options.push({
        label: () =>
          h(
            ComponentLayer,
            {
              component: item,
              level: currentIndex
            },
            () =>
              h(LayerItem, {
                component: item,
                level: currentIndex
              })
          ),
        key: currentIndex,
        icon: () => {
          const { icon } = item.getExtendedMetaData() || {}
          return h(
            ComponentLayer,
            {
              component: item,
              level: currentIndex
            },
            () =>
              h(SimpleLayerItem, {
                icon: icon,
                component: item,
                level: currentIndex
              })
          )
        }
      })
    }
  }
  return options
}
const calcIndex = (index: number, fatherIndex: string) => {
  if (fatherIndex) {
    return `${fatherIndex}-${index}`
  } else {
    return index.toString()
  }
}

watch(
  () => canvasState.componentData,
  () => {
    const components = canvasState.componentData
    menuOptions.value = []
    // @ts-ignore
    menuOptions.value = getMenuOptions('', components, [])
  },
  {
    deep: true,
    immediate: true
  }
)
</script>
<style lang="less" scoped>
@import '../../../css/index.less';
</style>
