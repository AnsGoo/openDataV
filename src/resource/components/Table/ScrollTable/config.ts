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
            defaultValue: []
          }
        }
      ]
    }
  ]
}

export default ScrollTableComponent
