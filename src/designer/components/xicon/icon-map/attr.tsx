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
          <path d="M30 15H17V2h-2v13H2v2h13v13h2V17h13v-2z" fill="currentColor"></path>
          <path
            d="M5 30a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3zm0-4a1 1 0 1 0 1 1a1.001 1.001 0 0 0-1-1z"
            fill="currentColor"
          ></path>
          <path
            d="M8 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3zm0-4a1 1 0 1 0 1 1a1.001 1.001 0 0 0-1-1z"
            fill="currentColor"
          ></path>
          <path
            d="M22 13a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3zm0-4a1 1 0 1 0 1 1a1.001 1.001 0 0 0-1-1z"
            fill="currentColor"
          ></path>
          <circle cx="11" cy="11" r="2" fill="currentColor"></circle>
          <circle cx="11" cy="21" r="2" fill="currentColor"></circle>
          <circle cx="21" cy="21" r="2" fill="currentColor"></circle>
          <circle cx="22" cy="28" r="2" fill="currentColor"></circle>
          <circle cx="28" cy="24" r="2" fill="currentColor"></circle>
          <circle cx="4" cy="11" r="2" fill="currentColor"></circle>
          <circle cx="28" cy="4" r="2" fill="currentColor"></circle>
        </svg>
      )
    }
  }
})
