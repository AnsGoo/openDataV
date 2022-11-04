<template>
  <Icon class="icon" v-bind="$attrs" tag="span" :size="size" :color="iconColor">
    <component :is="`x-icon-${name}`" />
  </Icon>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Icon } from '@vicons/utils'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

const projectStore = useProjectSettingStoreWithOut()

const props = withDefaults(
  defineProps<{
    name: string
    size?: string
    color?: string
  }>(),
  {
    size: '18',
    color: ''
  }
)

const iconColor = computed<string>(() => (props.color ? props.color : projectStore.iconColor))
</script>

<style lang="less" scoped>
.icon {
  @apply h-full inline-flex justify-center items-center;
}
</style>
