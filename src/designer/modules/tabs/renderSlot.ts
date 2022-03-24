import { defineComponent, h } from 'vue'
export default defineComponent({
  props: {
    slots: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    return () => [h('div', { props: props.slots.props }, props.slots)]
  }
})
