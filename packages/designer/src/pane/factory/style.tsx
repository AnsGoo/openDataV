import type { MetaContainerItem } from '@open-data-v/base'
import { buildModeValue, FormType } from '@open-data-v/base'
import type { PropType } from 'vue'
import { defineComponent, h, reactive } from 'vue'

import { Container } from '../../modules'
import { useCanvasState } from '../../state'

export function createStyleComponent(structOption: MetaContainerItem[]) {
  const commonOption: MetaContainerItem = {
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

  const attrKeys = [commonOption, ...structOption]
  const propValue = {}
  buildModeValue(attrKeys, propValue)

  return defineComponent({
    props: {
      componentId: {
        type: Object as PropType<string>
      },
      value: {
        type: Object as PropType<any>
      }
    },
    emits: ['change', 'update:value'],
    setup(props) {
      const canvasState = useCanvasState()
      const changed = (keys: Array<string>, value: any) => {
        const component = canvasState.getComponentById(props.componentId!)
        if (!component) {
          return
        }
        const groupStyleKeys = ['gtop', 'gleft', 'gweight', 'gheight', 'grotate']
        if (
          keys.length === 2 &&
          keys[0] === 'position' &&
          component.groupStyle &&
          groupStyleKeys.includes(keys[1])
        ) {
          component.groupStyle[keys[1]] = value
        } else {
          component.changeStyle(keys, value)
        }
      }

      const modelValue = reactive(propValue)
      return () => <Container config={attrKeys} onChange={changed} data={modelValue} />
    }
  })
}

export default createStyleComponent
