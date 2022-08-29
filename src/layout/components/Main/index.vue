<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition :name="getTransitionName" mode="out-in" appear>
        <keep-alive v-if="route.meta?.keepAlive">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
</template>

<script lang="ts" setup>
import { computed, unref } from 'vue'
import { useProjectSettingStoreWithOut } from '@/store/modules/projectSetting'

withDefaults(
  defineProps<{
    notNeedKey?: boolean
    animate?: boolean
  }>(),
  {
    notNeedKey: false,
    animate: true
  }
)

const { isPageAnimate, pageAnimateType } = useProjectSettingStoreWithOut()

const getTransitionName = computed(() => {
  return unref(isPageAnimate) ? unref(pageAnimateType) : ''
})
</script>

<style lang="less" scoped></style>
