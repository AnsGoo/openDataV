import { defineComponent, h } from 'vue'

export default defineComponent({
  props: {
    slots: [Object, String]
  },
  // @ts-ignore
  setup(props) {
    return () => [h('template', {}, props.slots)]
  }
})
