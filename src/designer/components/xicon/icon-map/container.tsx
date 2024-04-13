
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Icon',
  setup() {
    return () => {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32 32"
        >
          <path d="M28 12h-8V4h8zm-6-2h4V6h-4z" fill="currentColor"></path>
          <path
            d="M17 15V9H9v14h14v-8zm-6-4h4v4h-4zm4 10h-4v-4h4zm6 0h-4v-4h4z"
            fill="currentColor"
          ></path>
          <path
            d="M26 28H6a2.002 2.002 0 0 1-2-2V6a2.002 2.002 0 0 1 2-2h10v2H6v20h20V16h2v10a2.002 2.002 0 0 1-2 2z"
            fill="currentColor"
          ></path>
        </svg>
      )
    }
  }
})
