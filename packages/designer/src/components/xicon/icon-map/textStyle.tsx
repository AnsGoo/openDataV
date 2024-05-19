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
          <path d="M4 26h24v4H4z" fill="currentColor"></path>
          <path
            d="M26 14.54a1 1 0 0 0-.25-.69l-8.58-9.52A1.09 1.09 0 0 0 17 4.2V2h-2v3L4.32 14.74a1 1 0 0 0-.06 1.41l8.57 9.52a1 1 0 0 0 .69.33h.05a1 1 0 0 0 .68-.26L24 16.8V21a1 1 0 0 0 2 0v-6.43v-.03zm-12.35 9l-7.23-8L15 7.67V12h2V7.13l6.59 7.33z"
            fill="currentColor"
          ></path>
        </svg>
      )
    }
  }
})
