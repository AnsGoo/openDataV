import type { IContainerItem } from '@open-data-v/base'
import { FormType } from '@open-data-v/base'
import { createAttrComponent } from '@open-data-v/designer'

const props: IContainerItem[] = [
  {
    label: '基础配置',
    prop: 'base',
    children: [
      {
        prop: 'colorLeft',
        label: '边框颜色1',
        type: FormType.COLOR,
        props: {
          defaultValue: '#1a98fc'
        }
      },
      {
        prop: 'colorRight',
        label: '边框颜色2',
        type: FormType.COLOR,
        props: {
          defaultValue: '#2cf7fe'
        }
      },
      {
        prop: 'backgroundColor',
        label: '底色',
        type: FormType.COLOR,
        props: {
          defaultValue: '#00000000'
        }
      }
    ]
  }
]
export default createAttrComponent(props)
