<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'TabPane',
  props: {
    label: String,
    name: String,
    disabled: Boolean,
    closable: Boolean
  },
  setup(props, { slots }) {
    const childrenList: any = inject('OChildrenList')
    childrenList && childrenList(Object.assign({}, props, { slots: slots }))
  },
  render() {
    return null
  }
})
</script>
