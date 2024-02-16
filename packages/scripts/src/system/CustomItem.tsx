import type { ConcreteComponent, PropType, VNodeProps } from 'vue'
import { defineComponent, h } from 'vue'

export default defineComponent({
  props: {
    args: {
      type: Object as PropType<VNodeProps>,
      default: () => {}
    },
    component: {
      type: Object as PropType<ConcreteComponent | string>,
      default: () => {}
    },
    value: {
      type: Object as PropType<any>
    }
  },
  emits: ['updateValue'],
  setup(props, { emit }) {
    const change = (value: any) => {
      emit('updateValue', value)
    }
    return () => [
      h(props.component, { args: props.args, value: props.value, onUpdateValue: change })
    ]
  }
})
