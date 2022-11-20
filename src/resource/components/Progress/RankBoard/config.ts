import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'
import { DataIntegrationMode } from '@/resource/models/data'
import { h } from 'vue'

export const componentName = 'ScrollRankingBoard'
class RankBoardComponent extends BaseComponent {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.PROGERSS,
      name: name ? name : '排名板',
      id,
      width: 800,
      height: 400,
      icon,
      dataIntegrationMode: DataIntegrationMode.UNIVERSAL
    })
  }

  _prop: PropsType[] = [
    {
      label: '数据配置',
      prop: 'data',
      children: [
        {
          prop: 'maxValue',
          label: '最大值',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 150
          }
        },
        {
          prop: 'unit',
          label: '单位',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: ''
          }
        }
      ]
    },
    {
      label: '进度条配置',
      prop: 'bar',
      children: [
        {
          prop: 'color1',
          label: '颜色1',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#3DE7C9'
          }
        },
        {
          prop: 'color2',
          label: '颜色2',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#00BAFF'
          }
        },
        {
          prop: 'barHeight',
          label: '边框宽度',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 20,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          prop: 'borderRadius',
          label: '圆角',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 10,
            suffix: () => h('span', {}, 'px')
          }
        }
      ]
    },
    {
      label: '线条配置',
      prop: 'line',
      children: [
        {
          prop: 'lineColor',
          label: '颜色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#3DE7C9'
          }
        },
        {
          prop: 'borderGap',
          label: '边框间隔',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 3,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          prop: 'lineHeight',
          label: '线条宽度',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 5,
            suffix: () => h('span', {}, 'px')
          }
        }
      ]
    },
    {
      label: '文本配置',
      prop: 'text',
      children: [
        {
          prop: 'fontSize',
          label: '字体大小',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 15,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          prop: 'labelColor',
          label: '标题字体颜色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#3DE7C9'
          }
        },
        {
          prop: 'rankColor',
          label: '排名字体颜色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#3DE7C9'
          }
        },
        {
          prop: 'valueColor',
          label: '值字体颜色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#3DE7C9'
          }
        }
      ]
    }
  ]
  _style: PropsType[] = []
  get exampleData() {
    return [
      { label: '秦', value: Math.round(Math.random() * 100) },
      { label: '齐', value: Math.round(Math.random() * 100) },
      { label: '楚', value: Math.round(Math.random() * 100) },
      { label: '赵', value: Math.round(Math.random() * 100) },
      { label: '燕', value: Math.round(Math.random() * 100) },
      { label: '韩', value: Math.round(Math.random() * 100) },
      { label: '魏', value: Math.round(Math.random() * 100) }
    ]
  }
}

export default RankBoardComponent
