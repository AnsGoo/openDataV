import type { MetaContainerItem } from '@open-data-v/base'
import { ComponentGroup, CustomComponent, FormType } from '@open-data-v/base'
import { h } from 'vue'

export const componentName = 'StaticText'
class StaticTextComponent extends CustomComponent {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.TEXT,
      name: name ? name : '静态文本',
      id,
      width: 150,
      height: 20,
      icon
    })
  }

  _prop: MetaContainerItem[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'type',
          label: '文本类型',
          type: FormType.SELECT,
          props: {
            defaultValue: 'text',
            options: [
              { value: 'text', label: '文本' },
              { value: 'symbol', label: '符号' }
            ]
          }
        },
        {
          prop: 'text',
          label: '自定义文本',
          type: FormType.TEXT,
          props: {
            defaultValue: 'OpenDataV'
          }
        }
      ]
    }
  ]
  _style: MetaContainerItem[] = [
    {
      label: '字体设置',
      prop: 'font',
      children: [
        {
          prop: 'color',
          label: '颜色',
          type: FormType.COLOR,
          props: {
            defaultValue: '#1E90FF'
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
          type: FormType.FONT_WEIGHT,
          props: {
            defaultValue: 200
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
}

export default StaticTextComponent
