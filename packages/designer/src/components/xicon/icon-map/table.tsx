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
          <path
            d="M12 29H5a2.002 2.002 0 0 1-2-2v-7a2.002 2.002 0 0 1 2-2h7a2.002 2.002 0 0 1 2 2v7a2.002 2.002 0 0 1-2 2zm-7-9v7h7v-7z"
            fill="currentColor"
          ></path>
          <path
            d="M27 3H5a2 2 0 0 0-2 2v10h2v-4h10v4h2v-4h10v7H17v2h10v7H17v2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 6H5V5h22z"
            fill="currentColor"
          ></path>
        </svg>
      )
    }
  }
})
