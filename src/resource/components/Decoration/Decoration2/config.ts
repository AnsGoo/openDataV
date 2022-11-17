import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'
import { h } from 'vue'

export const componentName = 'Decoration2'
class DecorationComponent extends BaseComponent {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.DECORATION,
      name: name ? name : '2#装饰',
      id,
      width: 200,
      height: 60
    })
  }

  _prop: PropsType[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'color1',
          label: '颜色1',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#6586ec80'
          }
        },
        {
          prop: 'color2',
          label: '颜色2',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#2cf7fe80'
          }
        },
        {
          prop: 'text',
          label: '文本',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: 'OpenDataV'
          }
        }
      ]
    }
  ]
  _style: PropsType[] = [
    {
      label: '字体设置',
      prop: 'font',
      children: [
        {
          prop: 'color',
          label: '颜色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#1E90FF'
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
            defaultValue: 200
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
}

export default DecorationComponent
