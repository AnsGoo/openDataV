import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
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

const style: Array<PropsType> = []

const attrs: Array<PropsType> = [
  {
    name: '基础配置',
    uid: 'base',
    children: [
      {
        key: 'title',
        label: '标题',
        type: FormType.TEXT
      },
      {
        key: 'textColor',
        label: '文字颜色',
        type: FormType.COLOR
      },
      {
        key: 'shape',
        label: '形状',
        type: FormType.SELECT,
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
        type: FormType.SWITCH
      },
      {
        key: 'fontSize',
        label: '字体大小',
        type: FormType.NUMBER
      },
      {
        key: 'offsetLeft',
        label: '偏左',
        type: FormType.NUMBER
      },
      {
        key: 'offsetRight',
        label: '偏右',
        type: FormType.NUMBER
      },
      {
        key: 'direction',
        label: '水波方向',
        type: FormType.SELECT,
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
        type: FormType.COLOR
      },
      {
        key: 'borderWidth',
        label: '边框宽度',
        type: FormType.NUMBER
      },
      {
        key: 'outline',
        label: '边框显示',
        type: FormType.SWITCH
      },
      {
        key: 'shadowColor',
        label: '阴影色',
        type: FormType.COLOR
      },
      {
        key: 'shadowBlur',
        label: '阴影深度',
        type: FormType.NUMBER
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
        type: FormType.TEXT
      },
      {
        key: 'maxValue',
        label: '最大值',
        type: FormType.NUMBER
      },
      {
        key: 'isInterval',
        label: '是否定时刷新',
        type: FormType.SWITCH
      },
      {
        key: 'interval',
        label: '定时',
        type: FormType.NUMBER
      },
      {
        key: 'history',
        label: '历史数据',
        type: FormType.TEXT
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
