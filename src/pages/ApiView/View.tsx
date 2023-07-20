import { defineComponent } from 'vue'

import Rest from '@/apiView/rest/Rest.vue'
import Static from '@/apiView/static/DataView.vue'

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
