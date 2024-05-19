<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script setup lang="ts">
import type { Response } from '@open-data-v/base'
import { useData, useProp } from '@open-data-v/base'
import type { CustomSeriesOption, EChartsOption, XAXisComponentOption } from 'echarts'
import { graphic } from 'echarts'
import { onMounted, ref } from 'vue'

import { useEchart } from '../../../hooks'
import { compareResetValue } from '../../../utils'
import type StereoscopicBarChartComponent from '../config'
import type { StereoscopicBarChart } from '../type'

let globalOption: EChartsOption
const props = defineProps<{
  component: StereoscopicBarChartComponent
}>()
let chartData: Array<{ label: string; value: number }> = []
const dataChange = (resp: Response, _?: string) => {
  if (resp.status === 'SUCCESS') {
    chartData = resp.afterData
    updateData(chartData)
  }
}

useData(props.component, dataChange)

const propValueChange = () => {
  updateData(chartData)
}

const chartEl = ref<ElRef>(null)
const { updateEchart, resizeHandler } = useEchart(chartEl)
const { propValue } = useProp<StereoscopicBarChart>(props.component, propValueChange)

onMounted(async () => {
  configGraphic()
  globalOption = getOption()
  updateEchart(globalOption)
})

// region 立体配置
function configGraphic() {
  const offsetX = 10
  const offsetY = 5
  // 绘制左侧面
  const CubeLeft = graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath(ctx, shape) {
      // 会canvas的应该都能看得懂，shape是从custom传入的
      const xAxisPoint = shape.xAxisPoint
      const c0 = [shape.x, shape.y]
      const c1 = [shape.x - offsetX, shape.y - offsetY]
      const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY]
      const c3 = [xAxisPoint[0], xAxisPoint[1]]
      ctx
        .moveTo(c0[0], c0[1])
        ?.lineTo(c1[0], c1[1])
        ?.lineTo(c2[0], c2[1])
        ?.lineTo(c3[0], c3[1])
        ?.closePath()
    }
  })

  // 绘制右侧面
  const CubeRight = graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint
      const c1 = [shape.x, shape.y]
      const c2 = [xAxisPoint[0], xAxisPoint[1]]
      const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY]
      const c4 = [shape.x + offsetX, shape.y - offsetY]
      ctx
        .moveTo(c1[0], c1[1])
        ?.lineTo(c2[0], c2[1])
        ?.lineTo(c3[0], c3[1])
        ?.lineTo(c4[0], c4[1])
        ?.closePath()
    }
  })

  // 绘制顶面
  const CubeTop = graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: function (ctx, shape) {
      const c1 = [shape.x, shape.y]
      const c2 = [shape.x + offsetX, shape.y - offsetY] //右点
      const c3 = [shape.x, shape.y - offsetX]
      const c4 = [shape.x - offsetX, shape.y - offsetY]
      ctx
        .moveTo(c1[0], c1[1])
        ?.lineTo(c2[0], c2[1])
        ?.lineTo(c3[0], c3[1])
        ?.lineTo(c4[0], c4[1])
        ?.closePath()
    }
  })

  // 注册形状
  graphic.registerShape('CubeLeft', CubeLeft)
  graphic.registerShape('CubeRight', CubeRight)
  graphic.registerShape('CubeTop', CubeTop)
}
// endregion

const getOption = () => {
  const option: EChartsOption = {
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: [],
      splitLine: {
        show: propValue.axis.xshow,
        lineStyle: {
          type: propValue.axis.xLineType,
          color: propValue.axis.xAxisLineColor
        }
      },
      axisLine: {
        lineStyle: {
          color: propValue.axis.axisColor || '#fff'
        }
      },
      axisTick: {
        lineStyle: {
          color: propValue.axis.axisColor || '#fff'
        }
      },
      axisLabel: {
        color: propValue.axis.axisLabelColor || '#fff'
      }
    },
    yAxis: {
      type: 'value',
      max: (value) => {
        if (propValue.data.max === 'dataMax' || !propValue.data.max) {
          return value.max + Number(propValue.data.maxOffset || 0)
        } else {
          return Number(propValue.data.max) + Number(propValue.data.maxOffset || 0)
        }
      },
      min: (value) => {
        if (propValue.data.min === 'dataMin') {
          return value.min - Number(propValue.data.minOffset || 0)
        } else if (propValue.data.min === '' || propValue.data.min === undefined) {
          return 0 - Number(propValue.data.minOffset || 0)
        } else {
          return Number(propValue.data.min) - Number(propValue.data.minOffset || 0)
        }
      },
      splitLine: {
        show: propValue.axis.yshow,
        lineStyle: {
          type: propValue.axis.yLineType,
          color: propValue.axis.yAxisLineColor
        }
      },
      axisLine: {
        lineStyle: {
          color: propValue.axis.axisColor || '#fff'
        }
      },
      axisTick: {
        lineStyle: {
          color: propValue.axis.axisColor || '#fff'
        }
      },
      axisLabel: {
        color: propValue.axis.axisLabelColor || '#fff'
      }
    }
  }
  option.series = [
    {
      type: 'custom',
      renderItem(_, api) {
        if (!api?.value) {
          return null
        }
        const location = api.coord([api.value(0), api.value(1)])
        return {
          type: 'group',
          children: [
            {
              type: 'CubeLeft',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              buildPath() {},
              style: {
                fill: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: propValue.label.axisLabelColor || '#3DE7C9'
                  }
                ])
              }
            },
            {
              type: 'CubeRight',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: propValue.label.axisLabelColor || '#3DE7C9'
                  }
                ])
              }
            },
            {
              type: 'CubeTop',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: propValue.label.axisLabelColor || '#3DE7C9'
                  }
                ])
              }
            }
          ]
        }
      }
    }
  ] as CustomSeriesOption[]
  return option as EChartsOption
}

const updateData = (resp: Array<{ label: string; value: number }>) => {
  const upperLimit = propValue.data.upperLimit
  const lowerLimit = propValue.data.lowerLimit
  const data = (resp || []).map((ele) => {
    return {
      value: compareResetValue(Number(ele.value), upperLimit, lowerLimit),
      label: ele.label
    }
  })

  globalOption = getOption()
  globalOption.series![0].data = data
  globalOption.xAxis = {
    ...globalOption.xAxis,
    data: data.map((el) => el.label)
  } as XAXisComponentOption
  updateEchart(globalOption)
}
</script>
