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
          <path d="M8 14h6v2H8z" fill="currentColor"></path>
          <path d="M8 6h12v2H8z" fill="currentColor"></path>
          <path d="M8 10h12v2H8z" fill="currentColor"></path>
          <path d="M8 24h6v2H8z" fill="currentColor"></path>
          <path
            d="M30 24v-2h-2.101a4.968 4.968 0 0 0-.732-1.753l1.49-1.49l-1.414-1.414l-1.49 1.49A4.968 4.968 0 0 0 24 18.101V16h-2v2.101a4.968 4.968 0 0 0-1.753.732l-1.49-1.49l-1.414 1.414l1.49 1.49A4.968 4.968 0 0 0 18.101 22H16v2h2.101a4.968 4.968 0 0 0 .732 1.753l-1.49 1.49l1.414 1.414l1.49-1.49a4.968 4.968 0 0 0 1.753.732V30h2v-2.101a4.968 4.968 0 0 0 1.753-.732l1.49 1.49l1.414-1.414l-1.49-1.49A4.968 4.968 0 0 0 27.899 24zm-7 2a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z"
            fill="currentColor"
          ></path>
          <path
            d="M14 30H6a2.002 2.002 0 0 1-2-2V4a2.002 2.002 0 0 1 2-2h16a2.002 2.002 0 0 1 2 2v10h-2V4H6v24h8z"
            fill="currentColor"
          ></path>
        </svg>
      )
    }
  }
})
