<template>
  <!-- 如果在编辑器模式下，button 按钮不响应点击时间，在父元素中进行拦截 -->
  <div ref="mainEl" class="coal">
    <div :style="mainStyle" class="content">
      <img class="l" :src="l" :style="lStyle" />
      <img class="r" :src="r" :style="rStyle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { TagType } from '@/types/wsTypes'
import type { ComponentInfo } from '@/types/component'
import { http } from '@/utils/http'
import L from '@/assets/L.png'
import R from '@/assets/R.png'
import LS from '@/assets/LS.png'
import RS from '@/assets/RS.png'
import coal from '@/assets/coal.png'
import { useResizeObserver } from '@vueuse/core'
import { useEventBus } from '@/bus/useEventBus'

const props = defineProps<{
  element: ComponentInfo
  propValue: Recordable<string>
}>()

const status = ref<boolean>(false)

const rRotate: number[] = [-20, 20]
const lRotate: number[] = [-20, 20]
let rate = ref<number>(1)
let lRate = ref<number>(0)
let rRate = ref<number>(0)
const mainEl = ref<ElRef>(null)
const l = ref<string>(L)
const r = ref<string>(R)
let historyData: Recordable<string>[]

const mainStyle = computed<Recordable<string>>(() => {
  return {
    backgroundImage: `url(${coal})`,
    transform: `scale(${rate.value})`
  }
})

const lStyle = computed<Recordable<string>>(() => {
  return {
    transform: `translateX(-70%) translateY(-15%) rotate(${lRate.value}deg)`
  }
})

const rStyle = computed<Recordable<string>>(() => {
  return {
    transform: `translateX(70%) translateY(-15%) rotate(${rRate.value}deg)`
  }
})

const initData = () => {
  const leftDdrumHeightTag: string = props.propValue.leftDdrumHeightTag
  const rightDdrumHeightTag: string = props.propValue.rightDdrumHeightTag
  const statusTag: string = props.propValue.statusTag
  http
    .post({
      url: props.propValue.historyUrl,
      data: [leftDdrumHeightTag, rightDdrumHeightTag, statusTag]
    })
    .then((resp) => {
      if (resp.ErrorCode === 200) {
        historyData = resp.Results || []
        historyData.forEach((ele) => {
          dataHandler(ele)
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      console.log('--')
    })
}

const dataHandler = (event) => {
  const item: TagType = event as TagType
  const leftDdrumHeightTag: string = props.propValue.leftDdrumHeightTag
  const rightDdrumHeightTag: string = props.propValue.rightDdrumHeightTag
  const statusTag: string = props.propValue.statusTag
  if (item.TagName === statusTag) {
    if (item.TagValue === '1') {
      status.value = true
      l.value = L
      r.value = R
    } else {
      status.value = false
      l.value = LS
      r.value = RS
      lRate.value = 0
      rRate.value = 0
    }
  }
  if (status.value) {
    if (item.TagName === rightDdrumHeightTag) {
      let rightHeigt = Number(item.TagValue)
      if (rightHeigt > Number(props.propValue.maxHeight)) {
        rightHeigt = Number(props.propValue.maxHeight)
      } else if (rightHeigt < Number(props.propValue.minHeight)) {
        rightHeigt = Number(props.propValue.minHeight)
      }
      const curRate: number =
        (rightHeigt - Number(props.propValue.minHeight)) /
        (Number(props.propValue.maxHeight) - Number(props.propValue.minHeight))
      rRate.value = -Math.round(curRate * (rRotate[1] - rRotate[0]) - rRotate[0])
    }

    if (item.TagName === leftDdrumHeightTag) {
      let leftHeigt = Number(item.TagValue)
      if (leftHeigt > Number(props.propValue.maxHeight)) {
        leftHeigt = Number(props.propValue.maxHeight)
      } else if (leftHeigt < Number(props.propValue.minHeight)) {
        leftHeigt = Number(props.propValue.minHeight)
      }
      const curRate: number =
        (leftHeigt - Number(props.propValue.minHeight)) /
        (Number(props.propValue.maxHeight) - Number(props.propValue.minHeight))
      lRate.value = Math.round(curRate * (lRotate[1] - lRotate[0]) - lRotate[0])
    }
  }
}

useResizeObserver(mainEl, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  const heightrate = height / 63
  const widthrate = width / 245
  const min = Math.min(heightrate, widthrate)
  rate.value = min
})
onMounted(() => {
  initData()
})

useEventBus('actual', dataHandler)
</script>

<style scoped lang="less">
.coal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .content {
    position: relative;
    min-width: 248px;
    min-height: 63px;
    max-width: 248px;
    max-height: 63px;
    background-size: cover;
    overflow: visible;

    img.l {
      position: absolute;
      transform: translateX(-70%) translateY(-15%) rotate(0deg);
      left: 0;
      top: 0;
      transition: all 0.3s;
      transform-origin: 97% 50%;
    }
    img.r {
      position: absolute;
      transform: translateX(70%) translateY(-15%) rotate(0deg);
      right: 0;
      top: 0;
      transition: all 0.3s;
      transform-origin: 3% 50%;
    }
  }
}
</style>
