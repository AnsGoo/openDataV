import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'
import { h } from 'vue'

export const componentName = 'Tabs'
class TabsComponent extends BaseComponent {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.CONTAINER,
      name: name ? name : '标签页',
      id,
      width: 400,
      height: 200
    })
  }

  _prop: PropsType[] = [
    {
      label: '标签配置',
      prop: 'label',
      children: [
        {
          prop: 'mode',
          label: '模式',
          type: FormType.SELECT,
          componentOptions: {
            defaultValue: 'horizontal',
            options: [
              {
                label: '垂直',
                value: 'vertical'
              },
              {
                label: '水平',
                value: 'horizontal'
              }
            ]
          }
        },
        {
          prop: 'items',
          label: '标签',
          type: FormType.ARRAY,
          componentOptions: {
            type: 'dynamic',
            defaultValue: ['标签1', '标签2'],
            minItem: 1
          }
        }
      ]
    },
    {
      label: '样式配置',
      prop: 'style',
      children: [
        {
          prop: 'height',
          label: '高度',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 45,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          prop: 'color',
          label: '颜色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#03A6E0CC'
          }
        },
        {
          prop: 'fontSize',
          label: '字体大小',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 20,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          prop: 'fontWeight',
          label: '字体宽度',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 800
          }
        },
        {
          prop: 'fontFamily',
          label: '字体',
          type: FormType.FONT_STYLE,
          componentOptions: {
            defaultValue: 'Arial'
          }
        }
      ]
    }
  ]
  _style: PropsType[] = []
}

export default TabsComponent
