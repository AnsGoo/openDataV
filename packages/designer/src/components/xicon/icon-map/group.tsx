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
            d="M19 13V9H9v10h4v4h10V13zm-8-2h6v6h-6zm10 10h-6v-2h4v-4h2z"
            fill="currentColor"
          ></path>
          <path
            d="M30 8V2h-6v2H8V2H2v6h2v16H2v6h6v-2h16v2h6v-6h-2V8zm-4-4h2v2h-2zM4 4h2v2H4zm2 24H4v-2h2zm22 0h-2v-2h2zm-2-4h-2v2H8v-2H6V8h2V6h16v2h2z"
            fill="currentColor"
          ></path>
        </svg>
      )
    }
  }
})
