import type { MetaContainerItem } from '@open-data-v/base'
import { buildModeValue, FormType } from '@open-data-v/base'
import { cloneDeep, debounce } from 'lodash-es'
import type { PropType } from 'vue'
import { defineComponent, h, reactive, watch } from 'vue'

import { Container } from '../../../modules'
import { useCanvasState } from '../../../state'

export function createStyleComponent(structOption: MetaContainerItem[]) {
  const commonOption: MetaContainerItem[] = [
    {
      label: '组件信息',
      prop: 'info',
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
    },
    {
      label: '位置大小',
      prop: 'position',
      children: [
        {
          label: '左边距',
          prop: 'left',
          type: FormType.NUMBER,
          props: {
            defaultValue: 0,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          label: '上边距',
          prop: 'top',
          type: FormType.NUMBER,
          props: {
            defaultValue: 0,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          label: '宽度',
          prop: 'width',
          type: FormType.NUMBER,
          props: {
            defaultValue: 0,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          label: '高度',
          prop: 'height',
          type: FormType.NUMBER,
          props: {
            defaultValue: 0,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          label: '旋转角度',
          prop: 'rotate',
          type: FormType.NUMBER,
          props: {
            defaultValue: 0,
            suffix: () => h('span', {}, '°')
          }
        }
      ]
    }
  ]

  const attrKeys = [...commonOption, ...structOption]
  const propValue = {}
  buildModeValue(attrKeys, propValue)

  return defineComponent({
    props: {
      componentId: {
        type: String as PropType<string>,
        required: false
      },
      value: {
        type: Object as PropType<any>
      }
    },
    emits: ['change', 'update:value'],
    setup(props) {
      const canvasState = useCanvasState()
      const modelValue = reactive(cloneDeep(propValue))
      const changed = debounce((keys: Array<string>, value: any) => {
        const component = canvasState.getComponentById(props.componentId!)
        if (!component) {
          return
        }
        if (keys.length === 2 && keys[0] === 'info') {
          component.name = value
          return
        }
        const locationKeys = ['top', 'left', 'width', 'height', 'rotate']
        if (keys.length === 2 && keys[0] === 'position' && locationKeys.includes(keys[1])) {
          const parentComponent = component.parent
          // key as 'top' | 'left' | 'width' | 'height' | 'rotate'
          canvasState.syncComponentLocation({ [keys[1]]: value as number }, parentComponent, true)
          if (parentComponent) {
            canvasState.resizeAutoComponent(parentComponent)
          }
        }
      }, 300)

      watch(
        () => props.componentId,
        () => {
          const component = canvasState.getComponentById(props.componentId!)
          if (!component) {
            return
          }
          console.log(component.style)

          Object.assign(modelValue, cloneDeep(propValue))
          Object.assign(modelValue, component.style)
        },
        {
          immediate: true
        }
      )

      return () => <Container config={attrKeys} onChange={changed} data={modelValue} />
    }
  })
}

export default createStyleComponent
