import { defineComponent } from 'vue'
import GraphQL from './graphQL'
import Rest from './rest'
export default defineComponent({
  props: {
    active: {
      type: String,
      default: 'REST'
    }
  },
  setup(props) {
    return () => <>{props.active == 'REST' ? <Rest /> : <GraphQL />}</>
  }
})
