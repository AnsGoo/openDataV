import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'

export const componentName = 'ScrollTable'
class ScrollTableComponent extends BaseComponent {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.TABLE,
      name: name ? name : '滚动表格',
      id,
      width: 400,
      height: 100,
      icon
    })
  }

  _prop: PropsType[] = [
    {
      label: '表头',
      prop: 'header',
      children: [
        {
          prop: 'column',
          label: '列数据',
          type: FormType.CUSTOM,
          showLabel: false,
          componentOptions: {
            componentType: 'ScrollTableForm',
            defaultValue: [
              { name: '列1', width: '100', align: 'center' },
              { name: '列2', width: '100', align: 'center' },
              { name: '列3', width: '100', align: 'center' }
            ]
          }
        },
        {
          prop: 'headerBGC',
          label: '背景色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#00BAFF'
          }
        },
        {
          prop: 'headerHeight',
          label: '高度',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 35
          }
        },
        {
          prop: 'index',
          label: '是否显示索引',
          type: FormType.SWITCH,
          componentOptions: {
            defaultValue: false
          }
        },
        {
          prop: 'indexHeader',
          label: '索引显示',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: '#'
          }
        }
      ]
    },
    {
      label: '行设置',
      prop: 'rows',
      children: [
        {
          prop: 'rowNum',
          label: '最大显示行',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 5
          }
        },
        {
          prop: 'oddRowBGC',
          label: '奇数行背景色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#003B51'
          }
        },
        {
          prop: 'evenRowBGC',
          label: '偶数行背景色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#0A2732'
          }
        },
        {
          prop: 'height',
          label: '行高度',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 20
          }
        }
      ]
    },
    {
      label: '列设置',
      prop: 'columns',
      children: [
        {
          prop: 'columnWidth',
          label: '每列宽度',
          type: FormType.ARRAY,
          componentOptions: {
            defaultValue: []
          }
        },
        {
          prop: 'align',
          label: '对齐方式',
          type: FormType.ARRAY,
          componentOptions: {
            defaultValue: []
          }
        }
      ]
    }
  ]
}

export default ScrollTableComponent
