import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    slots: [Object, String]
  },
  // @ts-ignore
  setup(props) {
    return () => <div>{props.slots}</div>
  }
})
