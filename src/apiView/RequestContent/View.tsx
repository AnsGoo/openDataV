import { defineComponent } from 'vue'
import GraphQL from './graphQL'
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
        return <Rest mode="debug" />
      } else if (props.active == 'STATIC') {
        return <Static mode="debug" />
      } else if (props.active == 'GRAPHQL') {
        return <GraphQL />
      }
    }
  }
})
