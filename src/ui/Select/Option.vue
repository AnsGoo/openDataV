<script lang="ts">
import { defineComponent, inject, onMounted } from 'vue'

export default defineComponent({
  props: {
    value: String,
    label: String,
    disabled: Boolean
  },
  setup(props) {
    const getChildOption: any = inject(`OGetChildOption`, '')
    onMounted(() => {
      getChildOption &&
        getChildOption({
          label: props.label,
          value: props.value,
          disabled: props.disabled
        })
    })
  },
  render() {
    return null
  }
})
</script>
