import type { IContainerItem } from '@open-data-v/base'
import { buildModeValue } from '@open-data-v/base'
import { cloneDeep } from 'lodash-es'
import type { PropType } from 'vue'
import { defineComponent, reactive, watch } from 'vue'

import { Container } from '../modules'
import { useCanvasState } from '../state'

function createAttrComponent(structOption: IContainerItem[]) {
  const attrKeys = [...structOption]
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
        const component = canvasState.getComponentById(props.componentId!)
        if (!component) {
          return
        }
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
