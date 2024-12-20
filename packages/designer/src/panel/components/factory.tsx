import type { CustomComponent, IContainerItem } from '@open-data-v/base'
import { buildModeValue } from '@open-data-v/base'
import { cloneDeep } from 'lodash-es'
import type { PropType } from 'vue'
import { defineComponent, reactive, watch } from 'vue'

import { Container } from '../../modules'

function createAttrComponent(structOption: IContainerItem[]) {
  const attrKeys = [...structOption]
  const propValue: Record<string, any> = {}
  buildModeValue(attrKeys, propValue)

  return defineComponent({
    props: {
      component: {
        type: Object as PropType<CustomComponent>
      },
      value: {
        type: Object as PropType<any>,
        default: () => propValue
      }
    },
    emits: ['change', 'update:value'],
    setup(props, { emit }) {
      const modelValue = reactive(cloneDeep(propValue))
      const changed = (keys: Array<string>, val: any) => {
        const component = props.component
        if (!component) {
          return
        }
        component.changeProp(keys, val, modelValue)
        emit('change', modelValue)
        emit('update:value', modelValue)
      }

      watch(
        () => props.component,
        (component) => {
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
