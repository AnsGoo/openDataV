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
          prop: 'header',
          label: '列标题',
          type: FormType.ARRAY,
          componentOptions: {
            defaultValue: ['名称', '年龄'],
            type: 'dynamic',
            max: 10
          }
        },
        {
          prop: 'headerBGC',
          label: '背景色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: ''
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
    },
    {
      label: '自定义',
      prop: 'custom',
      children: [
        {
          prop: 'column',
          label: '列数据',
          type: FormType.CUSTOM,
          componentOptions: {
            componentType: 'ScrollTableForm',
            defaultValue: [{ name: '姓名', width: '10' }]
          }
        }
      ]
    }
  ]
}

export default ScrollTableComponent
