<template>
  <div ref="cardEl">
    <Swiper
      ref="swiperEl"
      class="swiper"
      :class="{ noEvent: basicStore.isEditMode }"
      :slides-per-view="propValue.slidesPerView"
      :normalizeSlideIndex="false"
      :space-between="propValue.spaceBetween"
      :centerInsufficientSlides="true"
      :grab-cursor="true"
      @click="onSlideClick"
    >
      <template v-for="(item, index) in swiperList" :key="index">
        <SwiperSlide :class="{ swiperSlideSelected: activeIndex === index }">
          <span :class="{ center: propValue.textAlgin === 'center' }">{{ item.label }}</span>
          <div class="img-box">
            <img
              :src="item.img"
              :title="item.label"
              :width="widthSlide / propValue.slidesPerView"
            />
          </div>
        </SwiperSlide>
      </template>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useResizeObserver } from '@vueuse/core'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import type { ComponentInfo } from '@/types/component'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { PropValueType, SwiperItem } from './config'
import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps<{
  propValue: PropValueType
  element: ComponentInfo
}>()

const router = useRouter()

const basicStore = useBasicStoreWithOut()
const cardEl = ref<ElRef>(null)
const widthSlide = ref<number>(0)
const activeIndex = ref<number>(0)

useResizeObserver(cardEl, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  widthSlide.value = width
})

const initActiveSlide = (): void => {
  props.propValue.swiperList.forEach((item, index) => {
    if (item.link === router.currentRoute.value.path) {
      activeIndex.value = index
    }
  })
}

// 根据路由计算当前应该激活的导航栏
initActiveSlide()

const onSlideClick = (swiper: any) => {
  if (swiper.clickedIndex === activeIndex.value) {
    props.propValue.swiperList[swiper.clickedIndex].link &&
      router.push(props.propValue.swiperList[swiper.clickedIndex].link)
    return
  }
  activeIndex.value = swiper.clickedIndex
}

const swiperList = computed<SwiperItem[]>(() => {
  return props.propValue.swiperList.map((item) => {
    if (!item.img.endsWith('png')) {
      return { ...item, img: '' }
    } else {
      return item
    }
  })
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

    .img-box {
      img {
        object-fit: fill;
      }
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
      content: '';
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
