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
            d="M18.83 26l2.58-2.58L20 22l-4 4l4 4l1.42-1.41L18.83 26z"
            fill="currentColor"
          ></path>
          <path
            d="M27.17 26l-2.58 2.58L26 30l4-4l-4-4l-1.42 1.41L27.17 26z"
            fill="currentColor"
          ></path>
          <path
            d="M14 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6v6h2v-8a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h6zm4-23.6l5.6 5.6H18z"
            fill="currentColor"
          ></path>
        </svg>
      )
    }
  }
})
