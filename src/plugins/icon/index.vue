<template>
  <div class="icon" v-bind="$attrs">
    <component :is="`icon-${name}`" :theme="theme" :size="size" :fill="iconColor" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useDesignSettingWithOut } from '@/store/modules/designSetting'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

const designStore = useDesignSettingWithOut()
const projectStore = useProjectSettingStoreWithOut()

const props = withDefaults(
  defineProps<{
    name: string
    size?: string
    color?: string
    theme?: string
  }>(),
  {
    size: '18',
    color: '',
    theme: 'outline'
  }
)

const iconColor = computed<string>(() => {
  if (props.color) {
    return props.color
  }
  return designStore.getDarkTheme ? '#eee' : '#333'
})
</script>

<style lang="less" scoped>
.icon {
  @apply h-full inline-flex justify-center items-center;
}
</style>
