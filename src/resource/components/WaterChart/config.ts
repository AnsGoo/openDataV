import { ComponentGroup } from '@/enum'
import type { ComponentConfig, GroupType, ComponentOptions } from '@/types/component'
import type { WaterChart } from './type'

const component: ComponentConfig<WaterChart> = {
  component: 'WaterChart',
  group: ComponentGroup.PROGERSS,
  label: '水波图',
  propValue: {
    title: '标题',
    shape: 'roundRect', // 形状
    outline: false, //边框是否显示
    waveAnimation: true, // 水波是否流动
    borderColor: '#156ACF',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowBlur: 20,
    fontSize: 40,
    textColor: '#fff',
    offsetLeft: 50,
    offsetRight: 50,
    direction: 'left',
    dataTag: 'ZJGD_2357#ZJGD',
    maxValue: 100,
    isInterval: false,
    interval: 3000,
    history: ''
  },
  icon: 'wenben',
  style: {
    width: 300,
    height: 300
  }
}

const style: Array<GroupType> = []

const attrs: Array<GroupType> = [
  {
    name: '基础配置',
    uid: 'base',
    children: [
      {
        key: 'title',
        label: '标题',
        type: 'text'
      },
      {
        key: 'textColor',
        label: '文字颜色',
        type: 'color'
      },
      {
        key: 'shape',
        label: '形状',
        type: 'select',
        componentOptions: {
          options: [
            { value: 'diamond', label: '菱形' },
            { value: 'rect', label: '长方形' },
            { value: 'roundRect', label: '圆角' },
            { value: 'pin', label: '水滴' },
            { value: 'whale', label: '鲸鱼' },
            { value: 'circle', label: '圆形' },
            { value: 'triangle', label: '三角形' },
            { value: 'arrow', label: '箭头形' }
          ]
        }
      },
      {
        key: 'waveAnimation',
        label: '是否流动',
        type: 'switch'
      },
      {
        key: 'fontSize',
        label: '字体大小',
        type: 'number'
      },
      {
        key: 'offsetLeft',
        label: '偏左',
        type: 'number'
      },
      {
        key: 'offsetRight',
        label: '偏右',
        type: 'number'
      },
      {
        key: 'direction',
        label: '水波方向',
        type: 'select',
        componentOptions: {
          options: [
            { value: 'left', label: '向左飘动' },
            { value: 'right', label: '向右飘动' }
          ]
        }
      }
    ]
  },
  {
    name: '边框显示',
    uid: 'border',
    children: [
      {
        key: 'borderColor',
        label: '边框颜色',
        type: 'color'
      },
      {
        key: 'borderWidth',
        label: '边框宽度',
        type: 'number'
      },
      {
        key: 'outline',
        label: '边框显示',
        type: 'switch'
      },
      {
        key: 'shadowColor',
        label: '阴影色',
        type: 'color'
      },
      {
        key: 'shadowBlur',
        label: '阴影深度',
        type: 'number'
      }
    ]
  },
  {
    name: '数据配置',
    uid: 'data',
    children: [
      {
        key: 'dataTag',
        label: '标签',
        type: 'text'
      },
      {
        key: 'maxValue',
        label: '最大值',
        type: 'number'
      },
      {
        key: 'isInterval',
        label: '是否定时刷新',
        type: 'switch'
      },
      {
        key: 'interval',
        label: '定时',
        type: 'number'
      },
      {
        key: 'history',
        label: '历史数据',
        type: 'text'
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
