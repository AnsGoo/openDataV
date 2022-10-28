<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition :name="getTransitionName" mode="out-in" appear>
        <keep-alive v-if="route.meta?.keepAlive">
          <div>
            <component :is="Component" :key="route.fullPath" />
          </div>
        </keep-alive>
        <component :is="Component" v-else :key="route.fullPath" />
      </transition>
    </template>
  </router-view>
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
