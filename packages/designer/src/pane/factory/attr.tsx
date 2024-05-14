import type { MetaContainerItem } from '@open-data-v/base'
import { buildModeValue, FormType } from '@open-data-v/base'
import type { PropType } from 'vue'
import { defineComponent, reactive } from 'vue'

import { Container } from '../../modules'
import { useCanvasState } from '../../state'

export function createAttrComponent(structOption: MetaContainerItem[]) {
  const commonOption: MetaContainerItem = {
    label: '公共属性',
    prop: 'common',
    children: [
      {
        label: '名称',
        prop: 'name',
        type: FormType.TEXT,
        props: {
          defaultValue: ''
        }
      },
      {
        label: '组件',
        prop: 'component',
        type: FormType.TEXT,
        props: {
          defaultValue: '',
          editable: false
        }
      },
      {
        label: '组件ID',
        prop: 'id',
        type: FormType.TEXT,
        props: {
          defaultValue: '',
          editable: false
        }
      }
    ]
  }

  const attrKeys = [commonOption, ...structOption]
  const propValue = {}
  buildModeValue(attrKeys, propValue)

  return defineComponent({
    props: {
      componentId: {
        type: Object as PropType<string>
      },
      value: {
        type: Object as PropType<any>,
        default: () => propValue
      }
    },
    emits: ['change'],
    setup(props, { emit }) {
      const canvasState = useCanvasState()
      const changed = (keys: Array<string>, val: any) => {
        const component = canvasState.getComponentById(props.componentId!)
        if (!component) {
          return
        }
        component.changeProp(keys, val)
        emit('change', modelValue)
      }

      const modelValue = reactive(propValue)
      return () => <Container config={attrKeys} onChange={changed} data={modelValue} />
    }
  })
}

export default createAttrComponent
