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
            d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2zm0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12z"
            fill="currentColor"
          ></path>
          <path d="M16 10a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path>
        </svg>
      )
    }
  }
})
