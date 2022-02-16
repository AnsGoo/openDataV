import type { EChartLegend, EChartToolTip, EChartTitle, EChartAxis } from './propTypes'
import type { GroupType } from '@/types/component'
import { cloneDeep } from 'lodash-es'

// 标题配置
const eChartTitleAttr: GroupType = {
  name: '标题配置',
  uid: 'title',
  max: 1,
  children: [
    {
      key: 'show',
      label: '是否显示标题',
      type: 'switch'
    },
    {
      key: 'text',
      label: '标题文字',
      type: 'text'
    },
    {
      key: 'subtext',
      label: '副标题文字',
      type: 'text'
    },
    {
      key: 'left',
      label: '标题偏左位置',
      type: 'select',
      selectOptions: [
        { label: '左侧', value: 'left' },
        { label: '右侧', value: 'right' },
        { label: '中间', value: 'center' }
      ]
    },
    {
      key: 'top',
      label: '标题偏上位置',
      type: 'select',
      selectOptions: [
        { label: '顶部', value: 'top' },
        { label: '底部', value: 'bottom' },
        { label: '中间', value: 'middle' }
      ]
    },
    {
      key: 'textColor',
      label: '标题文字颜色',
      type: 'color'
    },
    {
      key: 'textSize',
      label: '标题文字大小',
      type: 'number'
    },
    {
      key: 'subtextColor',
      label: '副标题文字颜色',
      type: 'color'
    },
    {
      key: 'subtextSize',
      label: '副标题文字大小',
      type: 'number'
    }
  ]
}

// echart 标题配置
const eChartTitle: EChartTitle = {
  show: false,
  text: '',
  subtext: '',
  left: 'center',
  top: 'top',
  textColor: '#fff',
  textSize: 14,
  subtextColor: '#fff',
  subtextSize: 14
}

// 图例配置
const eChartLegendAttr: GroupType = {
  name: '图例',
  uid: 'legend',
  max: 1,
  children: [
    {
      key: 'show',
      label: '是否显示图例',
      type: 'switch'
    },
    {
      key: 'top',
      label: '图例Top位置',
      type: 'select',
      selectOptions: [
        { label: '顶部', value: 'top' },
        { label: '底部', value: 'bottom' },
        { label: '中间', value: 'middle' }
      ]
    },
    {
      key: 'left',
      label: '图例left位置',
      type: 'select',
      selectOptions: [
        { label: '左侧', value: 'left' },
        { label: '右侧', value: 'right' },
        { label: '中间', value: 'center' }
      ]
    },
    {
      key: 'orient',
      label: '图例方向',
      type: 'select',
      selectOptions: [
        { label: '水平', value: 'horizontal' },
        { label: '垂直', value: 'vertical' }
      ]
    },
    {
      key: 'textColor',
      label: '图例文字颜色',
      type: 'color'
    },
    {
      key: 'textSize',
      label: '图例文字大小',
      type: 'number'
    }
  ]
}

// echart 图表图例基础属性
const eChartLegend: EChartLegend = {
  show: true,
  type: 'scroll',
  top: 'top',
  left: 'left',
  orient: 'vertical',
  textColor: '#fff',
  textSize: 12
}

// 提示框配置
const eChartToolTipAttr: GroupType = {
  name: '提示框',
  uid: 'tooltip',
  max: 1,
  children: [
    {
      key: 'show',
      label: '是否显示提示框',
      type: 'switch'
    },
    {
      key: 'trigger',
      label: '触发类型',
      type: 'select',
      selectOptions: [
        { label: '数据项触发', value: 'item' },
        { label: '坐标轴触发', value: 'axis' }
      ]
    },
    {
      key: 'formatter',
      label: '提示框格式',
      type: 'text'
    }
  ]
}

// echart 提示框基础属性
const eChartToolTip: EChartToolTip = {
  show: true,
  formatter: '{a} <br/>{b} : {c} ({d}%)',
  trigger: 'item'
}

// 直角坐标系配置
const eChartAxisAttr: GroupType = {
  name: '坐标轴配置',
  uid: 'axis',
  max: 2,
  children: [
    {
      key: 'show',
      label: '是否显示坐标轴',
      type: 'switch'
    },
    {
      key: 'name',
      label: '坐标轴名称',
      type: 'text'
    },
    {
      key: 'nameLocation',
      label: '坐标轴名称位置',
      type: 'select',
      selectOptions: [
        { label: '头部', value: 'start' },
        { label: '尾部', value: 'end' },
        { label: '中间', value: 'center' }
      ]
    },
    {
      key: 'position',
      label: '坐标轴位置',
      type: 'select',
      selectOptions: [
        { label: '顶部', value: 'top' },
        { label: '底部', value: 'bottom' }
      ]
    },
    {
      key: 'type',
      label: '坐标轴类型',
      type: 'select',
      selectOptions: [
        { label: '线性', value: 'value' },
        { label: '分类', value: 'category' },
        { label: '时间', value: 'time' }
      ]
    },
    {
      key: 'scale',
      label: '数值是否不从0开始',
      type: 'switch'
    }
  ]
}

const eChartAxis: EChartAxis = {
  show: true,
  name: '',
  nameLocation: 'end',
  position: 'bottom',
  type: 'category',
  scale: false
}

export const basicEchartConfig: {
  title: EChartTitle[]
  legend: EChartLegend[]
  tooltip: EChartToolTip[]
  axis: EChartAxis[]
} = {
  title: [cloneDeep(eChartTitle)],
  legend: [cloneDeep(eChartLegend)],
  tooltip: [cloneDeep(eChartToolTip)],
  // 坐标轴需要两个
  axis: [cloneDeep(eChartAxis), cloneDeep(eChartAxis)]
}

export const basicEchartAttr = [
  eChartTitleAttr,
  eChartLegendAttr,
  eChartToolTipAttr,
  eChartAxisAttr
]
