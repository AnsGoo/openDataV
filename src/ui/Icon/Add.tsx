import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Add',
  setup() {
    return () => {
      return (
        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M256 112V400M400 256H112"
            stroke="currentColor"
            stroke-width="32"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      )
    }
  }
})
