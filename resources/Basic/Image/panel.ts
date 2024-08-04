import { FormType } from '@open-data-v/base'
import { createAttrComponent, createStyleComponent } from '@open-data-v/designer'

const styleComponent = () =>
  createStyleComponent([
    {
      label: '背景设置',
      prop: 'back',
      children: [
        {
          prop: 'background',
          label: '背景',
          type: FormType.BACKGROUND,
          props: {
            defaultValue: { backgroundColor: '#14c9c9' }
          }
        }
      ]
    }
  ])
const attrsComponent = () => createAttrComponent([])

export { attrsComponent, styleComponent }
