import { ODescriptions, ODescriptionsItem, OEmpty } from 'open-data-v/ui'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

const Empty = defineComponent({
  components: {
    ODescriptions,
    ODescriptionsItem,
    OEmpty
  },
  props: {
    desc: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup(props) {
    return () => (
      <ODescriptions class="placeholder">
        <ODescriptionsItem>
          <OEmpty description={props.desc} />
        </ODescriptionsItem>
      </ODescriptions>
    )
  }
})

const useEmpty = (desc) => {
  return <Empty desc={desc} />
}
export default useEmpty
