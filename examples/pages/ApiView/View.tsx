import { defineComponent } from 'vue'

import StaticContent from '@/data/Quick/Content.vue'
import RestContent from '@/data/Rest/DynamicExtendContent.vue'

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
        return <RestContent mode="debug" />
      } else if (props.active == 'STATIC') {
        return <StaticContent mode="debug" />
      }
    }
  }
})
