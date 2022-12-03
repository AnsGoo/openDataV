import { shallowRef, h } from 'vue'
import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'
import ScrollTableForm from './Form.vue'
import { DataIntegrationMode } from '@/resource/models/data'

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
      icon,
      dataIntegrationMode: DataIntegrationMode.UNIVERSAL
    })
  }

  _prop: PropsType[] = [
    {
      label: '表头',
      prop: 'header',
      children: [
        {
          prop: 'header',
          label: '表头数据',
          type: FormType.ARRAY,
          componentOptions: {
            type: 'dynamic',
            defaultValue: ['姓名', '年龄', '性别']
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
            defaultValue: 35,
            suffix: () => h('span', {}, 'px')
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
          prop: 'data',
          label: '行配置',
          type: FormType.CUSTOM,
          showLabel: false,
          componentOptions: {
            componentType: shallowRef(ScrollTableForm),
            defaultValue: {
              height: 30,
              oddRowBGC: '#003B51',
              evenRowBGC: '#0A2732'
            }
          }
        }
      ]
    }
  ]

  get exampleData() {
    return [
      {
        name: '张三',
        age: 23,
        sex: '男'
      },
      {
        name: '张三',
        age: 23,
        sex: '男'
      },
      {
        name: '张三',
        age: 23,
        sex: '男'
      },
      {
        name: '张三',
        age: 23,
        sex: '男'
      },
      {
        name: '张三',
        age: 23,
        sex: '男'
      }
    ]
  }
}

export default ScrollTableComponent
