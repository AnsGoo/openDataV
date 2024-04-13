import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Icon',
  setup(_props: { color?: string }) {
    return () => {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
        >
          <path d="M19 19H5V5h9V3H3v18h18V10h-2z" fill="currentColor"></path>
          <path
            d="M11 7h2v10h-2zm4 6h2v4h-2zm-8-3h2v7H7zm12-5V3h-2v2h-2v2h2v2h2V7h2V5z"
            fill="currentColor"
          ></path>
        </svg>
      )
    }
  }
})
