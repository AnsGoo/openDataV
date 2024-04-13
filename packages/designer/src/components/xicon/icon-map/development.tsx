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
          <path d="M8 4v4H4V4h4M2 2v8h8V2z" fill="currentColor"></path>
          <path d="M18 7v4h-4V7h4m-6-2v8h8V5z" fill="currentColor"></path>
          <path d="M8 16v4H4v-4h4m-6-2v8h8v-8z" fill="currentColor"></path>
          <path
            d="M22 10v6h-6v6h-6v8h20V10zm-4 8h4v4h-4zm-2 10h-4v-4h4zm6 0h-4v-4h4zm6 0h-4v-4h4zm0-6h-4v-4h4zm-4-6v-4h4v4z"
            fill="currentColor"
          ></path>
        </svg>
      )
    }
  }
})
