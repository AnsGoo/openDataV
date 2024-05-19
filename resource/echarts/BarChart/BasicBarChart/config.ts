import type { MetaContainerItem } from '@open-data-v/base'
import { ComponentGroup, CustomComponent, DataMode, FormType } from '@open-data-v/base'

export const componentName = 'BasicBarChart'
class BasicBarChartComponent extends CustomComponent {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.BAR,
      name: name ? name : '基础柱状图',
      id,
      width: 500,
      height: 170,
      icon,
      dataMode: DataMode.UNIVERSAL
    })
  }

  _prop: MetaContainerItem[] = [
    {
      label: '数据配置',
      prop: 'data',
      children: [
        {
          prop: 'upperLimit',
          label: '上限',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 150
          }
        },
        {
          prop: 'lowerLimit',
          label: '下限',
          type: FormType.NUMBER,
          props: {
            defaultValue: 0
          }
        },
        {
          prop: 'max',
          label: '最大值',
          type: FormType.TEXT,
          props: {
            defaultValue: 'dataMax'
          }
        },
        {
          prop: 'min',
          label: '最小值',
          type: FormType.TEXT,
          props: {
            defaultValue: '0'
          }
        },
        {
          prop: 'maxOffset',
          label: '最大偏移值',
          type: FormType.NUMBER,
          props: {
            defaultValue: 0
          }
        },
        {
          prop: 'minOffset',
          label: '最小偏移值',
          type: FormType.NUMBER,
          props: {
            defaultValue: 0
          }
        }
      ]
    },
    {
      label: '标签配置',
      prop: 'label',
      children: [
        {
          prop: 'axisLabelColor',
          label: 'label颜色',
          type: FormType.COLOR,
          props: {
            defaultValue: '#3DE7C9'
          }
        },
        {
          prop: 'axisColor',
          label: '颜色1',
          type: FormType.COLOR,
          props: {
            defaultValue: '#3DE7C9'
          }
        }
      ]
    },
    {
      label: '坐标轴配置',
      prop: 'axis',
      children: [
        {
          prop: 'axisColor',
          label: '轴线颜色',
          type: FormType.COLOR,
          props: {
            defaultValue: '#00BAFF'
          }
        },
        {
          prop: 'axisLabelColor',
          label: '轴线文字颜色',
          type: FormType.COLOR,
          props: {
            defaultValue: '#00BAFF'
          }
        },
        {
          prop: 'xshow',
          label: 'X网格线是否显示',
          type: FormType.SWITCH,
          props: {
            defaultValue: true
          }
        },
        {
          prop: 'yshow',
          label: 'Y网格线是否显示',
          type: FormType.SWITCH,
          props: {
            defaultValue: true
          }
        },
        {
          prop: 'xLineType',
          label: 'X轴网格线样式',
          type: FormType.SELECT,
          props: {
            defaultValue: 'dotted',
            options: [
              { value: 'solid', label: 'solid' },
              { value: 'dotted', label: 'dotted' },
              { value: 'dashed', label: 'dashed' }
            ]
          }
        },
        {
          prop: 'yLineType',
          label: 'Y轴网格线样式',
          type: FormType.SELECT,
          props: {
            defaultValue: 'dotted',
            options: [
              { value: 'solid', label: 'solid' },
              { value: 'dotted', label: 'dotted' },
              { value: 'dashed', label: 'dashed' }
            ]
          }
        },
        {
          prop: 'xAxisLineColor',
          label: 'x轴网格线颜色',
          type: FormType.COLOR,
          props: {
            defaultValue: '#3391E4'
          }
        },
        {
          prop: 'yAxisLineColor',
          label: 'y轴网格线颜色',
          type: FormType.COLOR,
          props: {
            defaultValue: '#3391E4'
          }
        }
      ]
    },
    {
      label: '测试',
      prop: 'test',
      children: [
        {
          prop: 'axisColor',
          label: '轴线颜色',
          type: FormType.COLOR,
          props: {
            defaultValue: '#00BAFF'
          }
        },
        {
          prop: 'axisLabelColor',
          label: '轴线文字颜色',
          type: FormType.MODAL,
          children: [
            {
              prop: 'axisColor23',
              label: '轴线颜色',
              type: FormType.COLOR,
              props: {
                defaultValue: '#00BAFF'
              }
            },
            {
              prop: 'axisLabelColor',
              label: '颜色1',
              type: FormType.COLOR,
              props: {
                defaultValue: '#3DE7C9'
              }
            }
          ],
          props: {
            buttonText: '测试',
            defaultValue: ''
          }
        }
      ]
    }
  ]
  _style: MetaContainerItem[] = []
  get exampleData(): any {
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

export default BasicBarChartComponent
