import { defineComponent, nextTick, ref, h } from 'vue'
import { NInput } from 'naive-ui'

export default defineComponent({
  components: {
    NInput
  },
  props: {
    value: [String],
    onUpdateValue: [Function, Array]
  },
  emits: ['updateValue'],
  setup (props, { emit }) {
    const isEdit = ref<boolean>(false)
    const inputRef = ref<HTMLInputElement|null>(null)
    const inputValue = ref<string|undefined>(props.value)

    const handleOnClick = () => {
      isEdit.value = true
      nextTick(() => {
        inputRef.value?.focus()
      })
    }
    function handleChange () {
      if (props.onUpdateValue) {
        emit('updateValue', inputValue.value)
      }
      isEdit.value = false
    }
    return () =>(
      <div onClick={handleOnClick}>
        {
          isEdit.value ? <NInput ref={inputRef} value={inputValue.value} onUpdateValue={(v) => inputValue.value = v} onChange={handleChange} onBlur={handleChange}/> : props.value
        }
      </div>
    )
  }
})