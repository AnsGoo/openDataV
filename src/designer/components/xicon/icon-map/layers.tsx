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
            d="M16 24a.997.997 0 0 1-.474-.12l-13-7l.948-1.76L16 21.864l12.526-6.744l.948 1.76l-13 7A.997.997 0 0 1 16 24z"
            fill="currentColor"
          ></path>
          <path
            d="M16 30a.997.997 0 0 1-.474-.12l-13-7l.948-1.76L16 27.864l12.526-6.744l.948 1.76l-13 7A.997.997 0 0 1 16 30z"
            fill="currentColor"
          ></path>
          <path
            d="M16 18a.997.997 0 0 1-.474-.12l-13-7a1 1 0 0 1 0-1.76l13-7a.998.998 0 0 1 .948 0l13 7a1 1 0 0 1 0 1.76l-13 7A.997.997 0 0 1 16 18zM5.11 10L16 15.864L26.89 10L16 4.136z"
            fill="currentColor"
          ></path>
        </svg>
      )
    }
  }
})
