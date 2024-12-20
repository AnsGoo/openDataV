import type { CustomComponent, IContainerItem } from '@open-data-v/base'
import { buildModeValue, ContainerType, FormType } from '@open-data-v/base'
import { cloneDeep, debounce } from 'lodash-es'
import type { PropType } from 'vue'
import { defineComponent, h, inject, reactive, watch } from 'vue'

import { PANEL_MODEL } from '../../const'
import { Container } from '../../modules'
import { useCanvasState } from '../../state'

function createStyleComponent() {
  const commonOption: IContainerItem[] = [
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

  const attrKeys = commonOption
  const propValue = {}
  buildModeValue(attrKeys, propValue)

  return defineComponent({
    props: {
      curComponent: {
        type: Object as PropType<CustomComponent>,
        required: false
      },
      value: {
        type: Object as PropType<any>
      }
    },
    emits: ['change', 'update:value'],
    setup(props) {
      const mode = inject<ContainerType>(PANEL_MODEL, ContainerType.FORM)
      const canvasState = useCanvasState()
      const modelValue = reactive(cloneDeep(propValue))
      const changed = debounce((keys: Array<string>, value: any) => {
        const component = props.curComponent
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
        () => props.curComponent,
        (component) => {
          if (!component) {
            return
          }

          Object.assign(modelValue, {
            info: {
              id: component.id,
              component: component.component,
              name: component.name
            },
            position: component.position
          })
        },
        {
          immediate: true
        }
      )

      return () => <Container config={attrKeys} onChange={changed} data={modelValue} mode={mode} />
    }
  })
}

export default createStyleComponent
