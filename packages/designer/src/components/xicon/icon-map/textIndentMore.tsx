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
          <path d="M20 6h10v2H20z" fill="currentColor"></path>
          <path d="M20 12h7v2h-7z" fill="currentColor"></path>
          <path d="M20 18h10v2H20z" fill="currentColor"></path>
          <path d="M20 24h7v2h-7z" fill="currentColor"></path>
          <path d="M14 4h2v24h-2z" fill="currentColor"></path>
          <path
            d="M3.85 22.5l-1.41-1.38L8.73 15L2.44 8.88L3.85 7.5l7.71 7.5l-7.71 7.5z"
            fill="currentColor"
          ></path>
        </svg>
      )
    }
  }
})
