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
            d="M28 2h-8a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2h8a2.002 2.002 0 0 0 2-2V4a2.002 2.002 0 0 0-2-2zm0 2v7h-8V4zm0 9v6h-8v-6zm-8 15v-7h8v7z"
            fill="currentColor"
          ></path>
          <path d="M12 15h-2v-2H8v2H6v2h2v2h2v-2h2v-2z" fill="currentColor"></path>
          <path
            d="M16 6V4h-6a2.002 2.002 0 0 0-2 2v3.08a6.99 6.99 0 0 0 0 13.84V26a2.002 2.002 0 0 0 2 2h6v-2h-6v-3.08a6.99 6.99 0 0 0 0-13.84V6zm-2 10a5 5 0 1 1-5-5a5.006 5.006 0 0 1 5 5z"
            fill="currentColor"
          ></path>
        </svg>
      )
    }
  }
})
