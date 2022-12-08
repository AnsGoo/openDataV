import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'
import { h } from 'vue'

export const componentName = 'DateText'
class DateTextComponent extends BaseComponent {
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

  _prop: PropsType[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'format',
          label: '格式',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: 'YYYY-MM-DD HH:mm:ss'
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
            defaultValue: 'skyblue'
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
          type: FormType.FONT_WEIGHT,
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

export default DateTextComponent
