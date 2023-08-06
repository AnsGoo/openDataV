import type { MetaContainerItem } from 'open-data-v/designer/type'
import { ComponentGroup, DataMode, FormType } from 'open-data-v/enum'
import { CustomComponent } from 'open-data-v/models'

export const componentName = 'Group'
class GroupComponent extends CustomComponent {
  show = false
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.CONTAINER,
      name: name ? name : '分组',
      id,
      width: 200,
      height: 200,
      dataMode: DataMode.UNIVERSAL
    })
  }

  _prop: MetaContainerItem[] = [
    {
      label: '数据配置',
      prop: 'dataOption',
      children: [
        {
          prop: 'channel',
          label: '发布通道',
          type: FormType.TEXT,
          props: {
            defaultValue: undefined
          }
        },
        {
          prop: 'isRegExp',
          label: '是否开启正则匹配',
          type: FormType.SWITCH,
          props: {
            defaultValue: false
          }
        }
      ]
    }
  ]
}

export default GroupComponent
