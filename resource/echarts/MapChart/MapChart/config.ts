import type { MetaContainerItem } from '@open-data-v/base'
import { ComponentGroup, CustomComponent, DataMode, FormType } from '@open-data-v/base'
import { h } from 'vue'

export const componentName = 'MapChart'
class MapChartComponent extends CustomComponent {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.MAP,
      name: name ? name : '地图',
      id,
      width: 490,
      height: 408,
      icon,
      dataMode: DataMode.UNIVERSAL
    })
  }

  _prop: MetaContainerItem[] = [
    {
      label: '文字配置',
      prop: 'label',
      children: [
        {
          prop: 'axisLabelColor',
          label: '文字颜色',
          type: FormType.COLOR,
          props: {
            defaultValue: '#ffffff'
          }
        },
        {
          prop: 'axisFontSize',
          label: '字体大小',
          type: FormType.NUMBER,
          props: {
            defaultValue: 10,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          prop: 'emphasisColor',
          label: '强调色',
          type: FormType.COLOR,
          props: {
            defaultValue: '#fff'
          }
        }
      ]
    },
    {
      label: '地图颜色配置',
      prop: 'mapColor',
      children: [
        {
          prop: 'shadowColor',
          label: '阴影颜色',
          type: FormType.COLOR,
          props: {
            defaultValue: '#0A4C8B'
          }
        },
        {
          prop: 'borderColor',
          label: '边界颜色',
          type: FormType.COLOR,
          props: {
            defaultValue: '#00F6FF'
          }
        },
        {
          prop: 'borderColor1',
          label: '边界颜色1',
          type: FormType.COLOR,
          props: {
            defaultValue: '#87ADCB'
          }
        },
        {
          prop: 'emphasisAreaColor',
          label: '强调渐变色开始',
          type: FormType.COLOR,
          props: {
            defaultValue: '#073684'
          }
        },
        {
          prop: 'emphasisAreaColor1',
          label: '强调色渐变色结尾',
          type: FormType.COLOR,
          props: {
            defaultValue: '#2B91B7'
          }
        },
        {
          prop: 'areaColor',
          label: '渐变色开始',
          type: FormType.COLOR,
          props: {
            defaultValue: '#073684'
          }
        },
        {
          prop: 'areaColor1',
          label: '渐变色结尾',
          type: FormType.COLOR,
          props: {
            defaultValue: '#061E3D'
          }
        }
      ]
    }
  ]
  _style: MetaContainerItem[] = []

  get exampleData() {
    return [
      {
        fromName: '北京',
        toName: '上海',
        coords: [
          [116.4551, 40.2539],
          [121.4648, 31.2891]
        ]
      },
      {
        fromName: '上海',
        toName: '北京',
        coords: [
          [121.4648, 31.2891],
          [116.4551, 40.2539]
        ]
      },
      {
        fromName: '北京',
        toName: '广州',
        coords: [
          [116.4551, 40.2539],
          [113.5107, 23.2196]
        ]
      },
      {
        fromName: '广州',
        toName: '北京',
        coords: [
          [113.5107, 23.2196],
          [116.4551, 40.2539]
        ]
      },
      {
        fromName: '北京',
        toName: '成都',
        coords: [
          [116.4551, 40.2539],
          [103.9526, 30.7617]
        ]
      },
      {
        fromName: '成都',
        toName: '北京',
        coords: [
          [103.9526, 30.7617],
          [116.4551, 40.2539]
        ]
      },
      {
        fromName: '成都',
        toName: '新疆维吾尔自治区',
        coords: [
          [103.9526, 30.7617],
          [85.294711, 41.371801]
        ]
      },
      {
        fromName: ' 新疆维吾尔自治区',
        toName: '成都',
        coords: [
          [85.294711, 41.371801],
          [103.9526, 30.7617]
        ]
      }
    ]
  }
}

export default MapChartComponent
