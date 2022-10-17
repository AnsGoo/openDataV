import { defineComponent } from 'vue'
import Rest from './rest'
import Static from './static'
export default defineComponent({
  props: {
    active: {
      type: String,
      default: 'REST'
    }
  },
  setup(props) {
    return () => {
      if (props.active == 'REST') {
        return <Rest />
      } else if (props.active == 'STATIC') {
        return <Static />
      }
    }
  }
})
