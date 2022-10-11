import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'
import { DataIntegrationMode } from '@/resource/models/data'

export const componentName = 'WaveChart'
class WaveChartComponent extends BaseComponent {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.PROGERSS,
      name: name ? name : '水波图',
      id,
      width: 200,
      height: 300,
      icon,
      dataIntegrationMode: DataIntegrationMode.UNIVERSAL
    })
  }

  _prop: PropsType[] = [
    {
      label: '图表配置',
      prop: 'options',
      children: [
        {
          prop: 'amplitude',
          label: '波动幅度',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 20
          }
        },
        {
          prop: 'outlineShow',
          label: '显示边框',
          type: FormType.SWITCH,
          componentOptions: {
            defaultValue: false
          }
        },
        {
          prop: 'outlineColor',
          label: '边框颜色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#3491FA'
          }
        },
        {
          prop: 'radius',
          label: '图形占比',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: '100%'
          }
        },
        {
          prop: 'shape',
          label: '形状',
          type: FormType.SELECT,
          componentOptions: {
            defaultValue: 'circle',
            options: [
              { value: 'circle', label: '圆形' },
              { value: 'rect', label: '正方形' },
              { value: 'roundRect', label: '圆角正方形' },
              { value: 'triangle', label: '三角形' },
              { value: 'diamond', label: '菱形' },
              { value: 'arrow', label: '箭头形' },
              { value: 'pin', label: '气球形' },
              { value: 'container', label: '充满容器' }
            ]
          }
        },
        {
          prop: 'direction',
          label: '波动方向',
          type: FormType.SELECT,
          componentOptions: {
            defaultValue: 'left',
            options: [
              { value: 'left', label: '向左波动' },
              { value: 'right', label: '向右波动' }
            ]
          }
        },
        {
          prop: 'waveAnimation',
          label: '是否波动',
          type: FormType.SWITCH,
          componentOptions: {
            defaultValue: true
          }
        },
        {
          prop: 'color',
          label: '水波颜色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#3491FA'
          }
        },
        {
          prop: 'labelShow',
          label: '是否显示文本',
          type: FormType.SWITCH,
          componentOptions: {
            defaultValue: true
          }
        },
        {
          prop: 'backgroundColor',
          label: '背景色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#FFFFFF'
          }
        }
      ]
    }
  ]
  get exampleData() {
    return Number(Math.random().toFixed(2))
  }
}

export default WaveChartComponent
