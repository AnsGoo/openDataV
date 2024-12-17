import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpandMore',
  setup(_props: { color?: string }) {
    return () => {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
        >
          <path d="M16.59 8.59L12 13.17L7.41 8.59L6 10l6 6l6-6z" fill="currentColor"></path>
        </svg>
      )
    }
  }
})
