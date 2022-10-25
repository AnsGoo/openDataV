<template>
  <div id="mb-ruler" v-contextmenu.stop="ruleContextMenus" class="style-ruler mb-ruler">
    <!-- 水平方向 -->
    <RulerWrapper
      ref="HRulerWrapperRef"
      :vertical="false"
      :width="width"
      :height="16"
      :canvas-height="height"
      :canvas-width="width"
      :is-show-refer-line="isShowReferLine"
      :thick="thick"
      :ratio="ratio"
      :start="startX"
      :select-start="shadow?.x || 0"
      :select-length="shadow?.width || 0"
      :scale="scale"
      :palette="paletteCpu"
    />
    <!-- 竖直方向 -->
    <RulerWrapper
      ref="VRulerWrapperRef"
      :vertical="true"
      :width="16"
      :height="height"
      :canvas-height="height"
      :canvas-width="width"
      :is-show-refer-line="isShowReferLine"
      :thick="thick"
      :ratio="ratio"
      :start="startY"
      :select-start="shadow?.y || 0"
      :select-length="shadow?.height || 0"
      :scale="scale"
      :palette="paletteCpu"
    />
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable-next-line @typescript-eslint/consistent-type-imports */
import RulerWrapper from './RulerWrapper.vue'
import { computed, ref } from 'vue'
import type { PaletteType, ShadowType } from '../index-types'
import type { ContextmenuItem } from '@/plugins/directive/contextmenu/types'

const props = withDefaults(
  defineProps<{
    scale: number
    ratio?: number
    thick: number
    palette?: PaletteType
    startX: number
    startY: number
    width?: number
    height?: number
    shadow?: ShadowType
  }>(),
  {
    vertical: true,
    thick: 16,
    scale: 1,
    width: 200,
    height: 200,
    ratio: 0
  }
)

const VRulerWrapperRef = ref<InstanceType<typeof RulerWrapper> | null>(null)
const HRulerWrapperRef = ref<InstanceType<typeof RulerWrapper> | null>(null)
const isShowReferLine = ref<boolean>(true)
const clearLines = () => {
  // @ts-ignore
  VRulerWrapperRef.value?.clearLines()
  // @ts-ignore
  HRulerWrapperRef.value?.clearLines()
  isShowReferLine.value = true
}

const ruleContextMenus = (): ContextmenuItem[] => {
  return [
    {
      text: '显示辅助线',
      subText: '',
      disable: isShowReferLine.value,
      handler: () => (isShowReferLine.value = true)
    },
    {
      text: '隐藏辅助线',
      subText: '',
      disable: !isShowReferLine.value,
      handler: () => (isShowReferLine.value = false)
    },
    {
      text: '清空辅助线',
      subText: '',
      disable: !isShowReferLine.value,
      handler: clearLines
    }
  ]
}
// 这里处理默认值,因为直接写在props的default里面时,可能某些属性用户未必会传,那么这里要做属性合并,防止属性丢失
const paletteCpu = computed(() => {
  function merge(obj: { [key: string]: any }, o: { [key: string]: any }) {
    Object.keys(obj).forEach((key) => {
      if (key && obj.hasOwnProperty(key)) {
        if (typeof o['key'] === 'object') {
          obj[key] = merge(obj[key], o[key])
        } else if (o.hasOwnProperty(key)) {
          obj[key] = o[key]
        }
      }
    })
    return obj
  }
  return merge(
    {
      bgColor: 'rgba(225,225,225, 0)', // ruler bg color
      longfgColor: '#BABBBC', // ruler longer mark color
      shortfgColor: '#C8CDD0', // ruler shorter mark color
      fontColor: '#7D8694', // ruler font color
      shadowColor: '#E8E8E8', // ruler shadow color
      lineColor: '#37d4cf',
      lineBoardStyle: 'dashed',
      borderColor: '#DADADC',
      cornerActiveColor: 'rgb(235, 86, 72, 0.6)',
      menu: {
        bgColor: '#fff',
        dividerColor: '#DBDBDB',
        listItem: {
          textColor: '#415058',
          hoverTextColor: '#298DF8',
          disabledTextColor: 'rgba(65, 80, 88, 0.4)',
          bgColor: '#fff',
          hoverBgColor: '#F2F2F2'
        }
      }
    },
    props.palette || {}
  )
})
</script>

<style lang="less">
.style-ruler {
  position: absolute;
  z-index: 3; /* 需要比resizer高 */
  width: 100%; /* scrollbar width */
  height: 100%;
  overflow: hidden;
  font-size: 12px;
  pointer-events: none;
  span {
    line-height: 1;
  }
}
.corner {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  cursor: pointer;
  box-sizing: content-box;
  transition: all 0.2s ease-in-out;
}

.indicator {
  position: absolute;
  pointer-events: none;
  .value {
    position: absolute;
    background: white;
  }
}

.ruler {
  width: 100%;
  height: 100%;
  pointer-events: auto;
}
</style>
