import type { MetaContainerItem } from '@open-data-v/base'
import { buildModeValue, FormType } from '@open-data-v/base'
import type { PropType } from 'vue'
import { defineComponent, reactive, watch } from 'vue'
import { cloneDeep } from 'lodash-es'

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
  const propValue: Record<string, any> = {}
  buildModeValue(attrKeys, propValue)

  return defineComponent({
    props: {
      componentId: {
        type: String as PropType<string>
      },
      value: {
        type: Object as PropType<any>,
        default: () => propValue
      }
    },
    emits: ['change'],
    setup(props, { emit }) {
      const canvasState = useCanvasState()
      const modelValue = reactive(cloneDeep(propValue))
      const changed = (keys: Array<string>, val: any) => {
        debugger
        const component = canvasState.getComponentById(props.componentId!)
        // console.log(props.componentId)
        if (!component) {
          return
        }
        debugger
        component.changeProp(keys, val, modelValue)
        emit('change', modelValue)
      }

      watch(
        () => props.componentId,
        () => {
          const component = canvasState.getComponentById(props.componentId!)
          if (!component) {
            return
          }
          Object.assign(modelValue, cloneDeep(propValue))
          modelValue.common.id = component.id
          modelValue.common.name = component.name
          modelValue.common.component = component.component
          Object.assign(modelValue, component.propValue)
        },
        {
          immediate: true
        }
      )
      return () => <Container config={attrKeys} onChange={changed} data={modelValue} />
    }
  })
}

export default createAttrComponent
