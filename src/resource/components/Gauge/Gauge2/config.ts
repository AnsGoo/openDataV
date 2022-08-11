import { ComponentGroup, FormType } from '@/enum'
import type { ComponentConfig, PropsType, ComponentOptions } from '@/types/component'
import type { GaugeTwo } from './type'

const component: ComponentConfig<GaugeTwo> = {
  component: 'Gauge2',
  label: '仪表盘2',
  group: ComponentGroup.GAUGE,
  propValue: {
    title: '温度',
    history: 'http://10.10.8.174:60000/Scan/ReadPointValues',
    datatag: 'ZJYL_949#ZJYL',
    unit: '°C',
    minValue: 0,
    maxValue: 600,
    startAngle: 0,
    endAngle: 0,
    splitNumber: 6,
    axisWidth: 5,
    axisColor: '0.5,#7CFFB2;1,#FF6E76',
    pointerWidth: 5,
    pointerColor: '#FF6E76',
    pointerLength: '60%',
    pointerOffset: '0,-20%',
    pointStyle: 'triangle',
    tickShow: true,
    tickFontColor: 'inherit',
    tickFontSize: 10,
    tickDistance: -50,
    titleFontSize: 10,
    titleOffset: '0,-20%',
    titleColor: 'inherit',
    detailFontSize: 10,
    detailFontColor: 'inherit',
    detailOffset: '0,0',
    splitLength: 20,
    splitColor: 'inherit',
    splitWidth: 5,
    tickLength: 10,
    tickColor: 'inherit',
    tickWidth: 5
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
    name: '标题配置',
    uid: 'title',
    children: [
      {
        key: 'title',
        label: '名称',
        type: FormType.TEXT
      },
      {
        key: 'titleOffset',
        label: '偏移',
        type: FormType.TEXT
      },
      {
        key: 'titleFontSize',
        label: '字体大小',
        type: FormType.NUMBER
      },
      {
        key: 'titleColor',
        label: '颜色',
        type: FormType.COLOR
      }
    ]
  },
  {
    name: '图形配置',
    uid: 'graphic',
    children: [
      {
        key: 'startAngle',
        label: '起始角度',
        type: FormType.NUMBER
      },
      {
        key: 'endAngle',
        label: '结束角度',
        type: FormType.NUMBER
      }
    ]
  },
  {
    name: '数据配置',
    uid: 'data',
    children: [
      {
        key: 'history',
        label: '历史数据地址',
        type: FormType.TEXT
      },
      {
        key: 'datatag',
        label: '数据标签',
        type: FormType.TEXT
      },
      {
        key: 'unit',
        label: '单位',
        type: FormType.TEXT
      },
      {
        key: 'maxValue',
        label: '最大值',
        type: FormType.NUMBER
      },
      {
        key: 'minValue',
        label: '最小值',
        type: FormType.NUMBER
      }
    ]
  },
  {
    name: '外围边框配置',
    uid: 'axisLine',
    children: [
      {
        key: 'axisWidth',
        label: '宽度',
        type: FormType.NUMBER
      },
      {
        key: 'axisColor',
        label: '颜色',
        type: FormType.TEXT
      }
    ]
  },
  {
    name: '刻度配置',
    uid: 'axisTick',
    children: [
      {
        key: 'tickLength',
        label: '长度',
        type: FormType.NUMBER
      },
      {
        key: 'tickColor',
        label: '颜色',
        type: FormType.COLOR
      },
      {
        key: 'tickWidth',
        label: '宽度',
        type: FormType.NUMBER
      },
      {
        key: 'tickShow',
        label: '是否显示',
        type: FormType.SWITCH
      },
      {
        key: 'tickFontSize',
        label: '字体大小',
        type: FormType.NUMBER
      },
      {
        key: 'tickFontColor',
        label: '字体颜色',
        type: FormType.COLOR
      },
      {
        key: 'tickDistance',
        label: '间距',
        type: FormType.NUMBER
      }
    ]
  },
  {
    name: '分割线配置',
    uid: 'splitLine',
    children: [
      {
        key: 'splitLength',
        label: '长度',
        type: FormType.NUMBER
      },
      {
        key: 'splitColor',
        label: '颜色',
        type: FormType.COLOR
      },
      {
        key: 'splitWidth',
        label: '宽度',
        type: FormType.NUMBER
      },
      {
        key: 'splitNumber',
        label: '分割数量',
        type: FormType.NUMBER
      }
    ]
  },
  {
    name: '指针配置',
    uid: 'pointer',
    children: [
      {
        key: 'pointStyle',
        label: '指针样式',
        type: FormType.SELECT,
        componentOptions: {
          options: [
            { label: '三角形', value: 'triangle' },
            { label: '箭头形', value: 'arrow' },
            { label: '菱形', value: 'diamond' }
          ]
        }
      },
      {
        key: 'pointerLength',
        label: '长度占比',
        type: FormType.TEXT
      },
      {
        key: 'pointerColor',
        label: '颜色',
        type: FormType.COLOR
      },
      {
        key: 'pointerWidth',
        label: '宽度',
        type: FormType.NUMBER
      },
      {
        key: 'pointerOffset',
        label: '偏移',
        type: FormType.TEXT
      }
    ]
  },
  {
    name: '描述配置',
    uid: 'description',
    children: [
      {
        key: 'detailFontSize',
        label: '字体大小',
        type: FormType.NUMBER
      },
      {
        key: 'detailOffset',
        label: '偏移',
        type: FormType.TEXT
      },
      {
        key: 'detailFontColor',
        label: '字体颜色',
        type: FormType.COLOR
      }
    ]
  }
]

const componentOptions: ComponentOptions = { component, style, attrs }
export default componentOptions
