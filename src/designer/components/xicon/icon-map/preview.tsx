
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Icon',
    setup(props:{color: string}) {
    return () => {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32 32"
        >
          <path
            d="M22.996 30H9.004a1.002 1.002 0 0 1-.821-1.577l6.998-9.996a1 1 0 0 1 1.638 0l6.998 9.996a1.002 1.002 0 0 1-.82 1.577zM10.92 28h10.16L16 20.744z"
            fill="currentColor"
          ></path>
          <path
            d="M28 24h-4v-2h4V6H4v16h4v2H4a2.002 2.002 0 0 1-2-2V6a2.002 2.002 0 0 1 2-2h24a2.002 2.002 0 0 1 2 2v16a2.002 2.002 0 0 1-2 2z"
            fill="currentColor"
          ></path>
        </svg>
      )
    }
  }
})
