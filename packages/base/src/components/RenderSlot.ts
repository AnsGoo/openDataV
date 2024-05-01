import { defineComponent, h } from 'vue'

export default defineComponent({
  props: {
    slots: [Object, String]
  },
  // @ts-ignore
  setup(props) {
    console.log(props.slots)
    return () => [h('div', {}, props.slots)]
  }
})
