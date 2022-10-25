<template>
  <div class="mark-line">
    <div
      v-for="line in lines"
      v-show="lineStatus[line] || false"
      :key="line"
      :ref="setLineRef"
      class="line"
      :class="line.includes('x') ? 'xline' : 'yline'"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { useEventBus, StaticKey } from '@/bus'
import { calcComponentAxis } from '@/utils/utils'
import type { BaseComponent } from '@/resource/models'
import type { Position } from '@/types/common'

const basicStore = useBasicStoreWithOut()

const linesRef = ref<Array<any>>([])

const lines = reactive<Array<string>>(['xt', 'xc', 'xb', 'yl', 'yc', 'yr'])
const diff = ref<number>(3)
const lineStatus = reactive<{
  xt: boolean
  xc: boolean
  xb: boolean
  yl: boolean
  yc: boolean
  yr: boolean
}>({
  xt: false,
  xc: false,
  xb: false,
  yl: false,
  yc: false,
  yr: false
})

const setLineRef = (el) => {
  linesRef.value.push(el)
}

const hideLine = () => {
  Object.keys(lineStatus).forEach((line) => {
    lineStatus[line] = false
  })
}

interface EventParams {
  isDownward: boolean
  isRightward: boolean
}

useEventBus('move', (event) => {
  showLine((event as EventParams).isDownward, (event as EventParams).isRightward)
})
useEventBus(StaticKey.DRAG_STOP, () => {
  hideLine()
})

const showLine = (isDownward, isRightward) => {
  const components = basicStore.componentData as Array<BaseComponent>
  if (basicStore.curComponent) {
    const {
      top: mytop,
      left: myleft,
      right: myright,
      bottom: mybottom
    }: Position = calcComponentAxis(basicStore.curComponent.positionStyle)
    const curComponentHalfwidth = (myright - myleft) / 2
    const curComponentHalfHeight = (mybottom - mytop) / 2

    hideLine()
    components.forEach((component) => {
      if (component == basicStore.curComponent) return
      const componentStyle = calcComponentAxis(component.positionStyle)
      const { top, left, bottom, right } = componentStyle
      const componentHalfwidth = (right - left) / 2
      const componentHalfHeight = (bottom - top) / 2

      const conditions: Record<
        'top' | 'left',
        Record<'isNearly' | 'lineNode' | 'line' | 'dragShift' | 'lineShift', any>[]
      > = {
        top: [
          {
            isNearly: isNearly(mytop, top),
            lineNode: linesRef.value[0], // xt
            line: 'xt',
            dragShift: top,
            lineShift: top
          },
          {
            isNearly: isNearly(mybottom, top),
            lineNode: linesRef.value[0], // xt
            line: 'xt',
            dragShift: top - (mybottom - mytop || 0),
            lineShift: top
          },
          {
            // 组件与拖拽节点的中间是否对齐
            isNearly: isNearly((mytop || 0) + curComponentHalfHeight, top + componentHalfHeight),
            lineNode: linesRef.value[1], // xc
            line: 'xc',
            dragShift: top + componentHalfHeight - curComponentHalfHeight,
            lineShift: top + componentHalfHeight
          },
          {
            isNearly: isNearly(mytop, bottom),
            lineNode: linesRef.value[2], // xb
            line: 'xb',
            dragShift: bottom,
            lineShift: bottom
          },
          {
            isNearly: isNearly(mybottom, bottom),
            lineNode: linesRef.value[2], // xb
            line: 'xb',
            dragShift: (bottom as number) - (mybottom - mytop || 0),
            lineShift: bottom
          }
        ],
        left: [
          {
            isNearly: isNearly(myleft, left),
            lineNode: linesRef.value[3], // yl
            line: 'yl',
            dragShift: left,
            lineShift: left
          },
          {
            isNearly: isNearly(myright, left),
            lineNode: linesRef.value[3], // yl
            line: 'yl',
            dragShift: left - (myright - myleft || 0),
            lineShift: left
          },
          {
            // 组件与拖拽节点的中间是否对齐
            isNearly: isNearly((myleft || 0) + curComponentHalfwidth, left + componentHalfwidth),
            lineNode: linesRef.value[4], // yc
            line: 'yc',
            dragShift: left + componentHalfwidth - curComponentHalfwidth,
            lineShift: left + componentHalfwidth
          },
          {
            isNearly: isNearly(myleft, right),
            lineNode: linesRef.value[5], // yr
            line: 'yr',
            dragShift: right,
            lineShift: right
          },
          {
            isNearly: isNearly(myright, right),
            lineNode: linesRef.value[5], // yr
            line: 'yr',
            dragShift: (right as number) - (myright - myleft || 0),
            lineShift: right
          }
        ]
      }

      const needToShow: Array<any> = []
      const { rotate } = basicStore.curComponent!.style
      Object.keys(conditions).forEach((key) => {
        // 遍历符合的条件并处理
        conditions[key].forEach((condition) => {
          if (!condition.isNearly) return

          // 修改当前组件位移
          const value =
            rotate != 0
              ? translatecurComponentShift(key, condition, {
                  width: myright - myleft,
                  height: mybottom - mytop
                })
              : condition.dragShift
          basicStore.setCurComponentStyle(key, value)

          condition.lineNode.style[key] = `${condition.lineShift}px`
          needToShow.push(condition.line)
        })
      })

      // 同一方向上同时显示三条线可能不太美观，因此才有了这个解决方案
      // 同一方向上的线只显示一条，例如多条横条只显示一条横线
      if (needToShow.length) {
        chooseTheTureLine(needToShow, isDownward, isRightward)
      }
    })
  }
}

const isNearly = (dragValue, targetValue) => {
  return Math.abs(dragValue - targetValue) <= diff.value
}

const translatecurComponentShift = (key, condition, curComponentStyle) => {
  const { width, height } = basicStore.curComponent!.style
  if (key == 'top') {
    return Math.round(condition.dragShift - ((height as number) - curComponentStyle.height) / 2)
  }

  return Math.round(condition.dragShift - ((width as number) - curComponentStyle.width) / 2)
}

const chooseTheTureLine = (needToShow, isDownward, isRightward) => {
  // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
  // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
  if (isRightward) {
    if (needToShow.includes('yr')) {
      lineStatus.yr = true
    } else if (needToShow.includes('yc')) {
      lineStatus.yc = true
    } else if (needToShow.includes('yl')) {
      lineStatus.yl = true
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (needToShow.includes('yl')) {
      lineStatus.yl = true
    } else if (needToShow.includes('yc')) {
      lineStatus.yc = true
    } else if (needToShow.includes('yr')) {
      lineStatus.yr = true
    }
  }

  if (isDownward) {
    if (needToShow.includes('xb')) {
      lineStatus.xb = true
    } else if (needToShow.includes('xc')) {
      lineStatus.xc = true
    } else if (needToShow.includes('xt')) {
      lineStatus.xt = true
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (needToShow.includes('xt')) {
      lineStatus.xt = true
    } else if (needToShow.includes('xc')) {
      lineStatus.xc = true
    } else if (needToShow.includes('xb')) {
      lineStatus.xb = true
    }
  }
}
</script>

<style scoped>
.mark-line {
  @apply h-full;
}

.line {
  @apply bg-blue-300 absolute z-50;
}

.xline {
  @apply w-full h-px;
}

.yline {
  @apply w-px h-full;
}
</style>
