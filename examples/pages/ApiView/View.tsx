import Rest from 'open-data-v/apiView/rest/Rest.vue'
import Static from 'open-data-v/apiView/static/DataView.vue'
import { defineComponent } from 'vue'

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
