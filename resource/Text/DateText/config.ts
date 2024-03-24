import type { MetaContainerItem } from '@open-data-v/base'
import { ComponentGroup, CustomComponent, FormType } from '@open-data-v/base'
import { h } from 'vue'

export const componentName = 'DateText'
class DateTextComponent extends CustomComponent {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.TEXT,
      name: name ? name : '时间文本',
      id,
      width: 200,
      height: 50
    })
  }

  _prop: MetaContainerItem[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'format',
          label: '格式',
          type: FormType.TEXT,
          props: {
            defaultValue: 'YYYY-MM-DD HH:mm:ss'
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
            defaultValue: 'skyblue'
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

export default DateTextComponent
