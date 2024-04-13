import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Icon',
  setup() {
    return () => {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 20 20"
        >
          <g fill="none">
            <path
              d="M8 5v11h4V5a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1zM7 9V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v8.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V11a2 2 0 0 1 2-2h2zm0 7v-6H5a1 1 0 0 0-1 1v5h3zm6 0h3V8a1 1 0 0 0-1-1h-2v9z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      )
    }
  }
})
