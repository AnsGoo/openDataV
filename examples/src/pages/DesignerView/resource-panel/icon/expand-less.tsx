import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpandLess',
  setup(_props: { color?: string }) {
    return () => {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
        >
          <path d="M12 8l-6 6l1.41 1.41L12 10.83l4.59 4.58L18 14z" fill="currentColor"></path>
        </svg>
      )
    }
  }
})
