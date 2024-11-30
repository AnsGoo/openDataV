import type { MetaContainerItem } from '@open-data-v/base'
import { FormType } from '@open-data-v/base'

import { createAttrComponent } from '../../index'

const props: MetaContainerItem[] = [
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
export default createAttrComponent(props)
