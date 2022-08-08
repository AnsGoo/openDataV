import { defineComponent, h } from 'vue'
import type { PropType, ConcreteComponent, VNodeProps } from 'vue'
export default defineComponent({
  props: {
    args: {
      type: Object as PropType<VNodeProps>,
      default: () => {}
    },
    component: {
      type: Object as PropType<ConcreteComponent | string>,
      default: () => {}
    }
  },
  setup(props) {
    return () => [h(props.component, props.args)]
  }
})
