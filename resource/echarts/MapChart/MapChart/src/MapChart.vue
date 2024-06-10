<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script setup lang="ts">
import type { Response } from '@open-data-v/base'
import { useData, useProp } from '@open-data-v/base'
import type { EChartsOption } from 'echarts'
import { graphic, registerMap } from 'echarts'
import { onMounted, ref } from 'vue'

import { useEchart } from '../../../hooks'
import type MapChartComponent from '../config'
import type { MapChart } from '../type'
import chinaMap from './assets/china.json'

const chartEl = ref<ElRef>(null)
let globalOption: EChartsOption
const props = defineProps<{
  component: MapChartComponent
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

const { updateEchart, resizeHandler } = useEchart(chartEl)
const { propValue } = useProp<MapChart>(props.component, propValueChange)

onMounted(async () => {
  globalOption = getOption()
  updateEchart(globalOption)
})

registerMap('china', chinaMap as any)

let planePath =
  'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
const getOption = () => {
  const option: EChartsOption = {
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '10%'
    },
    geo: {
      map: 'china',
      zoom: 1.5,
      center: [102.848234, 32.82333],
      scaleLimit: {
        min: 0.8
      },
      label: {
        color: propValue.label.axisLabelColor,
        show: true,
        fontSize: propValue.label.axisFontSize
      },
      emphasis: {
        label: {
          color: propValue.label.emphasisColor,
          show: true
        },
        itemStyle: {
          areaColor: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: propValue.mapColor.emphasisAreaColor || '#073684' // 0% 处的颜色
              },
              {
                offset: 1,
                color: propValue.mapColor.emphasisAreaColor1 || '#2B91B7' // 100% 处的颜色
              }
            ]
          }
        }
      },
      roam: false,
      itemStyle: {
        areaColor: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              // 0% 处的颜色
              color: propValue.mapColor.areaColor || '#073684'
            },
            {
              offset: 1,
              // 100% 处的颜色
              color: propValue.mapColor.areaColor1 || '#061E3D'
            }
          ]
        },
        borderColor: new graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: propValue.mapColor.borderColor || '#00F6FF'
            },
            {
              offset: 1,
              color: propValue.mapColor.borderColor1 || '#87ADCB'
            }
          ],
          false
        ),
        shadowColor: propValue.mapColor.shadowColor || '#0A4C8B',
        shadowOffsetY: 0,
        shadowBlur: 60,
        borderWidth: 1
      },
      tooltip: {
        show: false
      }
    }
  }
  option.series = [
    {
      name: '',
      type: 'lines',
      coordinateSystem: 'geo',
      zlevel: 1,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.7,
        color: 'red', //arrow箭头的颜色
        symbolSize: 3
      },
      lineStyle: {
        color: '#fff',
        width: 0,
        curveness: 0.2
      }
    },
    {
      name: '',
      type: 'lines',
      coordinateSystem: 'geo',
      zlevel: 2,
      symbol: ['none', 'arrow'],
      symbolSize: 10,
      effect: {
        show: true,
        period: 6,
        trailLength: 0,
        symbol: planePath,
        symbolSize: 15
      },
      lineStyle: {
        color: '#fff',
        width: 1,
        opacity: 0.6,
        curveness: 0.2
      },
      data: []
    }
  ]
  return option as EChartsOption
}

const updateData = (resp: Array<{ label: string; value: number }>) => {
  globalOption = getOption()
  globalOption.series![1].data = resp || []
  updateEchart(globalOption)
}
</script>
