<template>
  <Swiper
    ref="swiperEl"
    class="swiper"
    :class="{ noEvent: basicStore.isEditMode }"
    :slides-per-view="swiperList.length"
    :normalizeSlideIndex="false"
    :space-between="propValue.spaceBetween"
    :centerInsufficientSlides="true"
    :grab-cursor="true"
    @click="onSlideClick"
  >
    <template v-for="(item, index) in swiperList" :key="index">
      <SwiperSlide :class="{ swiperSlideSelected: activeIndex === index }">
        <span :class="{ center: propValue.textAlgin === 'center' }">{{ item.label }}</span>
      </SwiperSlide>
    </template>
  </Swiper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { ComponentInfo } from '@/types/component'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'

import type { SwiperNavigation, SwiperItem } from './type'
import type { Swiper as SwiperType } from 'swiper/types'

const props = defineProps<{
  propValue: SwiperNavigation
  element: ComponentInfo
}>()

const router = useRouter()

const basicStore = useBasicStoreWithOut()
const activeIndex = ref<number>(0)

const initActiveSlide = (): void => {
  props.propValue.swiperList.forEach((item, index) => {
    if (item.link === router.currentRoute.value.path) {
      activeIndex.value = index
    }
  })
}

// 根据路由计算当前应该激活的导航栏
initActiveSlide()

const onSlideClick = (swiper: SwiperType) => {
  props.propValue.swiperList[swiper.clickedIndex].link &&
    router.push(props.propValue.swiperList[swiper.clickedIndex].link)
  return
}

const swiperList = computed<SwiperItem[]>(() => {
  return props.propValue.swiperList
})
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  height: 100%;

  .swiper-slide {
    display: flex;
    flex-direction: column;
    border-radius: 10%;
    overflow: hidden;

    span {
      z-index: 100;
      text-align: center;
    }
  }
}

.center {
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.swiperSlideSelected {
  z-index: 99;
  .img-box {
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      animation: active-img 0.5s infinite linear alternate;
    }
  }
}

@keyframes active-img {
  0% {
    box-shadow: 0 0 3px 2px rgb(0, 162, 255, 0.1) inset;
  }

  100% {
    box-shadow: 0 0 7px 5px rgb(0, 162, 255, 0.1) inset;
  }
}
</style>
