import { defineComponent } from 'vue'

import Rest from '@/apiView/content/rest'
import Static from '@/apiView/content/static'

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
        return <Rest mode="debug" />
      } else if (props.active == 'STATIC') {
        return <Static mode="debug" />
      }
    }
  }
})
