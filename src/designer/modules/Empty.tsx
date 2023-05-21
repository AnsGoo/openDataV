import { NDescriptions, NDescriptionsItem, NEmpty } from 'naive-ui'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

const Empty = defineComponent({
  components: {
    NDescriptions,
    NDescriptionsItem,
    NEmpty
  },
  props: {
    desc: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup(props) {
    return () => (
      <NDescriptions class="placeholder">
        <NDescriptionsItem>
          <NEmpty description={props.desc} />
        </NDescriptionsItem>
      </NDescriptions>
    )
  }
})

const useEmpty = (desc) => {
  return <Empty desc={desc} />
}
export default useEmpty
