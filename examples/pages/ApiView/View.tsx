import { RestContent } from 'open-data-v/data/rest'
import { StaticContent } from 'open-data-v/data/static'
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
        return <RestContent mode="debug" />
      } else if (props.active == 'STATIC') {
        return <StaticContent mode="debug" />
      }
    }
  }
})
