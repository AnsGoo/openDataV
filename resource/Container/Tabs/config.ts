import type { MetaContainerItem } from '@open-data-v/base'
import { ComponentGroup, CustomComponent, FormType } from '@open-data-v/base'
import { h } from 'vue'

export const componentName = 'Tabs'
class TabsComponent extends CustomComponent {
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

  _prop: MetaContainerItem[] = [
    {
      label: '标签配置',
      prop: 'label',
      children: [
        {
          prop: 'mode',
          label: '模式',
          type: FormType.SELECT,
          props: {
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
          props: {
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
          props: {
            defaultValue: 45,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          prop: 'color',
          label: '颜色',
          type: FormType.COLOR,
          props: {
            defaultValue: '#03A6E0CC'
          }
        },
        {
          prop: 'fontSize',
          label: '字体大小',
          type: FormType.NUMBER,
          props: {
            defaultValue: 20,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          prop: 'fontWeight',
          label: '字体宽度',
          type: FormType.NUMBER,
          props: {
            defaultValue: 800
          }
        },
        {
          prop: 'fontFamily',
          label: '字体',
          type: FormType.FONT_STYLE,
          props: {
            defaultValue: 'Arial'
          }
        }
      ]
    }
  ]
  _style: MetaContainerItem[] = []
}

export default TabsComponent
